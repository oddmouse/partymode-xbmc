App.XBMCSocket = Ember.Object.extend(Ember.Evented, {

  host: 'localhost',
  port: '9090',
  status: '',
  events: [],
  ws: null,

  state: function() {

    return this.get('ws.readyState') || 0;

  }.property().readOnly().volatile(),

  // Public methods

  connect: function(host) {

    if (typeof host !== 'undefined') {
      this.set('host', host);
    }

    if (this.get('ws') === null) {

      var ws = new WebSocket('ws://%@:%@'.fmt(this.get('host'), this.get('port')));

      ws.onclose = this._close.bind(this);
      ws.onerror = this._error.bind(this);
      ws.onmessage = this._message.bind(this);
      ws.onopen = this._open.bind(this);

      this.set('ws', ws).set('status', '');

    } else {

      this.set('status', 'reconnect').disconnect();

    }

  },

  disconnect: function() {

    var ws = this.get('ws');
    ws.onerror = null;
    ws.onmessage = null;
    ws.onopen = null;
    ws.close();

  },

  // XBMC API calls

  audioLibraryGetAlbums: function() {

    this._push('AudioLibrary.GetAlbums', {
      properties: ['artist'],
      sort: {
        order: 'ascending',
        method: 'artist',
        ignorearticle: true
      }
    }, true);

  },

  audioLibraryGetSongs: function() {

    this._push('AudioLibrary.GetSongs', {
      properties: ['displayartist', 'artist', 'album', 'albumid', 'track'],
      sort: {
        order: 'ascending',
        method: 'track',
        ignorearticle: true
      }
    }, true);

  },

  audioLibraryScan: function() {

    this._push('AudioLibrary.Scan');

  },

  guiSetFullscreen: function(params) {

    this._push('GUI.SetFullscreen', params);

  },

  inputExecuteAction: function(params) {

    this._push('Input.ExecuteAction', params);

  },

  playerGetActivePlayers: function() {

    this._push('Player.GetActivePlayers');

  },

  playerGetItem: function(params) {

    this._push('Player.GetItem', params);

  },

  playerGetProperties: function(params) {

    this._push('Player.GetProperties', params);

  },

  playerGoTo: function(params) {

    this._push('Player.GoTo', params, true);

  },

  playerOpen: function(params) {

    this._push('Player.Open', params, true);

  },

  playerPlayPause: function(params) {

    this._push('Player.PlayPause', params);

  },

  playerStop: function(params) {

    this._push('Player.Stop', params);

  },

  playlistClear: function(params) {

    this._push('Playlist.Clear', params, true);

  },

  playlistGetItems: function(params) {

    this._push('Playlist.GetItems', params, true);

  },

  playlistInsert: function(params) {

    this._push('Playlist.Insert', params, true);

  },

  playlistRemove: function(params) {

    this._push('Playlist.Remove', params, true);

  },

  systemReboot: function() {

    this._push('System.Reboot');

  },

  videoLibraryGetEpisodes: function() {

    this._push('VideoLibrary.GetEpisodes', {
      properties: ['showtitle'],
      sort: {
        order: 'ascending',
        method: 'tvshowtitle',
        ignorearticle: true
      }
    }, true);

  },

  videoLibraryGetMovies: function() {

    this._push('VideoLibrary.GetMovies', {
      properties: ['year'],
      sort: {
        order: 'ascending',
        method: 'label',
        ignorearticle: true
      }
    }, true);

  },

  videoLibraryGetMusicVideos: function() {

    this._push('VideoLibrary.GetMusicVideos', {
      properties: ['artist'],
      sort: {
        order: 'ascending',
        method: 'artist',
        ignorearticle: true
      }
    }, true);

  },

  videoLibraryScan: function() {

    this._push('VideoLibrary.Scan');

  },

  // Custom XBMC calls

  workingStart: function() {

    Ember.run.debounce(this, '_workingStart', 600, true);

  },

  workingStop: function() {

    Ember.run.debounce(this, '_workingStop', 600);

  },

  // Private methods
  _open: function() {

    this._push('XBMC.GetInfoLabels', {
      labels: [
        'System.FriendlyName',
        'Network.IPAddress',
        'Network.MacAddress'
      ]
    });

    this.trigger('Socket.Open');

  },

  _close: function(event) {

    var ws = this.get('ws');
    ws.onclose = null;

    this.set('ws', null);

    if (this.get('status') === 'reconnect') {
      this.connect();
    }

    this.trigger('Socket.Close');

  },

  _error: function(event) {

    this.disconnect();
    this.trigger('Socket.Error', event);

  },

  _message: function(message) {

    var data = JSON.parse(message.data);
    var event = data.id || data.method;

    if (typeof data.error !== 'undefined') {

      this.workingStop();

    }

    switch (event) {
      case 'JSONRPC.NotifyAll' :
      case 'Other.Working.Start' :
      case 'Other.Working.Stop' :
        break;
      default :
        this.get('events').unshift(event);
        break;
    }

    this.set('events', this.get('events').slice(0,2));

    this.trigger(event, data);

    Ember.Logger.log('WS Message:', data);

  },

  _push: function(method, params, working) {

    if (this.get('state') === 1) {

      var payload = {
        jsonrpc: '2.0',
        id: method,
        method: method
      };

      if (typeof params !== 'undefined') {
        payload.params = params;
      }

      if (typeof working !== 'undefined' && working === true) {
        this.workingStart();
      }

      Ember.run.later(function() {

        this.ws.send(JSON.stringify(payload));

      }.bind(this));

      // Ember.Logger.log('WS Push: ', payload);

    }

  },

  _workingStart: function() {

    this._push('JSONRPC.NotifyAll', {
      sender: 'client',
      message: 'Working.Start'
    });

  },

  _workingStop: function() {

    this._push('JSONRPC.NotifyAll', {
      sender: 'client',
      message: 'Working.Stop'
    });

  }

});

// XBMCSocket initializer

Ember.Application.initializer({

  name: 'socket',

  initialize: function(container, application) {

    application.register('socket:main', application.XBMCSocket);
    application.inject('controller', 'socket', 'socket:main');
    application.inject('route', 'socket', 'socket:main');

  }

});

App.ApplicationController = Ember.Controller.extend({

  isConnected: false,
  isPlaying: false,
  isWorking: false,
  partymode: false,
  playerid: null,
  playlistid: null,
  host: null,
  hostname: null,
  sleepTimeout: 0,

  // Test for browser requirements
  isSupported: function() {

    var localStorageSupport = 'localStorage' in window && window.localStorage !== null;
    var WebSocketSupport = 'WebSocket' in window && window.WebSocket !== null;
    var pointerEventsSupport = 'pointerEvents' in document.body.style;

    return localStorageSupport && WebSocketSupport && pointerEventsSupport;

  }.property(),

  // Set user agent body style
  initUserAgent: function() {

    if (navigator.userAgent.match(/(ip(hone|od|ad))/i)) {

      Ember.$('body').addClass('ios');

    }

  }.on('init'),

  // Set up WebSocket listeners
  initListeners: function() {

    // Socket.Open
    this.socket.on('Socket.Open', function() {

      this.set('isConnected', true);

      this.socket.playerGetActivePlayers();

      // window.addEventListener('pageshow', function() {
      //   Ember.run.later(this, 'reconnect');
      // }.bind(this), false);

    }.bind(this));

    // Socket.Close
    this.socket.on('Socket.Close', function() {

      this.set('isConnected', false);

    }.bind(this));

    // Player.GetActivePlayers
    this.socket.on('Player.GetActivePlayers', function(data) {

      if (typeof data.result !== 'undefined' && data.result.length ) {

        this.set('playerid', data.result.get('firstObject').playerid);

      } else {

        this.set('playerid', null);

      }

    }.bind(this));

    // Player.GetProperties
    this.socket.on('Player.GetProperties', function(data) {

      if (typeof data.result !== 'undefined') {

        this.set('playlistid', data.result.playlistid)
          .set('partymode', data.result.partymode)
          .set('isPlaying', true);

      } else {

        this.set('playlistid', null)
          .set('partymode', false)
          .set('isPlaying', false);

      }

    }.bind(this));

    // Player.OnPlay
    this.socket.on('Player.OnPlay', function(data) {

      this.set('playerid', data.params.data.player.playerid)
        .set('isPlaying', true);

    }.bind(this));

    // Player.OnStop
    this.socket.on('Player.OnStop', function(data) {

      this.set('isPlaying', false);

    }.bind(this));

    // Player.OnPropertyChanged
    this.socket.on('Player.OnPropertyChanged', function(data) {

      this.set('playerid', data.params.data.player.playerid)
        .set('partymode', data.params.data.property.partymode);

    }.bind(this));

    // Working.Start
    this.socket.on('Other.Working.Start', function(data) {

      this.set('isWorking', true);

    }.bind(this));

    // Working.Stop
    this.socket.on('Other.Working.Stop', function(data) {

      this.set('isWorking', false);

    }.bind(this));

    // XBMC.GetInfoLabels
    this.socket.on('XBMC.GetInfoLabels', function(data) {

      var name = data.result['System.FriendlyName'];
      var host = data.result['Network.IPAddress'];

      this.set('host', host).set('hostname', name);

      // Reset all active states
      this.store.find('connect')
        .then(function(records) {

          records.forEach(function(el) {
            el.set('active', false).save();
          });

        this.store.find('connect', {
          host: host
        }).then(function(records) {

          // Update host to if it exists
          var record = records.get('firstObject');

          this.store.update('connect', {
            id: record.get('id'),
            host: host,
            active: true
          }).save();

        }.bind(this), function(records) {

          // Create host record if it doesn't exist
          this.store.createRecord('connect', {
            name: name,
            host: host,
            active: true
          }).save();

        }.bind(this));
      }.bind(this));
    }.bind(this));

    // Attempt reconnect
    this.reconnect();

  }.on('init'),

  // isConnected observer
  isConnectedChanged: function() {

    if (this.get('isConnected')) {

      this.transitionToRoute('index');

    } else {

      this.set('host', null)
        .set('hostname', null)
        .set('isPlaying', false)
        .set('isWorking', false)
        .set('partymode', false)
        .set('playerid', null)
        .set('playlistid', null)
        .set('sleepTimeout', 0);

    }

  }.observes('isConnected'),


  // isPlaying observer
  isPlayingChanged: function() {

    if (this.get('isPlaying')) {

      this.transitionToRoute('playlist');

    } else {

      this.transitionToRoute('index');

    }

  }.observes('isPlaying'),

  // playerid observer
  playeridChanged: function () {

    if (this.get('playerid') !== null) {

      this.socket.playerGetProperties({
        playerid: this.get('playerid'),
        properties: ['playlistid', 'partymode']
      });

    }

  }.observes('playerid'),

  // Connect to last active host
  reconnect: function() {
    
    // Connect to ip query param or last active host
    if (this.socket.get('state') !== 1) {

      var ip = this.queryParam('ip');

      if (ip) {

        this.socket.connect(ip);

        window.history.replaceState(null, null, '/');

      } else {

        this.store.find('connect', {active: true})
          .then(function(records) {
            var host = records.get('firstObject').get('host');

            Ember.run.later(function(){
              this.socket.connect(host);
            }.bind(this));
          }.bind(this));

      }

    }

  },

  queryParam: function(param) {

    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i=0; i < vars.length; i++) {

      var pair = vars[i].split("=");

      if (pair[0] === param) {
        return pair[1];
      }

    }

    return false;

  },

  // Public methods
  actions: {

    playerNext: function() {

      this.store.find('playlist')
        .then(function(items) {

        if (items.get('length') > 1) {

          this.socket.playerGoTo({
            playerid: this.get('playerid'),
            to: 'next'
          });

        }

      }.bind(this));

    },

    playerPause: function() {

      this.socket.playerPlayPause({
        playerid: this.get('playerid')
      });

    },

    playerStop: function() {

      this.socket.playerStop({
        playerid: this.get('playerid')
      });

    }

  }

});

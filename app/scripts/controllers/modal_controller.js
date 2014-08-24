App.ModalController = Ember.Controller.extend({

  needs: ['connect', 'playlist', 'utilities', 'search'],

  selected: null,
  isOpen: false,

  hasAlbum: function() {
    return this.get('selected.album') &&
      this.get('selected.type') !== 'album';
  }.property('selected'),

  hasIndex: function() {
    return (typeof this.get('selected.index') !== 'undefined');
  }.property('selected'),

  hasPlaylist: function() {
    return this.get('controllers.playlist.isPlaying') &&
      this.get('controllers.playlist.playlistid') !== null &&
      this.get('controllers.playlist.nowplaying.type') === this.get('selected.type');
  }.property('selected'),

  confirmReboot: function() {
    return this.get('selected') === 'systemReboot';
  }.property('selected'),

  confirmClearSearch: function() {
    return this.get('selected') === 'clearSearch';
  }.property('selected'),

  initListeners: function() {

    this.socket.on('Other.Working.Start', function(data) {

      this.send('close');

    }.bind(this));

  }.on('init'),

  // Public methods
  actions: {

    // Global Modal actions
    close: function() {
      this.set('isOpen', false);
    },

    open: function(item) {
      this.set('isOpen', true);
      this.set('selected', item);
    },

    // Utilities actions
    systemReboot: function() {
      this.send('close');
      this.get('controllers.utilities')
        .send('systemReboot');
    },

    clearSearch: function() {
      this.send('close');
      this.get('controllers.utilities')
        .send('clearSearch');
    },

    // Playlist actions
    playAlbum: function() {
      this.send('close');
      this.get('controllers.playlist')
        .send('playAlbum', this.get('selected'));
    },

    playNow: function() {
      this.send('close');
      this.get('controllers.playlist')
        .send('playNow', this.get('selected'));
    },

    queueNext: function() {
      this.send('close');
      this.get('controllers.playlist')
        .send('queueNext', this.get('selected'));
    },

    removeFromQueue: function() {
      this.send('close');
      this.get('controllers.playlist')
        .send('removeFromQueue', this.get('selected'));
    },

    // Connect actions
    connectHost: function() {
      this.send('close');
      this.get('controllers.connect')
        .send('connectHost', this.get('selected'));
    },

    disconnectHost: function() {
      this.send('close');
      this.get('controllers.connect')
        .send('disconnectHost', this.get('selected'));
    },

    removeHost: function() {
      this.send('close');
      this.get('controllers.connect')
        .send('removeHost', this.get('selected'));
    },

    shareHost: function() {
      this.send('close');
    }

  }

});

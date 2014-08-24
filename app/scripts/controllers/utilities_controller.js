App.UtilitiesController = Ember.ArrayController.extend({

  needs: ['application', 'modal'],

  // Public methods
  actions: {

    openModal: function(item) {

      this.get('controllers.modal').send('open', item);

    },

    audioLibraryScan: function() {

      this.socket.audioLibraryScan();

    },

    clearSearch: function() {

      this.store.find('library', {
        host: this.get('controllers.application.host')
      }).then(function(record) {
        record.get('firstObject').destroyRecord();
      }.bind(this));

    },

    inputClose: function() {

      this.socket.inputExecuteAction({
        action: 'close'
      });

    },

    setFullscreen: function() {

      this.socket.guiSetFullscreen({
        fullscreen: true
      });

    },

    systemReboot: function() {

      this.socket.systemReboot();

    },

    videoLibraryScan: function() {

      this.socket.videoLibraryScan();

    }

  }

});

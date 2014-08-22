App.UtilitiesRoute = Ember.Route.extend({

  actions: {

    audioLibraryScan: function() {

      this.socket.audioLibraryScan();

      window.alert('Scanning Audio Library');

    },

    clearSearch: function() {

      this.store.find('library', {
        host: this.controllerFor('application').get('host')
      }).then(function(record) {
        record.get('firstObject').destroyRecord();
        window.alert('Cache cleared');
      }.bind(this));

    },

    inputClose: function() {

      this.socket.inputExecuteAction({
        action: 'close'
      });

      window.alert('Close Action Executed');

    },

    setFullscreen: function() {

      this.socket.guiSetFullscreen({
        fullscreen: true
      });

      window.alert('Fullscreen Set');

    },

    systemReboot: function() {

      if (window.confirm("Are you sure you want to reboot?")) {

        this.socket.systemReboot();

      }

    },

    videoLibraryScan: function() {

      this.socket.videoLibraryScan();

      window.alert('Scanning Video Library');

    }

  }

});

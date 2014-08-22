App.IndexController = Ember.Controller.extend({

  needs: ['application'],

  isConnected: Ember.computed.alias('controllers.application.isConnected'),
  isPlaying: Ember.computed.alias('controllers.application.isPlaying'),
  isSupported: Ember.computed.alias('controllers.application.isSupported'),
  hostname: Ember.computed.alias('controllers.application.hostname'),

  actions: {

    setPartyMode: function(type) {

      this.socket.playerOpen({
        item: {
          partymode: type
        }
      });

    }

  }

});

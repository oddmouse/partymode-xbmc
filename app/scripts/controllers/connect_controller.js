App.ConnectController = Ember.ArrayController.extend({

  needs: ['modal'],

  sortProperties: ['name'],
  sortAscending: true,

  // Public methods
  actions: {

    addHost: function() {

      this.socket.connect(this.get('hostInput'));
      this.set('hostInput', '');

    },

    connectHost: function(item) {

      if (!item.get('active')) {
        this.socket.connect(item.get('host'));
      }

    },

    disconnectHost: function(item, defer) {

      item.set('active', false).save().then(function() {

        this.socket.disconnect();

        if (typeof defer !== 'undefined') {

          defer.resolve();

        }

      }.bind(this));

    },

    removeHost: function(item) {

      if (item.get('active')) {

        var defer = Ember.RSVP.defer();
        defer.promise.then(function() {

          item.destroyRecord();

        }, null);

        this.send('disconnectHost', item, defer);

      } else {

        item.destroyRecord();

      }

    },

    openModal: function(item) {

      this.get('controllers.modal').send('open', item);

    }

  }

});

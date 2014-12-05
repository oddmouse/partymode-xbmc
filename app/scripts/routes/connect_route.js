App.ConnectRoute = Ember.Route.extend({

  activate: function() {

    this.render('modal-connect', {
      into: 'application',
      outlet: 'modal',
      controller: 'modal'
    });

  },

  model: function() {

    return this.store.findAll('connect');

  },

  actions: {

    didTransition: function() {
      if (this.socket.get('state') !== 1) {
        this.store.find('connect', {'active': true})
          .then(function(records) {
            var record = records.get('firstObject');
            this.socket.connect(record.get('host'));
          }.bind(this));
      }

    }

  }

});

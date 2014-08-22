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

  }
  
});

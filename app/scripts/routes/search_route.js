App.SearchRoute = Ember.Route.extend({

  activate: function() {

    this.render('modal-media', {
      into: 'application',
      outlet: 'modal',
      controller: 'modal'
    });

  },

  actions: {

    didTransition: function() {

      this.controller.send('loadLibraries');

    }

  }

});

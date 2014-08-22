App.PlaylistRoute = Ember.Route.extend({

  activate: function() {

    this.render('modal-media', {
      into: 'application',
      outlet: 'modal',
      controller: 'modal'
    });

  },

  model: function() {

    return this.store.findAll('playlist');

  },

  actions: {

    didTransition: function() {

      this.controller.getPlaylistItems();

    }

  }

});

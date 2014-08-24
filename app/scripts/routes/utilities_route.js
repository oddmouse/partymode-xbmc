App.UtilitiesRoute = Ember.Route.extend({

  activate: function() {

    this.render('modal-utilities', {
      into: 'application',
      outlet: 'modal',
      controller: 'modal'
    });

  }

});

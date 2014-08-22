App.NavigationView = Ember.View.extend({

    templateName: 'navigation',
    isOpen: false,

    click: function() {

      this.set('isOpen', !this.isOpen);

    }
    
});

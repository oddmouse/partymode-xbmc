App.SearchFieldComponent = Ember.TextField.extend({

  focusIn: function() {

    Ember.$('body').addClass('search-focused');

  },

  focusOut: function() {

    Ember.$('body').removeClass('search-focused');

  }

});

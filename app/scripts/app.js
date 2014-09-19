var App = window.App = Ember.Application.create({

  // LOG_TRANSITIONS: true,

  ready: function() {

    // Init FastClick plugin
    FastClick.attach(document.body);

    // Global hover/touch state for list items
    Ember.$(document).on('touchstart mousedown', '.list li', function() {
      Ember.$(this).addClass('hover');
    });

    // Release hover/touch state for list items
    Ember.$('body').on('touchend touchmove mouseup', function() {
      Ember.$('.list li').removeClass('hover');
    });

  }

});

require('scripts/store');
require('scripts/initializers/*');
require('scripts/models/*');
require('scripts/controllers/*');
require('scripts/components/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');

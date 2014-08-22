var App = window.App = Ember.Application.create({

  // LOG_TRANSITIONS: true,

  ready: function() {

    // Init FastClick plugin
    FastClick.attach(document.body);

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

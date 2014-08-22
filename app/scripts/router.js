App.Router.map(function() {
  this.route('connect');
  this.route('playlist');
  this.route('utilities');
  this.route('search');
});

App.Router.reopen({
  location: 'none',
  didTransition: function(infos) {
    this._super(infos);
    window.scrollTo(0,0);
  }
});

App.Library = DS.Model.extend({
  host: DS.attr('string'),
  albumLibrary: DS.attr('string' , {defaultValue: ''}),
  albumTime: DS.attr('string', {defaultValue: ''}),
  episodeLibrary: DS.attr('string', {defaultValue: ''}),
  episodeTime: DS.attr('string', {defaultValue: ''}),
  movieLibrary: DS.attr('string', {defaultValue: ''}),
  movieTime: DS.attr('string', {defaultValue: ''}),
  musicVideoLibrary: DS.attr('string', {defaultValue: ''}),
  musicVideoTime: DS.attr('string', {defaultValue: ''})
});

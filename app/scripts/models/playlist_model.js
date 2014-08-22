App.Playlist = DS.Model.extend({
  album: DS.attr('string'),
  albumid: DS.attr('string'),
  artist: DS.attr('string'),
  label: DS.attr('string'),
  index: DS.attr('number'),
  showtitle: DS.attr('string'),
  title: DS.attr('string'),
  track: DS.attr('string'),
  type: DS.attr('string'),
  value: DS.attr('string'),
  year: DS.attr('string')
});

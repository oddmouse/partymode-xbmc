App.Connect = DS.Model.extend({
  name: DS.attr('string'),
  host: DS.attr('string'),
  active: DS.attr('boolean', {defaultValue: false})
});

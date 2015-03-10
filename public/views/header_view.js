var HeaderView = Backbone.View.extend({
  template: JST['templates/header.jst'],

  initialize: function(options) {
  },

  render: function() {
    this.$el.html(this.template);
  }
})

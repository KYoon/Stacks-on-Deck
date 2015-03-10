var HeaderView = Backbone.View.extend({
  template: JST['templates/header.jst'],

  render: function() {
    this.$el.html(this.template);
  }
})

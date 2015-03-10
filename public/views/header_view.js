var HeaderView = Backbone.View.extend({
  template: JST['templates/header.tpl'],

  render: function() {
    this.$el.html(this.template);
  }
})
var MainPage = Backbone.View.extend({
  handTemplate: _.template($("#handTemplate").html()),

  render: function(){
    this.$el.html(this.handTemplate())
  }
})

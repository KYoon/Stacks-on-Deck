var HandView = Backbone.View.extend({
  handTemplate: window['JST']['templates/hand.tpl'],
  // handTemplate: _.template($("#handTemplate").html()),
  render: function(){
    this.$el.html(this.handTemplate())
  }
})

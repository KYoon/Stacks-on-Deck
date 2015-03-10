var PassingPlayerView = Backbone.View.extend({
  tagName: "li",

  template: JST['templates/passingPlayer.jst'],

  attributes: {
    class: "user"
  },

  render: function(){
    this.$el.append(this.template(this.model.attributes))
  }
})

var CurrentPlayerView = Backbone.View.extend({
  tagName: "li",

  template: JST['templates/player.jst'],

  attributes: {
    class: "user"
  },

  render: function(){
    this.$el.append(this.template(this.model.attributes))
  }
})

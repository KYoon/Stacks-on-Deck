var CurrentPlayerView = Backbone.View.extend({
  tagName: "li",

  template: JST['templates/player.tpl'],

  attributes: {
    class: "user"
  },

  // events: {
  //   'click': "moveCard",
  // },

  render: function(){
    this.$el.append(this.template(this.model.attributes))
  }
})
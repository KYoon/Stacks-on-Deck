var PlayerView = Backbone.View.extend({
  tagName: "li",

  initialize: function(player) {
    this.username = player.attributes.username;
    this.playerTemplateType = player.attributes.playerTemplateType
    this.playerTemplate = window['JST']['templates/' + this.playerTemplateType + '.tpl'];
  },

  render: function(){
    this.$el.append(this.playerTemplate({username: this.username}))
  }
})
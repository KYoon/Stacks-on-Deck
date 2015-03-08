var PlayerView = Backbone.View.extend({

  initialize: function(player) {
    this.username = player.attributes.username;
    this.playerTemplate = window['JST']['templates/player.tpl'];
  },

  render: function(){
    this.$el.append(this.playerTemplate({username: this.username}))
  }
})
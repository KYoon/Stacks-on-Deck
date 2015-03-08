var PlayerListView = Backbone.View.extend({
  tagName: "ul",

  initialize: function(players) {
    this.players = players;
  },

  render: function() {
    this.$el.html(this.playerListTemplate({players: this.players}));
  },

  addOne: function(player){
    var view = new PlayerView(player);
    view.render();
    this.$el.append(view.$el);
  },

  addAll: function(){
    this.collection.forEach(function(player) {
      this.addOne(player);
    }, this);
    return this;
  }
});
var PassingPlayersView = Backbone.View.extend({
  tagName: "ul",

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addAll);
  },

  attributes: {
    class: "pass-list"
  },

  render: function() {
    console.log("render called")
    this.$el.empty();
    this.addAll();
  },

  addOne: function(player){
    var view = new PassingPlayerView({model: player});
    view.render();
    this.$el.append(view.$el);
  },

  addAll: function(){
    this.$el.empty();
    this.collection.playersMinusCurrentandTable().forEach(function(player) {
      this.addOne(player);
    }, this);
    return this;
  }
});

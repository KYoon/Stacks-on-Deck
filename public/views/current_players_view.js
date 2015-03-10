var CurrentPlayersView = Backbone.View.extend({
  tagName: "ul",

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addAll);
  },

  render: function() {
    this.$el.empty();
    this.addAll();
  },

  addOne: function(player){
    var view = new CurrentPlayerView({model: player});
    view.render();
    this.$el.append(view.$el);
  },

  addAll: function(){
    this.$el.empty();
    this.collection.forEach(function(player) {
      this.addOne(player);
    }, this);
    return this;
  }
});
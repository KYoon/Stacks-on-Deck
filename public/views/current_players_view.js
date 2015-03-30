var CurrentPlayersView = Backbone.View.extend({
  tagName: "ul",

  initialize: function() {
    this.playerViews = [];
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'remove', this.removeOne);
  },

  render: function() {
    this.$el.empty();
    this.addAll();
  },

  addOne: function(player){
    var view = new CurrentPlayerView({model: player});
    this.playerViews.push(view);
    view.render();
    this.$el.append(view.$el);
  },

  addAll: function(){
    this.$el.empty();
    this.collection.forEach(function(player) {
      this.addOne(player);
    }, this);
    return this;
  },

  removeOne: function(player){
    var view = _.find(this.playerViews, function(view) {
      return view.model === player;
    })
    this.playerViews = _.filter(this.playerViews, function(view) { return view.model !== player;
    });
    view.remove();
  }
});
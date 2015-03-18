var HandView = Backbone.View.extend({
  initialize: function() {
    this.cardViews = [];

    this.listenTo(this.collection, "add", this.addOne);
    this.listenTo(this.collection, "remove", this.removeOne);
  },

  events: {
    "flick": "flipCards"
  },

  render: function(){
    this.$el.empty();
    this.addAll();
    this.addActiveClass();
  },

  addOne: function(card){
    var view = new CardView({model: card});
    this.cardViews.push(view);
    view.render();
    this.$el.append(view.$el);
    this.addActiveClass();
  },

  addAll: function(){
    this.collection.forEach(function(card) {
      this.addOne(card);
    }, this);
    return this;
  },

  flipCards: function(){
    this.collection.each(function(card) {
      card.flipCard();
    })
  },

  removeOne: function(card) {
    var view = _.find(this.cardViews, function(view) {
      return view.model === card;
    })
    this.cardViews = _.filter(this.cardViews, function(view) { return view.model !== card;
    });
    view.remove();
    this.addActiveClass();
  },

   addActiveClass: function(){
   if ($(".player-hand").children().children().length > 6){
    $(".player-hand").children().children().addClass("overlap")
   } else
   $(".player-hand").children().children().removeClass("overlap")
  }
})

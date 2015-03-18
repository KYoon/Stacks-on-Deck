var TableView = Backbone.View.extend({
  initialize: function() {
    this.cardViews = [];
    this.listenTo(this.collection, "add", this.addOne);
    this.listenTo(this.collection, "remove", this.removeOne);
    this.listenTo(socket, "peerCardFlip", this.flipSpecificCard.bind(this));
  },

  events: {
    'click .card' : 'buttonDisplay',
    // "flick": "flipCards"
  },

  attributes: {
    class: "table-cards playingCards simpleCards"
  },

  render: function(){
    this.$el.empty();
    this.addAll();
  },

  addOne: function(card){
    var view = new CardView({model: card});
    this.cardViews.push(view);
    view.render();
    this.$el.append(view.$el);
  },

  addAll: function(){
    this.collection.forEach(function(card) {
      this.addOne(card);
    }, this);
    return this;
  },

  flipSpecificCard: function(cardId) {
    console.log("flipSpecificCard");
    var cardView = _.find(this.cardViews, function(view){
      return view.model.get("id") === cardId
    })
    cardView.flipCard();
  },

  flipCards: function(){
    this.collection.each(function(card) {
      card.flipCard()
      socket.emit("cardFlip", card.get("id"));
    })
  },

  removeOne: function(card){
    var view = _.find(this.cardViews, function(view) {
      return view.model === card;
    })
    this.cardViews = _.filter(this.cardViews, function(view) { return view.model !== card;
    });
    view.remove();
  }
})

var HandView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add", this.addOne);
    this.listenTo(this.collection, "remove", this.removeOne);
  },

  attributes: {
    class: "card-overlap"
  },

  events: {
    "flick": "flipCards"
  },

  render: function(){
    this.$el.empty();
    this.addAll();
  },

  addOne: function(card){
    var view = new CardView({model: card});
    view.render();
    this.$el.append(view.$el);
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

  removeOne: function(card){
    $(".active").remove();
  }

})

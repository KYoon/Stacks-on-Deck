var HandView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "change", this.render);
    this.on("click", this.showButtons)
  },

  attributes: {
    class: "card-overlap"
  },

  events: {
    "drag": "flipCards"
  },

  render: function(){
    this.$el.empty();
    this.addAll();
  },

  addOne: function(card){
    var view = new CardView({model: card});
    view.render();
    this.$el.append(view.$el)
  },

  addAll: function(){
    this.collection.forEach(function(card) {
      this.addOne(card);
    }, this);
    return this;
  },

  showButtons: function(){

  },

  flipCards: function(){
    this.collection.each(function(card) {
      card.flipCard()  
    })
    
  }

})

var HandView = Backbone.View.extend({
  initialize: function(cards) {
    this.cards = cards
  },

  handTemplate: window['JST']['templates/hand.tpl'],

  render: function(){
    this.$el.html(this.handTemplate({cards: this.cards}))
  },

  addOne: function(card){
    var view = new CardView(card);
    view.render();
    this.$el.append(view.$el)
  },

  addAll: function(){
    console.log(this.collection);
    this.collection.forEach(function(card) {
      this.addOne(card);
    }, this);
    return this;
  }
})

var Table = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.activeCard = null;
  },

  updateCards: function(formattedCards){
    tableOfCards = [];
    for(var i=0; i<formattedCards.length; i++) {
      createdCard = new Card(formattedCards[i]);
      tableOfCards.push(createdCard);
    }
    this.models = tableOfCards;
    return this.models;
  },

  setActiveCard: function(card){
    if (this.activeCard) {
      this.activeCard.set({active: false});
    }
    card.set({active: true});
    this.activeCard = card;
  }
});
var Hand = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.activeCard = null;
  },
  
  updateCards: function(formattedCards){
    newCards = [];
    for(var i=0; i<formattedCards.length; i++) {
      createdCard = new Card(formattedCards[i]);
      newCards.push(createdCard);
    }
    this.models = newCards;
    return this.models;
  },

  setActiveCard: function(card){
    if (this.activeCard) {
      this.activeCard.set({active: false});
    }
    card.set({active: true});
    this.activeCard = card;
  },

})

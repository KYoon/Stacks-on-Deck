var Hand = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.activeCard = null;
  },

  updateCards: function(jsonCards){
    this.activeCard = null;
    newCards = [];
    for(var i=0; i< jsonCards.length; i++) {
      jsonCards[i].collection = this;
      createdCard = new Card(jsonCards[i]);
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

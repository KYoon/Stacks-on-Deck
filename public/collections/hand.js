var Hand = Backbone.Collection.extend({
  model: Card,
  updateCards: function(formattedCards){
    newCards = [];
    for(var i=0; i<formattedCards.length; i++) {
      createdCard = new Card(formattedCards[i]);
      newCards.push(createdCard);
    }
    this.models = newCards;
    return this.models;
  }

})

var Hand = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.activeCard = null;
  },
  
  //not sure how to use comparator
  // comparator: function(collection){
  //     return collection.get('suit')
  // },

  
  updateCards: function(formattedCards){
    // this.activeCard = null;
    newCards = [];
    for(var i=0; i<formattedCards.length; i++) {
      createdCard = new Card(formattedCards[i]); 
      newCards.push(createdCard);
    }

    this.models = newCards;
    return this.models;
  },

  setActiveCard: function(card){
    console.log("GETTING INTO SET ACTIVE on hand")
    if (this.activeCard) {
      this.activeCard.set({active: false});
    }
    card.set({active: true});
    this.activeCard = card;
  },

})

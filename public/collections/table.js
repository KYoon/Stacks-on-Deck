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
    console.log("IN UPDATE CARDS" +this.models)
    return this.models;
  },

  setActiveCard: function(card){
    console.log("GETTING INTO SET ACTIVE on table")
    if (this.activeCard) {
      this.activeCard.set({active: false});
    }
    card.set({active: true});
    this.activeCard = card;
  }, 

  getCard: function(card) {
    socket.emit("getTableCard", card);
  }
});
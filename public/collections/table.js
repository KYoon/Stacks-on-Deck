var Table = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.activeCard = null;
  },

  updateCards: function(jsonCards){
    this.activeCard = null;
    tableOfCards = [];
    for(var i=0; i<jsonCards.length; i++) {
      jsonCards[i].collection = this;
      createdCard = new Card(jsonCards[i]);
      console.log(createdCard)
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
  },

  getCard: function(card) {
    socket.emit("getTableCard", card);
  },

  discardCard: function(card){
    socket.emit("discardTableCard", card);
  },

  collectCards: function(){
    socket.emit("userCollectsTable");
  }
});
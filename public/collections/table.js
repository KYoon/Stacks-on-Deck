var Table = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.activeCard = null;
    this.listenTo(socket, 'addCardToTable', this.addNewCard.bind(this));
  },

  addNewCard: function(card) {
    this.add(new Card(card));
  },

  updateCards: function(jsonCards){
    this.activeCard = null;
    this.reset()
    for(var i=0; i<jsonCards.length; i++) {
      jsonCards[i].collection = this;
      this.add(new Card(jsonCards[i]));
    }
    return this;
  },

  setActiveCard: function(card){
    if (this.activeCard) {
      this.activeCard.set({active: false});
    }
    card.set({active: true});
    this.activeCard = card;
  },

  getCard: function(cardId) {
    socket.emit("getTableCard", cardId);
  },

  discardCard: function(cardId){
    socket.emit("discardTableCard", cardId);
  },

  collectCards: function(){
    socket.emit("userCollectsTable");
  },

  deckDraw: function(){
    socket.emit("tableDeckDraw");
  }
});
var Table = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.activeCard = null;
    this.listenTo(socket, 'addCardToTable', this.addNewCard.bind(this));
    this.listenTo(socket, 'removeCardFromTable', this.removeCard.bind(this));
  },

  addNewCard: function(card) {
    this.add(new Card(card));
  },

  removeCard: function(card) {
    var cardId = card.id;
    var cardModel = this.find(function(model) { return model.get('id') === cardId});
    this.remove(cardModel);
  },

  updateCards: function(jsonCards){
    this.unsetActiveCard();
    this.reset();
    for(var i=0; i<jsonCards.length; i++) {
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
    this.trigger("cardActivate");
  },

  unsetActiveCard: function(){
    console.log("HI FLORI")
    this.activeCard = null;
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
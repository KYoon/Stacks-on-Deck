var Hand = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.unsetActiveCard();
    this.listenTo(socket, 'addCardToHand', this.addNewCard.bind(this));
    this.listenTo(socket, 'removeCardFromHand', this.removeCard.bind(this));
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
    console.log("HEYYOOOO")
    this.unsetActiveCard();
    this.reset()
    for(var i=0; i< jsonCards.length; i++) {
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
    this.activeCard = null;
    this.trigger("cardDeactivate");
  },

  discard: function(){
    socket.emit("userDiscardsCard", this.activeCard.id);
    this.unsetActiveCard()
  },

  playCard: function(){
    socket.emit("passTable", this.activeCard.id);
    this.unsetActiveCard()
  }

})

var Hand = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.unsetActiveCard();
  },

  updateCards: function(jsonCards){
    this.unsetActiveCard();
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
    this.trigger("cardActivate");
  },

  unsetActiveCard: function(){
    this.activeCard = null;
    this.trigger("cardDeactivate");
  },

  discard: function(){
    socket.emit("userDiscardsCard", this.activeCard.toString());
  },

  passCard: function(){

  },

  playCard: function(){
    socket.emit("passTable", this.activeCard.toString());
  }

})

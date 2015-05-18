var CardView = Backbone.View.extend({
  cardDownTemplate: JST['templates/cardDown.jst'],

  initialize: function() {
    //Refactoring IMMINENT??
    this.suit = this.model.get('suit');
    this.value = this.model.get('value').toLowerCase();
    this.color = cardColor(this.suit);
    this.cardTemplate = JST['templates/'+ this.value +'.jst'];
    this.listenTo(this.model, "change:faceUp", this.render);
    this.listenTo(this.model, "change:active", this.setClass);
  },

  attributes: {
    class: "single-card"
  },

  events: {
    "click": "activateCard",
    "dblclick": "playerFlipCard",
    "doubletap": "playerFlipCard",
  },

  activateCard: function(){
    this.model.setActive();
  },

  setClass: function(){
    if (this.model.get('active') === true) {
      this.$el.addClass("active");
    } else {
      this.$el.removeClass("active")
    }
  },

  render: function(){
    if (this.model.get('faceUp') === true) {
      this.$el.html(this.cardTemplate({color: this.color, suit: this.suit}))
    } else {
      this.$el.html(this.cardDownTemplate)
    }
  },

  playerFlipCard: function(){
    console.log("playerFlipCard")
    if (this.model.collection === table){
      socket.emit("peerCardFlip", this.model.attributes);
    } else {
      socket.emit("selfCardFlip", this.model.attributes);
    }
    this.flipCard();
  },

  flipCard: function() {
    console.log(this.model.attributes);
    if (this.model.get('faceUp') === false) {
      this.model.set({faceUp: true});
    } else {
      this.model.set({faceUp: false})
    }
  }
})

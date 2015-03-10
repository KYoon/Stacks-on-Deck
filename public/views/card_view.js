var CardView = Backbone.View.extend({
  cardDownTemplate: JST['templates/cardDown.tpl'],

  initialize: function() {
    //Refactoring IMMINENT
    this.suit = this.model.get('suit');
    this.value = this.model.get('value').toLowerCase();

    this.color = cardColor(this.suit);
    this.faceUp = true;
    this.cardTemplate = JST['templates/'+ this.value +'.tpl'];

  },

  events: {
    "click": "activateCard",
    "dblclick": "flipCard",
    "doubletap": "flipCard"
  },

  activateCard: function(){
    this.model.setActive();
  },

  render: function(){
    if (this.faceUp === true) {
      this.$el.html(this.cardTemplate({color: this.color, suit: "&"+ this.suit +";"}))
    } else {
      this.$el.html(this.cardDownTemplate)
    }
    if (this.model.active) {
      this.$el.addClass("active");
    }
  },

  flipCard: function() {
    console.log("dblclick")
    if (this.faceUp === false) {
      this.faceUp = true
    } else {
      this.faceUp = false
    }
    this.render();
  }
})

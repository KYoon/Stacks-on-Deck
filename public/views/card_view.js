var CardView = Backbone.View.extend({

  initialize: function(card) {
    this.model = card

    this.suit = card.attributes.suit;
    this.value = card.attributes.value.toLowerCase();
    this.color = cardColor(this.suit);
    this.faceUp = false
    this.cardTemplate = window['JST']['templates/'+ this.value +'.tpl'];
    this.cardDownTemplate = window['JST']['templates/cardDown.tpl']
  },

  events: {
    "click": "activateCard",
    "dblclick": "flipCard",
    "doubletap": "flipCard"
  },

// var divdbl = $( "body" );
// divdbl.dblclick(function() {
//   alert( "dbl" );
// });

  activateCard: function(){
    console.log("single click");
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

var CardView = Backbone.View.extend({
  initialize: function(card) {
    this.model = card
    
    this.suit = card.attributes.suit;
    this.value = card.attributes.value.toLowerCase();
    this.color = cardColor(this.suit);

    this.cardTemplate = window['JST']['templates/'+ this.value +'.jst'];
  },

  events: {
    "click": "activeCardShit"
  },

  activeCardShit: function(){
    this.model.setActive();
  },

  render: function(){
    this.$el.html(this.cardTemplate({color: this.color, suit: "&"+ this.suit +";"}))
    if (this.model.active) {
      this.$el.addClass("active");
    }
  }


})

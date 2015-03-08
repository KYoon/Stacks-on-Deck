var CardView = Backbone.View.extend({
  initialize: function(card) {
    this.suit = card.attributes.suit;
    this.value = card.attributes.value;
    this.color = cardColor(this.suit);
    this.cardTemplate = window['JST']['templates/'+ this.value +'.tpl'];
  },

  render: function(){
    this.$el.html(this.cardTemplate({color: this.color, suit: "&"+ this.suit +";"}))
  }
})

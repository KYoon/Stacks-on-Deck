var CardView = Backbone.View.extend({
  initialize: function(card) {
    this.suit = card.attributes.suit;
    this.value = card.attributes.value.toLowerCase();
    console.log('templates/'+ this.value +'.tpl')
    this.color = cardColor(this.suit);
    this.cardTemplate = window['JST']['templates/'+ this.value +'.tpl'];
  },

  events: {
    "click": "updateCardstatus"
  }

  updateCardstatus: function(){
    this.model.set({active: true})
  }

  render: function(){
    this.$el.html(this.cardTemplate({color: this.color, suit: "&"+ this.suit +";"}))
  }
})

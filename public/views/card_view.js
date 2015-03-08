var CardView = Backbone.View.extend({
  initialize: function(cardInfo) {
    this.suit = cardInfo.suit
    this.value = cardInfo.value
    console.log('templates/'+ this.value +'.tpl')
    this.cardTemplate = window['JST']['templates/'+ this.value +'.tpl'];
    console.log("CARDINFO:" + cardInfo.suit+", "+ cardInfo.value)
  },
  render: function(){
    this.$el.html(this.cardTemplate({color: "black", suit: "&"+ this.suit +";"}))
  }
})

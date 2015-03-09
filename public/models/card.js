var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false
            },

  setActive: function(){
    console.log(this.attributes.collection);
    this.attributes.collection.setActiveCard(this);
  },

  toString: function() {
    var suit = this.attributes.suit;
    var value = this.attributes.value;
    if(suit === "diams"){
      suit = "diamonds";
    }
    return suit + value[0].toUpperCase() + value.slice(1);
  }
})

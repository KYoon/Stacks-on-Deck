var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false
            },

  initialize: function() {
    this.on("click", this.updateActive)
    this.collection = hand;
    // this.listenTo(this, "click", this.deActive);
  },

  setActive: function(){
    console.log(this.collection)
    this.collection.setActiveCard(this);
  },

  toString: function() {
    var suit = this.attributes.suit;
    var value = this.attributes.value;
    if(suit === "diams"){
      suit = "diamonds"
    }
    return suit + value[0].toUpperCase() + value.slice(1);
  }

})

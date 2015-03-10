var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false,
            faceUp: false
            },

  setActive: function(){
    console.log("this.collection: " + this)
    this.attributes.collection.setActiveCard(this);
  },

  flipCard: function(){
    if (this.get('faceUp') === false) {
      this.set({faceUp: true})
    } else {
      this.set({faceUp: false})
    }
  }
})

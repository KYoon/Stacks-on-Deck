var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false,
            faceUp: false
            },

  setActive: function(){
      //REFACTOR
    if (this.collection) {
      //when you draw a card it's like this:
      this.collection.setActiveCard(this);
    } else {
      //when you deal cards it's like this:
      this.attributes.collection.setActiveCard(this);
    }
  },

  flipCard: function(){
    if (this.get('faceUp') === false) {
      this.set({faceUp: true})
    } else {
      this.set({faceUp: false})
    }
  }
})

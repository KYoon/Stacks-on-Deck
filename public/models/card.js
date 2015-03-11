var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false,
            faceUp: false
            },

  // initialize: function(){
  //   this.listenTo(this.collection, "cardActivate", this.setInactive);
  // },

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
  },

  setInactive: function(){
    console.log("EXECUTION")
    this.collection.unsetActiveCard();
  } 
})

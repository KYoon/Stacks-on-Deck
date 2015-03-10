var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false
            },

  setActive: function(){
    console.log("this.collection: " + this)
    this.collection.setActiveCard(this);
    this.setActiveClass();
  },
})

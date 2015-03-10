var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false
            },

  setActive: function(){
    console.log("this.collection: " + this)
    this.attributes.collection.setActiveCard(this);
    // this.setActiveClass();
  },
})

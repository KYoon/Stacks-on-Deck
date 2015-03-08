var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false
            },

  initialize: function() {
    this.on("click", this.updateActive)
    // this.listenTo(this, "click", this.deActive);
  },

  setActive: function(){
    console.log(this)
    card = this
    console.log(this.collection)
    this.collection.setActive(this);
  }

})

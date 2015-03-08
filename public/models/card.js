var Card = Backbone.Model.extend({
  defaults: {suit: '',
            value: '',
            active: false
            },

  initialize: function() {
    this.on("click", this.updateActive)
       // this.listenTo(this, "click", this.deActive);
  },

  updateActive: function(clickedCard){
    this.active = true;
  }
})

var WaitingRommView = Backbone.View.extend({
  template: JST['templates/waitingRoom.jst'],
  
  initialize: function(){

  }

  render: function(){
    this.$el.append(this.template)
  }
      
})
var WaitingRoomView = Backbone.View.extend({
  template: JST['templates/waitingRoom.jst'],
  
  initialize: function(){
    this.listenTo(socket, "joinedGame", this.render.bind(this));
  },

  render: function(){
    this.$el.append(this.template);
  }
      
})
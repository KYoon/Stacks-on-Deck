var WaitingRoomView = Backbone.View.extend({
  template: JST['templates/waitingRoom.jst'],
  
  initialize: function(){
    this.listenTo(socket, "joinedGame", this.render.bind(this));
  },

  render: function(){
    playerListView.render();
    this.$el.append(this.template);
    $(".player-list").append(playerListView.$el);
  }
      
})
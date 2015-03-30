var GameRoomView = Backbone.View.extend({
  template: JST['templates/gameRoom.jst'],

  render: function(){
    waitingRoomView.remove();
    this.$el.append(this.template);
    playerListViewForPassing = new PassingPlayersView({collection: playerListForPassing});
    playerListViewForPassing.render();
    $(".passing-player-list").append(playerListViewForPassing.$el);
    $(".pass-list").hide();
  }

})
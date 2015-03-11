var MessageView = Backbone.View.extend({
  initialize: function(){
    $.notifyDefaults({
      type: "yoonify",
      delay: 1500,
      placement:{from: "top",align: "center"}
    });
    // listening
    // some of these event names are guesses and will need to be changed during integration
    this.listenTo(socket, 'newPlayer', this.playerJoin);
    this.listenTo(socket, 'cardDrawMessage', this.cardDraw);
    this.listenTo(socket, 'cardsDealMessage', this.cardsDeal);
    this.listenTo(socket, 'cardDealToTableMessage', this.cardDealToTable);
    this.listenTo(socket, 'cardPass', this.cardPass);
  },

  playerJoin: function(username){
    $.notify({
      icon: "glyphicon glyphicon-user",
      title: "Player Join:",
      message: username + " has entered the room."
    });
  },

  cardDraw: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Draw:",
      message: username + " has drawn a card."
    });
  },

  cardPlay: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Played:",
      message: username + " has played a card to the table."
    });
  },

  cardsDeal: function(username, quantity){
    var message = username + " has dealt "+ quantity +" card";
    if (parseInt(quantity) > 1) {
      message +="s to each player in the room.";
    } else if(parseInt(quantity) === 0) {
      message = username + " has started the game.";
    } else {
      message += " to each player in the room."
    }
    $.notify({
      icon: "glyphicon glyphicon-play",
      title: "Game Start:",
      message: message
    });
  },

  cardDealToTable: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Cards Dealt:",
      message: username + " has dealt a card to the table."
    });
  },

  cardPass: function(usernameFrom, usernameTo){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Cards Dealt:",
      message: usernameFrom + " has passed a card to " + usernameTo + "."
    });
  },
})

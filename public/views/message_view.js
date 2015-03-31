var MessageView = Backbone.View.extend({
  initialize: function(){
    $.notifyDefaults({
      type: "yoonify",
      delay: 1000,
      placement:{from: "top",align: "center"}
    });
    // listening
    this.listenTo(socket, 'gameStartMessage', this.rotate)
    this.listenTo(socket, 'newPlayer', this.playerJoin.bind(this));
    this.listenTo(socket, 'cardDrawMessage', this.cardDraw);
    this.listenTo(socket, 'cardDrawToTableMessage', this.cardDrawToTable);
    this.listenTo(socket, 'cardsDealMessage', this.cardsDeal);
    this.listenTo(socket, 'cardPlayToTableMessage', this.cardPlayToTable);
    this.listenTo(socket, 'cardPassMessage', this.cardPass);
    this.listenTo(socket, 'playerLeaveMessage', this.playerLeave);
    this.listenTo(socket, 'deckEmptyMessage', this.deckEmpty);
    this.listenTo(socket, 'cardDiscardMessage', this.cardDiscard);
    this.listenTo(socket, 'tableCardDiscardMessage', this.tableCardDiscard);
    this.listenTo(socket, 'userTakeAllMessage', this.userTakeAll);
    this.listenTo(socket, 'userTakeOneMessage', this.userTakeOne);
  },

  rotate: function(){
    $.notify({
        icon: "glyphicon glyphicon-refresh",
        title: "Game Starting: ",
        message: "Please rotate device to landscape for optimal experience."
      });
  },

  playerJoin: function(username){
    if (username === "table") {
      this.tableJoin();
    } else {
      $.notify({
        icon: "glyphicon glyphicon-user",
        title: "Player Join:",
        message: username + " has entered the room."
      });
    }
  },

  tableJoin: function() {
    $.notify({
        icon: "glyphicon glyphicon-phone",
        title: "Device Connect: ",
        message: "A device has connected to the game to serve as a table."
      });
  },

  cardDraw: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Draw:",
      message: username + " has drawn a card."
    });
  },

  cardDrawToTable: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Draw:",
      message: username + " has drawn a card to the table."
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

  cardPlayToTable: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Played:",
      message: username + " has played a card to the table."
    });
  },

  cardPass: function(usernameFrom, usernameTo){
    $.notify({
      icon: "glyphicon glyphicon-share-alt",
      title: "Card Pass:",
      message: usernameFrom + " has passed a card to " + usernameTo + "."
    });
  },

  playerLeave: function(username) {
    if (username === "table") {
      this.tableLeave();
    } else {
      $.notify({
        icon: "glyphicon glyphicon-warning-sign",
        title: "Player Leave:",
        message: username + " has left the room. Their cards have been forfeited."
      });
    }
  },

  tableLeave: function() {
    $.notify({
        icon: "glyphicon glyphicon-phone",
        title: "Device Disconnect:",
        message: "The table device has disconnected from the game."
      });
  },

  deckEmpty: function() {
    $.notify({
      icon: "glyphicon glyphicon-warning-sign",
      title: "Deck Empty:",
      message: " There are no more cards in the deck."
    });
  },

  cardDiscard: function(username) {
    $.notify({
      icon: "glyphicon glyphicon-warning-sign",
      title: "Discard:",
      message: username + " has discarded a card."
    });
  },

  tableCardDiscard: function(username) {
    $.notify({
      icon: "glyphicon glyphicon-warning-sign",
      title: "Discard:",
      message: username + " has discarded a card from the table."
    });
  },

  userTakeAll: function(username) {
    $.notify({
      icon: "glyphicon glyphicon-minus",
      title: "Collect:",
      message: username + " has collected all cards from the table."
    });
  },

  userTakeOne: function(username) {
    $.notify({
      icon: "glyphicon glyphicon-minus",
      title: "Collect:",
      message: username + " has collected a card from the table."
    });
  },

})

var PlayerList = Backbone.Collection.extend({
  model: Player,

  initialize: function() {
    this.listenTo(socket, 'newPlayer', this.addPlayer.bind(this));
    this.listenTo(socket, 'joinedGame', this.addPlayers.bind(this));
    this.listenTo(socket, 'userLeft', this.removePlayer.bind(this));
  },

  addPlayer: function(username) {
    this.add(new Player({username: username}));
  },

  removePlayer: function(username) {
    var playerModel = this.find(function(model) { return model.get('username') === username});
    console.log(playerModel)
    console.log(this)
    this.remove(playerModel);
    console.log(this)
  },

  addPlayers: function(usernames){
    usernames.forEach(function(username) {
      this.addPlayer(username);
    }, this);
    return this;
  },

  playersMinusCurrentandTable: function(){
    return this.reject(function(player) {
      return (player.get('username') === userData.username | player.get('username') === "table");
    })
  }
});
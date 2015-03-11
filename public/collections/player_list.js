var PlayerList = Backbone.Collection.extend({
  model: Player,

  initialize: function() {
    this.listenTo(socket, 'newPlayer', this.addPlayer.bind(this));
    this.listenTo(socket, 'joinedGame', this.addPlayers.bind(this));
  },

  addPlayer: function(username) {
    this.add(new Player({username: username}));
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

// 1. Move socket binding to models & collections (make sure can verify things are wired by console.log)
// 2. Check all new instantiation for args (model: foo)
// 3. Check views for template setting (maybe nate broke things)
// 4. Update views to listen for collection.add & collection.reset -- they should update DOM
// 5. Split the PlayerView into two views, for for the list of players and another for the passing of a card

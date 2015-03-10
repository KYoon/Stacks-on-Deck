var MessageView = Backbone.View.extend({
  initialize: function(){
    $.notifyDefaults({
      type: "yoonify",
      delay: 500,
      placement:{from: "top",align: "center"}
    });
    // listening
    this.listenTo(socket, 'newPlayer', this.playerJoin.bind(this));
  },

  playerJoin: function(username){
    $.notify({
      icon: "glyphicon glyphicon-user",
      title: "Player Join:",
      message: username + " has entered the room."
    });
  },

})

//  message types:
//  Player Joined:
//  Card Played:
//  Card Drawn:
//  Cards Dealt:
//  Card Dealt to table:
//

// example notification
// $.notify({
//   // options
//   icon: "glyphicon glyphicon-user",
//   title: "Player Join:",
//   message: "kevin y00n has entered the room."
// });

// <div data-notify="container" class="col-xs-11 col-sm-4 alert alert-success animated fadeInDown" role="alert" data-notify-position="top-center" style="display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out; -webkit-transition: all 0.5s ease-in-out; z-index: 1031; top: 20px; left: 0px; right: 0px;">
//   <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
//   <span data-notify="icon" class="glyphicon glyphicon-user"></span>
//   <span data-notify="title">Player Join:</span>
//   <span data-notify="message">jnmandal has entered the room.</span>
//   <div class="progress" data-notify="progressbar">
//     <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="10.945273631840797" aria-valuemin="0" aria-valuemax="100" style="width: 10.9452736318408%;">
//     </div>
//   </div>
//   <a href="#" target="_blank" data-notify="url"></a>
// </div>

function updateUserList(clients){
  console.log(clients);
  $(".player-list").empty();
  $(".passing-player-list").empty();
  for (var i=0; i<clients.length; i++){
    $(".player-list").append("<li>" + clients[i] + "</li>");
    $(".passing-player-list").append("<li class='user' id=" + clients[i] +"><a href=#>" + clients[i] + "</a></li>");
  }
}

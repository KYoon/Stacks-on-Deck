function removeCurrentUser(clients, currentUser) {
  peers = []
  for (var i=0; i < clients.length; i++){
    if (clients[i] !== currentUser) {
      peers.push(clients[i])
    }
  }
  return peers;
}
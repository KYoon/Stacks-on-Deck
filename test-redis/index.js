var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var repo = require("./repo");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  repo.createDeck();
  // console.log(repo.createDeck);

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
// Modified in order to remove deprication warnings
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


server.listen(3000);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  return;
});

io.on('connection', function(socket){

  socket.on("join", function(data){
    socket.emit('message', "joined room " + data.roomkey);

    socket.join(data.roomkey, function(error){
      console.log("Rooms inside callback")
      console.log(socket.rooms);
      io.to(data.roomkey).emit("message", data.username + " joined the room!")

      
      console.log(error);
    });

    console.log("Rooms outside callback")
    console.log(socket.rooms);


  });

});

app.post('/games', function(req, res) {
    var roomKey = keyGenerator();
    /// check if gameKey currently exists in redis
    /// create new game
    res.redirect('/games/' + roomKey);
    return;
});

app.get('/games/:key', function(req, res) {
  console.log("GETTING HUR");
  res.sendFile(__dirname + '/index.html');
  return;
})

function keyGenerator(){
  var key = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (i=0; i<4; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return key;
}
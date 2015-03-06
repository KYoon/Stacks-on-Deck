// core frameworks
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// templates
app.set('views', './views')
app.set('view engine', 'ejs')

// middleware
var bodyParser = require('body-parser');
var session = require('express-session');

// sessions
app.use(session({secret: 'so_secret'}));

// params
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// static files
app.use("/public", express.static(__dirname + '/public'));
app.use("/socket.io", express.static(__dirname + '/node_modules/socket.io'));

// server
server.listen(3000);

// routes
app.get('/', function(req, res){
  console.log(req.session);
  res.render('index.ejs')
  return;
});

app.post('/games', function(req, res) {
  var roomKey = keyGenerator();
  var creatorName = req.body.username
  req.session["creatorName"] = creatorName
  req.session["roomKey"] = roomKey
  console.log(req.session)
  // check if gameKey currently exists in redis
  // create new game
  res.redirect('/games/' + roomKey);
  return;
});


app.get('/games/:key', function(req, res) {
  // validate key is legit
  console.log(req.session)
  res.render('game.ejs', {username: req.session["creatorName"], roomkey: req.session["roomKey"]})
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

// sockets!
io.on('connection', function(socket){

  socket.on("joinRoom", function(data){
    socket.emit('message', "joined room " + data.roomkey);
    socket.join(data.roomkey, function(error){
      console.log("User joined a room");
      console.log(socket.rooms);
      io.to(data.roomkey).emit("message", data.username + " joined the room!")
      if(error){console.log("error:" + error);}
    });
  });


});
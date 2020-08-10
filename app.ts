import express = require('express');
import { GameEvents, ResponseEvents } from './constants';

// Create a new express application instance
const app: express.Application = express();
app.set("port", process.env.PORT || 3000)

let http = require("http").Server(app);

app.get('/', function (req: any, res: any) {
  res.sendFile(__dirname + '/public/index.html')
});

app.use(express.static(__dirname + '/public'))


const io = require('socket.io')(http)
io.sockets.on('connection', (socket: any) => {
  console.log("socket connection")

  socket.on(GameEvents.START, function() {
    socket.emit(ResponseEvents.MESSAGE, "Welcom to the game")
  });
  socket.on(GameEvents.PLAY, function() {
    socket.emit(ResponseEvents.MESSAGE, "lest's play")
  });
  socket.on(GameEvents.PAUSE, function() {
    socket.emit(ResponseEvents.MESSAGE, "Take a break time")
  });
  socket.on(GameEvents.FINISH, function() {
    socket.emit(ResponseEvents.MESSAGE, "Good By")
  });
})

const server = http.listen(3000, function(){
  console.log("listening on 3000")
})




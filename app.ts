import express = require('express');

import {LISTENER_ACTION} from './view-communication/listener/listener-types/listener-types'
import ChessListener from './view-communication/listener/listener-model/listener-model'
import { VIEW_POSITION, VIEW_PIECE_ID } from './view-communication/models/view-commincation-models';

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
  const chessListener = new ChessListener(socket)

  socket.on(LISTENER_ACTION.SELECT_PIECE, function(pieceId: VIEW_PIECE_ID){
    chessListener.selectPiece(pieceId)
    
  })

  socket.on(LISTENER_ACTION.MOVE_PIECE, function(newPosition: VIEW_POSITION) {
    chessListener.movePiece(newPosition)
    
  })
})

const server = http.listen(3000, function(){
  console.log("listening on 3000")
})




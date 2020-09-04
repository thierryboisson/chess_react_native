socket.on(LISTENER_ACTIONS.INIT_PIECE, function({pieces, currentPlayer}){
    if(pieces !== undefined){   
        initPieces(pieces, currentPlayer)
    }
    
})
socket.on(LISTENER_ACTIONS.KILL_PIECE, function({id}) {
    killPiece(id)
})

socket.on(LISTENER_ACTIONS.MOVE_PIECE, function ({id, position}) {
    movePiece({id, position})
})
socket.on(LISTENER_ACTIONS.SELECT_PIECE, function ({allowedPositions}) {
    selectPiece(allowedPositions)
})
socket.on(LISTENER_ACTIONS.WIN, function({winner}){
    win(winner)
})
socket.on(LISTENER_ACTIONS.ERROR, function ({message}){
    console.error(message)
})
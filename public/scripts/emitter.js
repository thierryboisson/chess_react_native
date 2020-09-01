function onMove(position) {
    socket.emit("MOVE_PIECE", position);
}
function onSelect(pieceId) {
    socket.emit("SELECT_PIECE", pieceId);
}

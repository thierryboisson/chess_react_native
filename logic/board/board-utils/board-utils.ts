import { PLAYER, Piece } from "../../piece/models";

export const sortByPlayer = (player: PLAYER, pieces: Array<Piece>): {playerPiece: Array<Piece>, opponentPiece: Array<Piece>} => {
    const result:{playerPiece: Array<Piece>, opponentPiece: Array<Piece>} = {playerPiece: [], opponentPiece: []}
    for(let i = 0; i < pieces.length; i++){
        if(pieces[i].player === player){
            result.playerPiece.push(pieces[i])
        } else {
            result.opponentPiece.push(pieces[i])
        }
    }
    return result
}
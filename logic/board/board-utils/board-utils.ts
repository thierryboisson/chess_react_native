import { PLAYER, Piece } from "../../piece/models";

/**
 * Description - methot to sort by currentplayer and opponentPlayer  
 * @param player 
 * @param pieces 
 */
export const sortByPlayer = (player: PLAYER, pieces: Array<Piece>): {playerPieces: Array<Piece>, opponentPieces: Array<Piece>} => {
    const result:{playerPieces: Array<Piece>, opponentPieces: Array<Piece>} = {playerPieces: [], opponentPieces: []}
    for(let i = 0; i < pieces.length; i++){
        if(pieces[i].player === player){
            result.playerPieces.push(pieces[i])
        } else {
            result.opponentPieces.push(pieces[i])
        }
    }
    return result
}
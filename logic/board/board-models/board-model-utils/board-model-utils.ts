import { getByPosition } from "../../../piece/models/models-utils/utils-models"
import { PLAYER, Piece } from "../../../piece/models"
import { sortByPlayer } from "../../board-utils/board-utils"

/**
 * Description - method to refresh allowed position in each piece
 * @param pieces 
 */
export const refreshPositionAllowed = (pieces: Array<Piece>) => {
    const {opponentPiece, playerPiece} = sortByPlayer(PLAYER.WHITE, pieces)
    const whitePositionsPiece: Array<number> = playerPiece.map(piece => piece.position)
    const blackPositionsPiece: Array<number> = opponentPiece.map(piece => piece.position)
    playerPiece.forEach(whitePiece => {
        whitePiece.calculatePositionAllowed(whitePositionsPiece, blackPositionsPiece)
    })
    opponentPiece.forEach(blackPiece => {
        blackPiece.calculatePositionAllowed(blackPositionsPiece, blackPositionsPiece)
    })
    return [...playerPiece, ...opponentPiece]
}

/**
 * Description - method to check is there are attack and update pieves in the list
 * @param attackPosition 
 * @param opponentPieces 
 * @param pieces 
 */
export function attackPiece(attackPosition: number, opponentPieces: Array<Piece>, pieces: Array<Piece>):Array<Piece>{
    const pieceOpponentAttacked = getByPosition(attackPosition, opponentPieces)
    if(pieceOpponentAttacked !== null){
        const result = pieces.filter(piece => piece.id !== pieceOpponentAttacked.id)
        return result
    }
    return pieces
}

/**
 * Description - method to switch player
 * @param player 
 */
export function changePlayer(player:PLAYER):PLAYER{
    return player === PLAYER.WHITE ? PLAYER.BLACK : PLAYER.WHITE
}

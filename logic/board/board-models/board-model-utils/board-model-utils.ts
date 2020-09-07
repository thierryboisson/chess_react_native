import { getByPosition } from "../../../piece/models/models-utils/utils-models"
import { PLAYER, Piece, PIECE_ID } from "../../../piece/models"
import { sortByPlayer } from "../../board-utils/board-utils"

/**
 * Description - method to refresh allowed position in each piece
 * @param pieces 
 */
export const refreshPositionAllowed = (pieces: Array<Piece>) => {
    const {opponentPieces, playerPieces} = sortByPlayer(PLAYER.WHITE, pieces)
    const whitePositionsPiece: Array<number> = playerPieces.map(piece => piece.position)
    const blackPositionsPiece: Array<number> = opponentPieces.map(piece => piece.position)
    playerPieces.forEach(whitePiece => {
        whitePiece.calculatePositionAllowed(whitePositionsPiece, blackPositionsPiece)
    })
    opponentPieces.forEach(blackPiece => {
        blackPiece.calculatePositionAllowed(blackPositionsPiece, whitePositionsPiece)
    })
    return [...playerPieces, ...opponentPieces]
}

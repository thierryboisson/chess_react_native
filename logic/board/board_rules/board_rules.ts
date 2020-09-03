import { Piece, TYPE_PIECE, fetchPiece } from "../../piece/models"
import { sortByPlayer } from "../board-utils/board-utils"
import { calculateMovement } from "../../piece/movement_rules-utils/movement_rules-utils"

/**
 * Description - method to check if there are checkmate
 * @param opponentPieces
 * @param playerPieces
 */
export const isCheckmate = (opponentPieces: Array<Piece>, playerPieces: Array<Piece>): boolean => {
    const {position, positionsAllowed} = fetchPiece("type", TYPE_PIECE.KING, opponentPieces)[0]
    const kingPositionToCheck = [position, ...positionsAllowed]
    const attackerPiecesPosition: Array<number> = playerPieces.filter(
        piece => kingPositionToCheck.filter(position => piece.positionsAllowed.indexOf(position) !== -1).length === kingPositionToCheck.length
    ).map(attackerPiece => attackerPiece.position)
    if(attackerPiecesPosition.length){
        // check if the opponnet could conterattack
        const counterAttackPosition = opponentPieces.map(piece => piece.positionsAllowed).reduce((acc, currentValue) => acc.concat(currentValue))
        for(let i = 0;i<attackerPiecesPosition.length; i++){
            if(counterAttackPosition.indexOf(attackerPiecesPosition[i]) !== -1){
                // the king is blocked but the opponent can counterattack the attacker
                return false
            }
        }
        // the king is blocked and the opponent can't counterattack
        return true
    } 
    // the king is not blocked
    return false
    
}

/**
 * Description - method to calculate if movement is endangers the king
 * @param kingPiece 
 * @param otherPiece 
 * @param positionsAllowed 
 */
/*export const isEndangersMovement = (kingPiece: Piece, otherPiece: Array<Piece>, newPosition: number): boolean => {
    if(kingPiece.type !== TYPE_PIECE.KING){
        throw new Error("kingPiece type is not king")
    }
    const piecesSorted = sortByPlayer(kingPiece.player, otherPiece)
    const positionsPiecePlayer: Array<number> = piecesSorted.playerPiece.map(piece => piece.position)
    const positionsPieceOpponent: Array<number> = piecesSorted.opponentPiece.map(piece => piece.position)
    let positionPotentialAttack: Array<number> = []
    piecesSorted.opponentPiece.forEach(piece => {
        const piecePotentialAttack:Array<number> = piece.movementRules.calculate(piece.position,positionsPieceOpponent, [...positionsPiecePlayer, newPosition])
        positionPotentialAttack = positionPotentialAttack.concat(piecePotentialAttack)
    })
    const kingPositionAllowed = kingPiece.movementRules.calculate(kingPiece.position, [...positionsPiecePlayer, newPosition], positionsPieceOpponent)
    return isCheckmate(kingPiece.position, kingPositionAllowed, positionPotentialAttack)
} */
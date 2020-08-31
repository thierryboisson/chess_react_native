import { Piece, TYPE_PIECE } from "../../piece/models"
import { sortByPlayer } from "../board-utils/board-utils"
import { calculateMovement } from "../../piece/movement_rules-utils/movement_rules-utils"

/**
 * Description - method to check if there are checkmate
 * @param kingPosition 
 * @param kingPositionAllowed 
 * @param opponentPiecePositionAllowed 
 */
export const isCheckmate = (kingPosition: number, kingPositionAllowed: Array<number>, opponentPiecePositionAllowed: Array<number>): boolean => {
    const kingPositionToCheck = [...kingPositionAllowed, kingPosition]
    return kingPositionToCheck.filter(position => opponentPiecePositionAllowed.indexOf(position) !== -1).length === kingPositionToCheck.length
}

/**
 * Description - method to calculate if movement is endangers the king
 * @param kingPiece 
 * @param otherPiece 
 * @param positionsAllowed 
 */
export const isEndangersMovement = (kingPiece: Piece, otherPiece: Array<Piece>, newPosition: number): boolean => {
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
} 
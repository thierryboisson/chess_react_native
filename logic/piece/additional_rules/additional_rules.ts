import { calculateMovement } from "../utils/utils"
import { TYPE_PIECE, PLAYER, PIECE_ID, DEFAULT_POSITION } from "../models/Types"
import { Piece, fetchPiece } from "../models"


export interface IsPassingCatchResult {
    isTrue: boolean,
    newPositionAllowed?: number,
    positionOpponentCatch?: number
}

/**
 * Description - method to check passing catch context and return piece position
 * @param position 
 * @param positionOpponentPiece 
 * @param piece 
 */
export const isPassingCatch = (position: number, positionOpponentPiece: Array<number>, piece: Piece):IsPassingCatchResult => {
    if(piece.type !== TYPE_PIECE.PAWN){
        throw new Error("type of piece habe to be a pawn to applicate 'is passing Rules'")
    }         
    if (positionOpponentPiece.indexOf(calculateMovement(1, position)) !== -1) {
        const movementAllowed = piece.player === PLAYER.WHITE
            ? -9
            : 11
        return { isTrue: true, newPositionAllowed: calculateMovement(movementAllowed, position), positionOpponentCatch: calculateMovement(1, position) }
    } else if (positionOpponentPiece.indexOf(calculateMovement(-1, position)) !== -1) {
        const movementAllowed = piece.player === PLAYER.BLACK
            ? -11
            : 9
        return { isTrue: true, newPositionAllowed: calculateMovement(movementAllowed, position), positionOpponentCatch: calculateMovement(-1, position) }
    } else {
        return { isTrue: false }
    }
}

export interface IsRoqueResult {
    isTrue: boolean,
    newPositionAllowedRook?: number,
    newPositionAllowedKing?: number
}

/**
 * Description - method to check little roque context and return piece position
 * @param rookPiece 
 * @param kingPiece 
 * @param positionsOtherPiece 
 * @param positionsAllowedOpponentPiece 
 */
export const isLittleRoque = (rookPiece: Piece, kingPiece: Piece, positionsOtherPiece: Array<number>, positionsAllowedOpponentPiece: Array<number>):IsRoqueResult => {
    if(     // check appropriate type piece
        rookPiece.type === TYPE_PIECE.ROOK && kingPiece.type === TYPE_PIECE.KING
    ){
        throw new Error("rook pieces or king have not appropriate type piece")
    }
    if(
        // check if the piece is same player
        rookPiece.player === kingPiece.player
    ){
        throw new Error("rook pieces or king do not belong to the same player ")
    }    
    if(
        rookPiece.hasBeenPlayerOneTime === false && kingPiece.hasBeenPlayerOneTime === false
    ){
        const positionBlocked = positionsOtherPiece.concat(positionsAllowedOpponentPiece)
        if(
            rookPiece.id !== PIECE_ID.ROOK_WHITE_2 &&
            [61,62].filter(roquePosition => positionBlocked.indexOf(roquePosition) === -1).length === 2
        ){
            return {isTrue: true, newPositionAllowedKing: 62, newPositionAllowedRook: 61  }
        } else if(
            rookPiece.id !== PIECE_ID.ROOK_BLACK_2 &&
            [5,6].filter(roquePosition => positionBlocked.indexOf(roquePosition) === -1).length === 2
        ) {
            return {isTrue: true, newPositionAllowedKing: 6, newPositionAllowedRook: 5}
        }
        return {isTrue: false}
    } 
    return {isTrue: false}
} 

/**
 * Description - method to check roque context and return piece position
 * @param rookPiece 
 * @param kingPiece 
 * @param positionsOtherPiece 
 * @param positionsAllowedOpponentPiece 
 */
export const isRoque = (rookPiece: Piece, kingPiece: Piece, positionsOtherPiece: Array<number>, positionsAllowedOpponentPiece: Array<number>):IsRoqueResult => {
    if(     // check appropriate type piece
        rookPiece.type === TYPE_PIECE.ROOK && kingPiece.type === TYPE_PIECE.KING
    ){
        throw new Error("rook pieces or king have not appropriate type piece")
    }
    if(
        // check if the piece is same player
        rookPiece.player === kingPiece.player
    ){
        throw new Error("rook pieces or king do not belong to the same player ")
    }    
    if(
        rookPiece.hasBeenPlayerOneTime === false && kingPiece.hasBeenPlayerOneTime === false
    ){
        const positionBlocked = positionsOtherPiece.concat(positionsAllowedOpponentPiece)
        if(
            rookPiece.id !== PIECE_ID.ROOK_WHITE_1 &&
            [57, 58, 59].filter(roquePosition => positionBlocked.indexOf(roquePosition) === -1).length === 2
        ){
            return {isTrue: true, newPositionAllowedKing: 58, newPositionAllowedRook: 57  }
        } else if(
            rookPiece.id !== PIECE_ID.ROOK_BLACK_1 &&
            [1,  2,  3].filter(roquePosition => positionBlocked.indexOf(roquePosition) === -1).length === 2
        ) {
            return {isTrue: true, newPositionAllowedKing: 2, newPositionAllowedRook: 1}
        }
        return {isTrue: false}
    } 
    return {isTrue: false}
} 
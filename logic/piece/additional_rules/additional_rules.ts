import { calculateMovement } from "../movement_rules-utils/movement_rules-utils"
import { TYPE_PIECE, PLAYER, PIECE_ID, DEFAULT_POSITION } from "../models/Types"
import { Piece} from "../models"


/**
 * Description - method to check passing catch context and return piece position
 * @param position 
 * @param positionOpponentPiece 
 * @param piece 
 */
export const isPassingCatch = (piece: Piece, positionsPlayerPiece: Array<number>, positionOpponentPiece: Array<number>):Array<{positionAllowed: number, positionOpponentCatch: number}>|null => {
    if(piece.type !== TYPE_PIECE.PAWN){
        throw new Error("type of piece habe to be a pawn to applicate 'is passing Rules'")
    }
    const positionBlocked: Array<number> = positionsPlayerPiece.concat(positionOpponentPiece)
    const potentialAttacks: Array<{positionAllowed: number, positionOpponentCatch: number}> = []
    const positionLeft: number = calculateMovement(1, piece.position);   
    if (positionOpponentPiece.indexOf(positionLeft) !== -1) {
        const movementAllowed = piece.player === PLAYER.WHITE
            ? -9
            : 11
        potentialAttacks.push({positionAllowed: calculateMovement(movementAllowed, piece.position), positionOpponentCatch: positionLeft})
    }
    const positionRight: number = calculateMovement(-1, piece.position);  
    if (positionOpponentPiece.indexOf(positionRight) !== -1) {
        const movementAllowed = piece.player === PLAYER.BLACK
            ? 9
            : -11
        potentialAttacks.push({positionAllowed: calculateMovement(movementAllowed, piece.position), positionOpponentCatch: positionRight})
    } 
    const attack:Array<{positionAllowed: number, positionOpponentCatch: number}> = potentialAttacks.filter(attack => positionBlocked.indexOf(attack.positionAllowed) === -1)
    return attack.length ? attack : null
}

export interface IsRoqueResult {
    newPositionAllowedRook?: number,
    newPositionAllowedKing?: number
}

/**
 * Description - method to check roque context and return pieces positions
 * @param rookPiece 
 * @param kingPiece 
 * @param positionsOtherPiece 
 * @param positionsAllowedOpponentPiece 
 */
export const isRoque = (rookPiece: Piece, kingPiece: Piece, positionsOtherPiece: Array<number>, positionsAllowedOpponentPiece: Array<number>):IsRoqueResult|null => {
    if(     // check appropriate type piece
        rookPiece.type !== TYPE_PIECE.ROOK || kingPiece.type !== TYPE_PIECE.KING
    ){
        throw new Error("rook pieces or king have not appropriate type piece")
    }
    if(
        // check if the piece is same player
        rookPiece.player !== kingPiece.player
    ){
        throw new Error("rook pieces or king do not belong to the same player ")
    }    
    if(
        // check if the pieces hasn't been already moved
        rookPiece.hasBeenPlayerOneTime === false && kingPiece.hasBeenPlayerOneTime === false
    ){
        const positionBlocked = positionsOtherPiece.concat(positionsAllowedOpponentPiece)
        let result: IsRoqueResult|null = null
        let movementSpace: Array<number> = []

        // little roque white
        if(rookPiece.id === PIECE_ID.ROOK_WHITE_2){
            result = { newPositionAllowedKing: 62, newPositionAllowedRook: 61}
            movementSpace = [61,62]
        } 
        // little roque black
        if(rookPiece.id === PIECE_ID.ROOK_BLACK_2){
            result = { newPositionAllowedKing: 6, newPositionAllowedRook: 5}
            movementSpace = [6,5]
        }
        // roque white
        if(rookPiece.id === PIECE_ID.ROOK_WHITE_1){
            result = {newPositionAllowedKing: 57, newPositionAllowedRook: 58  }
            movementSpace = [57, 58, 59]
        } 
        // roque black
        if(rookPiece.id === PIECE_ID.ROOK_BLACK_1){
            result = { newPositionAllowedKing: 1, newPositionAllowedRook: 2}
            movementSpace = [1,  2,  3]
        }
        
        return result !== null && movementSpace.filter(position => positionBlocked.indexOf(position) === -1).length === movementSpace.length
            ? result
            : null
    }
    return null    
} 


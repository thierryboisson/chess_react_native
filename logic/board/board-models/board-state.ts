import { Piece, PLAYER, PIECE_ID, TYPE_PIECE } from "../../piece/models";
import { getById, movePiece, fetchPiece, initPieces } from "../../piece/models/models-utils/utils-models";
import { sortByPlayer } from "../board-utils/board-utils";
import { refreshPositionAllowed } from "./board-model-utils/board-model-utils";

export interface BoardState {
    pieces: Array<Piece>
    currentPlayer: PLAYER
    winner: PLAYER|null
}

export const initBoardStateStore = ():BoardState => ({
    pieces: initPieces(),
    currentPlayer: PLAYER.WHITE,
    winner: null
})


export const movePieceInBoard = (state: BoardState, pieceId: PIECE_ID, newPosition: number):boolean => {
    const {pieces} = state;
    const pieceToMove = getById(pieceId, pieces)
    
    if(pieceToMove){
       pieceToMove.move(newPosition)
    } else {
        console.warn(new Error(`${pieceId} is not pieces list`))
        return false
    }

    state.pieces = refreshPositionAllowed(pieces)

    return true
}

export const killPieceInBoard = (pieces: Array<Piece>, pieceIdToBeMoved: PIECE_ID, attackPosition: number):PIECE_ID|null => {
    const pieceKilled = pieces.filter(piece => piece.id !== pieceIdToBeMoved && piece.position === attackPosition)[0]
    if(pieceKilled){
        pieces = pieces.filter(piece => piece.id !== pieceKilled.id)
        return pieceKilled.id
    }
    return null
}

/**
 * Description - method to check if there are checkmate
 * @param opponentPieces
 * @param playerPieces
 */
export const isCheckmate = (state: BoardState): boolean => {
    const {pieces, currentPlayer} = state
    const {opponentPieces, playerPieces} = sortByPlayer(currentPlayer, pieces)
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

export const switchPlayer = (state: BoardState) => {
    state.currentPlayer = state.currentPlayer === PLAYER.WHITE ? PLAYER.BLACK : PLAYER.WHITE
}


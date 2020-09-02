import { initPieces, Piece, PLAYER, PIECE_ID, TYPE_PIECE } from "../../piece/models"
import { movePiece, getById, fetchPiece, getByPosition } from "../../piece/models/models-utils/utils-models";
import { sortByPlayer } from "../board-utils/board-utils";
import { isCheckmate } from "../board_rules/board_rules";
import { attackPiece, refreshPositionAllowed, changePlayer } from "./board-model-utils/board-model-utils";
import ChessEmitter from "../../../view-communication/emitter/emitter-model/emitter-model";
import { EMITTER_ACTION } from "../../../view-communication/emitter/emitter-types/emitter-types";

/**
 * Description - Board model to manage chess game
 */
class Board {
    pieces: Array<Piece>;
    player: PLAYER;
    pieceSelected: Piece|null;
    winner: PLAYER|null;
    emitter: ChessEmitter

    constructor(emitter: ChessEmitter){
        this.pieces = initPieces()
        this.player = PLAYER.WHITE
        this.pieceSelected = null
        this.winner = null
        this.emitter = emitter
        this.emitter.emit(EMITTER_ACTION.INIT_PIECE, {pieces: this.pieces, currentPlayer: this.player})
    }

    /**
     * Description - method to move Piece
     * @param newPosition 
     */
    movePiece(newPosition: number){
        if(this.pieceSelected === null){
            throw new Error("the piece is not selected")
        }
        const piecesSorted = sortByPlayer(this.player, this.pieces)
        
        // movePiece
        movePiece(
            newPosition, 
            this.pieceSelected, 
            piecesSorted.playerPieces.map(piecePlayer => piecePlayer.position),
            piecesSorted.opponentPieces.map(pieceOpponent => pieceOpponent.position)
        )
        
        // attack piece if there are in new postion
        const pieceKilledId: PIECE_ID|null = attackPiece(newPosition, piecesSorted.opponentPieces, this.pieces)
        if(pieceKilledId){
            this.emitter.emit(EMITTER_ACTION.KILL_PIECE, {id: pieceKilledId})
            this.pieces = this.pieces.filter(piece => piece.id !== pieceKilledId)
        }

        // refresh postionAllowed with a new position
        this.pieces = refreshPositionAllowed(this.pieces)
        this.emitter.emit(EMITTER_ACTION.MOVE_PIECE, {pieceId: this.pieceSelected.id, position: newPosition})

        // sort pieces after movement
        const piecesSortedAfterMovement = sortByPlayer(this.player, this.pieces)
        // check if it's checkmate
        if(isCheckmate(
            piecesSortedAfterMovement.opponentPieces,
            piecesSortedAfterMovement.playerPieces
        )){
            this.win()
            this.emitter.emit(EMITTER_ACTION.WIN, this.player)
            return
        }
        this.pieceSelected = null
        this.player = changePlayer(this.player)
    }

    

    /**
     * Description - method to select piece
     * @param pieceId 
     */
    selectPiece(pieceId: PIECE_ID){
        const pieceSelected:Piece|null = getById(pieceId, this.pieces)
        if(pieceSelected?.player === this.player){
            this.pieceSelected = pieceSelected
            this.emitter.emit(EMITTER_ACTION.SELECT_PIECE, this.pieceSelected.positionsAllowed)
        }  
    }
    
    /**
     * Description - method when current player win
     */
    win(){
        this.winner = this.player
    }
}

export default Board
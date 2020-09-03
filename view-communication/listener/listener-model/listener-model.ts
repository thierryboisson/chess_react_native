import { BOARD_PIECE_ID, VIEW_POSITION, VIEW_PIECE_ID } from "../../models/view-commincation-models"
import { viewPositionToBoardPosition, viewPieceIdToBoardPieceId, boardPositionToViewPosition } from "../../utils/view-comnunication-utils"
import { PIECE_ID } from "../../../logic/piece/models"
import ChessEmitter from "../../emitter/emitter-model/emitter-model"
import { initBoardStateStore, BoardState, movePieceInBoard, killPieceInBoard, isCheckmate, switchPlayer } from "../../../logic/board/board-models/board-state"
import { getById } from "../../../logic/piece/models/models-utils/utils-models"
import { EMITTER_ACTION } from "../../emitter/emitter-types/emitter-types"

class ChessListener {
    boardState: BoardState
    pieceIdSelected: PIECE_ID|null
    emitter: ChessEmitter
    constructor(socket:any){
        this.boardState = initBoardStateStore() 
        this.pieceIdSelected = null
        this.emitter = new ChessEmitter(socket)
        this.emitter.emit(EMITTER_ACTION.INIT_PIECE, {pieces: this.boardState.pieces, currentPlayer: this.boardState.currentPlayer} )
    }

    selectPiece(pieceId: VIEW_PIECE_ID){
        this.pieceIdSelected = PIECE_ID[viewPieceIdToBoardPieceId(pieceId)]
        if(!this.pieceIdSelected){
            throw new Error("this piece id doesn't exist")
        }
        if(this.boardState.pieces){
            const pieceToMove = getById(this.pieceIdSelected, this.boardState.pieces)
            if(pieceToMove?.player === this.boardState.currentPlayer){
                const positionsAllowed = getById(this.pieceIdSelected, this.boardState.pieces)?.positionsAllowed 
                this.emitter.emit(EMITTER_ACTION.SELECT_PIECE, positionsAllowed)
            }
            
        }
        
    }

    movePiece(position: VIEW_POSITION){
        if(!this.pieceIdSelected){
            throw new Error("they are not piece selected")
        }
        const newPosition = viewPositionToBoardPosition(position)
        if(movePieceInBoard(this.boardState, this.pieceIdSelected, newPosition)){
            const pieceIdToBeKilled = killPieceInBoard(this.boardState.pieces, this.pieceIdSelected, newPosition)
            if(pieceIdToBeKilled){
                this.emitter.emit(EMITTER_ACTION.KILL_PIECE, {id: pieceIdToBeKilled})
            }
            this.emitter.emit(EMITTER_ACTION.MOVE_PIECE, {id: this.pieceIdSelected, position: newPosition})
            if(isCheckmate(this.boardState)){
                this.emitter.emit(EMITTER_ACTION.WIN, {winner: this.boardState.currentPlayer})
            } else {
                this.pieceIdSelected = null
                switchPlayer(this.boardState)
            }
        }
    }
    
}

export default ChessListener
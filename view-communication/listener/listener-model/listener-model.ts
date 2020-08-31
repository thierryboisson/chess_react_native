import Board from "../../../logic/board/board-models/board-model"
import { BOARD_PIECE_ID, VIEW_POSITION, VIEW_PIECE_ID } from "../../models/view-commincation-models"
import { viewPositionToBoardPosition, viewPieceIdToBoardPieceId } from "../../utils/view-comnunication-utils"
import { PIECE_ID } from "../../../logic/piece/models"
import ChessEmitter from "../../emitter/emitter-model/emitter-model"

class ChessListener {
    board: Board
    constructor(socket:any){
        this.board = new Board(new ChessEmitter(socket))
    }

    selectPiece(pieceId: VIEW_PIECE_ID){
        this.board.selectPiece(PIECE_ID[viewPieceIdToBoardPieceId(pieceId)])
    }

    movePiece(position: VIEW_POSITION){
        this.board.movePiece(viewPositionToBoardPosition(position))
    }
    
}

export default ChessListener
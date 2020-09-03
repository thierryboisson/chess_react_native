import { EMITTER_ACTION, MovePieceArgument, SelectPieceArgument, WinArgument } from "../emitter-types/emitter-types"
import { boardPieceIdToViewPieceId, boardPositionToViewPosition } from "../../utils/view-comnunication-utils"
import { initBoardStateStore, BoardState } from "../../../logic/board/board-models/board-state"

class ChessEmitter{
    socket:any
    constructor(socket:any){
        this.socket = socket
        
    }

    emit(action: EMITTER_ACTION, payload: any){
        switch(action){
            case EMITTER_ACTION.INIT_PIECE: {
                this.socket.emit(action, {
                    pieces: payload.pieces.map(piece => ({
                        id: boardPieceIdToViewPieceId(piece.id),
                        position: boardPositionToViewPosition(piece.position),
                    })),
                    currentPlayer: payload.currentPlayer.toLowerCase()
                })
                break;
            }
            case EMITTER_ACTION.KILL_PIECE: {
                this.socket.emit(action, {
                    id: boardPieceIdToViewPieceId(payload.id)
                })
                break;
            }
            case EMITTER_ACTION.MOVE_PIECE:
                this.socket.emit(action, {
                    id: boardPieceIdToViewPieceId(payload.pieceId),
                    position: boardPositionToViewPosition(payload.position),
                })
                break;
            case EMITTER_ACTION.SELECT_PIECE:
                this.socket.emit(action, {
                    allowedPositions: payload.map((positionAllowed: number) => boardPositionToViewPosition(positionAllowed))
                })
                break;
            case EMITTER_ACTION.WIN:
                this.socket.emit(action, {
                    winner: payload.toLowerCase()
                })
                break;
            default:
                throw new Error(`${action} doesn't exist`);
        }
    }
}

export default ChessEmitter
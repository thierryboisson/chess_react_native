import { EMITTER_ACTION, MovePieceArgument, SelectPieceArgument, WinArgument } from "../emitter-types/emitter-types"
import { boardPieceIdToViewPieceId, boardPositionToViewPosition } from "../../utils/view-comnunication-utils"

class ChessEmitter{
    socket:any
    constructor(socket:any){
        this.socket = socket
    }

    emit(action: EMITTER_ACTION, payload: any){
        console.log({action, payload})
        switch(action){
            case EMITTER_ACTION.MOVE_PIECE:
                this.socket.emit(action, {
                    pieceId: boardPieceIdToViewPieceId(payload.pieceId),
                    position: boardPositionToViewPosition(payload.position)
                })
                break;
            case EMITTER_ACTION.SELECT_PIECE:
                this.socket.emit(action, {
                    allowedPositions: payload.map((positionAllowed: number) => boardPositionToViewPosition(positionAllowed))
                })
                break;
            case EMITTER_ACTION.WIN:
                this.socket.emit(action, {
                    winner: payload
                })
                break;
            default:
                throw new Error(`${action} doesn't exist`);
        }
    }
}

export default ChessEmitter
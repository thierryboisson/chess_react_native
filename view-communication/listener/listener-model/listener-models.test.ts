import ChessListener from "./listener-model"
import Board from "../../../logic/board/board-models/board-model"
import { VIEW_PIECE_ID, VIEW_POSITION } from "../../models/view-commincation-models"
import { PIECE_ID } from "../../../logic/piece/models"
import { getById } from "../../../logic/piece/models/models-utils/utils-models"

describe('ChessListener', () => {

    const socketMock: any = {on: () => {}, emit: () => {}}
    it('constructor', () => {
        const listener = new ChessListener(socketMock)
    })
    it('selectPiece()', () => {
        const listener = new ChessListener(socketMock)
        listener.selectPiece(VIEW_PIECE_ID.PAWN_WHITE_1)
        expect(listener.pieceIdSelected).toBe(PIECE_ID.PAWN_WHITE_1)
    })
    it('movePiece()', () => {
        const listener = new ChessListener(socketMock)
        listener.selectPiece(VIEW_PIECE_ID.PAWN_WHITE_1)
        listener.movePiece(VIEW_POSITION.a4)
        expect(getById(PIECE_ID.PAWN_WHITE_1, listener.boardState.pieces)?.position).toBe(32)
    })
})
import ChessListener from "./listener-model"
import Board from "../../../logic/board/board-models/board-model"
import { VIEW_PIECE_ID, VIEW_POSITION } from "../../models/view-commincation-models"
import { PIECE_ID } from "../../../logic/piece/models"
import { getById } from "../../../logic/piece/models/models-utils/utils-models"

describe('ChessListener', () => {
    it('constructor', () => {
        const listener = new ChessListener(null)
    })
    it('selectPiece()', () => {
        const listener = new ChessListener(null)
        listener.selectPiece(VIEW_PIECE_ID.PAWN_WHITE_1)
        expect(listener.board.pieceSelected?.id).toBe(PIECE_ID.PAWN_WHITE_1)
    })
    it('movePiece()', () => {
        const listener = new ChessListener(null)
        listener.selectPiece(VIEW_PIECE_ID.PAWN_WHITE_1)
        listener.movePiece(VIEW_POSITION.a4)
        expect(getById(PIECE_ID.PAWN_WHITE_1, listener.board.pieces)?.position).toBe(32)
    })
})
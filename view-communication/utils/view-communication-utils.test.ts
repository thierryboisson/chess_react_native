import { viewPositionToBoardPosition, boardPositionToViewPosition, viewPieceIdToBoardPieceId, boardPieceIdToViewPieceId } from "./view-comnunication-utils"
import { VIEW_POSITION, VIEW_PIECE_ID, BOARD_PIECE_ID } from "../models/view-commincation-models"

describe('view-communication-utils', () => {
    it('viewPositionToBoardPosition()', () => {
        expect(viewPositionToBoardPosition(VIEW_POSITION.h1)).toBe(63)
        expect(viewPositionToBoardPosition(VIEW_POSITION.g8)).toBe(6)
        expect(viewPositionToBoardPosition(VIEW_POSITION.f3)).toBe(45)
        expect(viewPositionToBoardPosition(VIEW_POSITION.a5)).toBe(24)
    })
    it('boardPositionToViewPosition()', () => {
        expect(boardPositionToViewPosition(27)).toBe(VIEW_POSITION.d5)
        expect(boardPositionToViewPosition(22)).toBe(VIEW_POSITION.g6)
        expect(boardPositionToViewPosition(9)).toBe(VIEW_POSITION.b7)
        expect(boardPositionToViewPosition(5)).toBe(VIEW_POSITION.f8)
    })
    it('viewPieceIdToBoardPieceId()', () => {
        expect(viewPieceIdToBoardPieceId(VIEW_PIECE_ID.BISHOP_BLACK_1)).toBe(BOARD_PIECE_ID["bischop-black-1"])
        expect(viewPieceIdToBoardPieceId(VIEW_PIECE_ID.PAWN_BLACK_1)).toBe(BOARD_PIECE_ID["pawn-black-1"])
        expect(viewPieceIdToBoardPieceId(VIEW_PIECE_ID.KING_WHITE)).toBe(BOARD_PIECE_ID["king-white"])
        expect(viewPieceIdToBoardPieceId(VIEW_PIECE_ID.KNIGHT_WHITE_2)).toBe(BOARD_PIECE_ID["knight_white-2"])
    })
    it('boardPieceIdToViewPieceId()', () => {
        expect(boardPieceIdToViewPieceId(BOARD_PIECE_ID["pawn-white-2"])).toBe(VIEW_PIECE_ID.PAWN_WHITE_2)
        expect(boardPieceIdToViewPieceId(BOARD_PIECE_ID["knight-black-2"])).toBe(VIEW_PIECE_ID.KNIGHT_BLACK_2)
        expect(boardPieceIdToViewPieceId(BOARD_PIECE_ID["queen-white"])).toBe(VIEW_PIECE_ID.QUEEN_WHITE)
        expect(boardPieceIdToViewPieceId(BOARD_PIECE_ID["bischop-white-2"])).toBe(VIEW_PIECE_ID.BISHOP_WHITE_2)
    })
})
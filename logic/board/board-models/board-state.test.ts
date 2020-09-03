import { BoardState, initBoardStateStore, movePieceInBoard, killPieceInBoard , isCheckmate, switchPlayer} from "./board-state"
import { PLAYER, Piece, PIECE_ID, TYPE_PIECE, DEFAULT_POSITION } from "../../piece/models"
import { refreshPositionAllowed } from "./board-model-utils/board-model-utils"

describe('boardState', () => {
    it('initBoardStateStore()', () => {
        const state: BoardState = initBoardStateStore()
        expect(state.pieces.length).toBe(32)
        expect(state.currentPlayer).toBe(PLAYER.WHITE)
        expect(state.winner).toBe(null)
    })
    describe('movePieceInBoard()', () => {
        it('success', () => {
            const piecesToMove = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
            const state: BoardState = {
                pieces: [piecesToMove],
                currentPlayer: PLAYER.BLACK,
                winner: null
            } 
            refreshPositionAllowed(state.pieces)
            const isMoved = movePieceInBoard(state, PIECE_ID.PAWN_BLACK_1, 24)
            expect(isMoved).toBeTruthy()
            expect(piecesToMove.position).toBe(24)
        })
        it('failed', () => {
            const piecesToMove = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
            const state: BoardState = {
                pieces: [piecesToMove],
                currentPlayer: PLAYER.BLACK,
                winner: null
            } 
            refreshPositionAllowed(state.pieces)
            const isMoved = movePieceInBoard(state, PIECE_ID.PAWN_BLACK_2, 24)
            expect(isMoved).not.toBeTruthy()
            
        })
    })
    describe('killPieceInBoard()', () => {
       it('success', () => {
        const piecesToKill = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
        const attackPosition = DEFAULT_POSITION.PAWN_BLACK_1
        const result: PIECE_ID|null = killPieceInBoard([piecesToKill], PIECE_ID.PAWN_WHITE_1, attackPosition)
        expect(result).toBe(PIECE_ID.PAWN_BLACK_1)
       })
       it('failed', () => {
        const piecesToKill = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
        const attackPosition = 50
        const result: PIECE_ID|null = killPieceInBoard([piecesToKill], PIECE_ID.PAWN_WHITE_1, attackPosition)
        expect(result).toBeNull()
       })
    })

    describe('isCheckmate()', () => {
        it('true result', () => {
            const state: BoardState = initBoardStateStore()
            movePieceInBoard(state, PIECE_ID.PAWN_WHITE_5, 36)
            movePieceInBoard(state, PIECE_ID.PAWN_BLACK_6, 29)
            movePieceInBoard(state, PIECE_ID.QUEEN_BLACK, 31)
            state.currentPlayer = PLAYER.BLACK
            expect(isCheckmate(state)).toBeTruthy()
        })
        describe('false result', () => {
            it("no potential attack" ,() =>{
                const state: BoardState = initBoardStateStore()
                movePieceInBoard(state, PIECE_ID.PAWN_WHITE_5, 36)
                movePieceInBoard(state, PIECE_ID.PAWN_BLACK_6, 29)
                movePieceInBoard(state, PIECE_ID.QUEEN_BLACK, 22)
                state.currentPlayer = PLAYER.BLACK
                expect(isCheckmate(state)).not.toBeTruthy()
            })
            
            it('potential conterattack', () => {
                const state: BoardState = initBoardStateStore()
                movePieceInBoard(state, PIECE_ID.PAWN_WHITE_5, 36)
                movePieceInBoard(state, PIECE_ID.PAWN_BLACK_6, 29)
                movePieceInBoard(state, PIECE_ID.PAWN_WHITE_8, 39)
                movePieceInBoard(state, PIECE_ID.QUEEN_BLACK, 22)
                state.currentPlayer = PLAYER.BLACK
                expect(isCheckmate(state)).not.toBeTruthy()
            })
        })
    })
    describe('switchPlayer()', () => {
        const state = initBoardStateStore() // currentPlayer = PLAYER.WHITE
        switchPlayer(state)
        expect(state.currentPlayer).toBe(PLAYER.BLACK)
    })
})
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
        describe('failed', () => {
            it("piece doesn't exist", () => {
                const piecesToMove = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
                const state: BoardState = {
                    pieces: [piecesToMove],
                    currentPlayer: PLAYER.BLACK,
                    winner: null
                } 
                refreshPositionAllowed(state.pieces)
                try {
                    const isMoved = movePieceInBoard(state, PIECE_ID.PAWN_BLACK_2, 24)
                    fail()
                } catch(errorPieceIdNotInPiecesList){}
               
                
            } )
            it("piece doesn't belong to current player", () => {
                const piecesToMove = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
                const state: BoardState = {
                    pieces: [piecesToMove],
                    currentPlayer: PLAYER.WHITE,
                    winner: null
                } 
                refreshPositionAllowed(state.pieces)
                try {
                    const isMoved = movePieceInBoard(state, PIECE_ID.PAWN_BLACK_1, 24)
                    fail()
                } catch(errorPieceNotBelongToCurrentPlayer){}
               
                
            } )
        })
    })
    describe('killPieceInBoard()', () => {
       describe('success', () => {
            it('attack', () => {
                const piecesToKill = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
                const attackPosition = DEFAULT_POSITION.PAWN_BLACK_1 // piece to kill position
                const result: PIECE_ID|null = killPieceInBoard(
                    [piecesToKill, new Piece(PIECE_ID.PAWN_WHITE_1, PLAYER.WHITE, TYPE_PIECE.PAWN)], 
                    PIECE_ID.PAWN_WHITE_1, 
                    attackPosition
                )
                expect(result).toBe(PIECE_ID.PAWN_BLACK_1)
            })
            it('no attack', () => {
                const piecesToKill = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
                const attackPosition = 50 // wrong position
                const result: PIECE_ID|null = killPieceInBoard(
                    [piecesToKill, new Piece(PIECE_ID.PAWN_WHITE_1, PLAYER.WHITE, TYPE_PIECE.PAWN)], 
                    PIECE_ID.PAWN_WHITE_1, 
                    attackPosition
                )
                expect(result).toBeNull()
            })
       })
       it('failed', () => {
        const piecesToKill = new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK, TYPE_PIECE.PAWN)
        const attackPosition = DEFAULT_POSITION.PAWN_BLACK_1
        // pieceId in movement is not piece list
        try {
            const result: PIECE_ID|null = killPieceInBoard(
                [piecesToKill], 
                PIECE_ID.PAWN_WHITE_1, 
                attackPosition
            )
            fail()
        } catch (errorPieceIdInMovementNotInPieceList){}
       
       })
      
    })

    describe('isCheckmate()', () => {
        it('true result', () => {
            const state: BoardState = initBoardStateStore()
            movePieceInBoard(state, PIECE_ID.PAWN_WHITE_5, 36)
            switchPlayer(state)
            movePieceInBoard(state, PIECE_ID.PAWN_BLACK_6, 29)
            movePieceInBoard(state, PIECE_ID.QUEEN_BLACK, 31)
            state.currentPlayer = PLAYER.BLACK
            expect(isCheckmate(state)).toBeTruthy()
        })
        describe('false result', () => {
            it("no potential attack" ,() =>{
                const state: BoardState = initBoardStateStore()
                movePieceInBoard(state, PIECE_ID.PAWN_WHITE_5, 36)
                switchPlayer(state)
                movePieceInBoard(state, PIECE_ID.PAWN_BLACK_6, 29)
                movePieceInBoard(state, PIECE_ID.QUEEN_BLACK, 22)
                state.currentPlayer = PLAYER.BLACK
                expect(isCheckmate(state)).not.toBeTruthy()
            })
            
            it('potential conterattack', () => {
                const state: BoardState = initBoardStateStore()
                movePieceInBoard(state, PIECE_ID.PAWN_WHITE_5, 36)
                switchPlayer(state)
                movePieceInBoard(state, PIECE_ID.PAWN_BLACK_6, 29)
                switchPlayer(state)
                movePieceInBoard(state, PIECE_ID.PAWN_WHITE_8, 39)
                switchPlayer(state)
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
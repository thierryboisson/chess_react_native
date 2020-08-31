import Board from "./board-model"
import { PLAYER, fetchPiece, PIECE_ID } from "../../piece/models"
import { getById } from "../../piece/models/models-utils/utils-models"

describe('Board', () =>{
    it('constructor', () => {
        const board = new Board()
        expect(board.pieces.length).toBe(32)
        expect(fetchPiece('player', PLAYER.WHITE, board.pieces).length).toBe(16)
        expect(fetchPiece('player', PLAYER.BLACK, board.pieces).length).toBe(16)
        expect(board.player).toBe(PLAYER.WHITE)
        expect(board.pieceSelected).toBeNull();
        expect(board.winner).toBeNull()
    })

    describe('function', () => {

        describe('selectPiece())', () => {
            it('failure', () =>{
                const board = new Board()
                //current player is white
                try {
                    board.selectPiece(PIECE_ID.PAWN_BLACK_1)
                    fail()
                } catch(errorProcess){}
            })
            it('success', () =>{
                const board = new Board()
                board.selectPiece(PIECE_ID.PAWN_WHITE_1)
                expect(board.pieceSelected?.id).not.toBeNull()
                expect(board.pieceSelected?.id).toBe(PIECE_ID.PAWN_WHITE_1)
            })
        })
        
        describe('movePiece()', () => {
            it('success', () => {
                const board = new Board()
                const allPositionAllowed = board.pieces.map(piece => piece.positionsAllowed);
                board.selectPiece(PIECE_ID.PAWN_WHITE_1)
                board.movePiece(32)
                const pieceMoved = getById(PIECE_ID.PAWN_WHITE_1, board.pieces)
                expect(pieceMoved?.position).toBe(32)
                expect(pieceMoved?.hasBeenPlayerOneTime).toBe(true)
                expect(board.pieceSelected).toBeNull()
                expect(board.player).toBe(PLAYER.BLACK)
                const refreshAllPositionsAllowed = board.pieces.map(piece => piece.positionsAllowed);
                expect(allPositionAllowed).not.toStrictEqual(refreshAllPositionsAllowed)
            })
            it('failure', () => {
                const board = new Board()
                try{
                    // none piece is selected
                    board.movePiece(32)
                    fail()
                } catch(errorProcess){}
            })

        })
        it('win()', () => {
            const board = new Board()
            board.win()
            expect(board.winner).toBe(PLAYER.WHITE)
        })
    })

    describe('scenario game', () => {
        it('checkmate', () => {
            const board = new Board()
            // white pawn 6 f4
            board.selectPiece(PIECE_ID.PAWN_WHITE_6)
            board.movePiece(37)
            // black pawn 5 e5
            board.selectPiece(PIECE_ID.PAWN_BLACK_5)
            board.movePiece(28)
            // white pawn 6 e5 (diagonal attack)
            board.selectPiece(PIECE_ID.PAWN_WHITE_6)
            board.movePiece(28)
            // black queen h4 -> checkmate
            board.selectPiece(PIECE_ID.QUEEN_BLACK)
            board.movePiece(39)
            expect(board.winner).toBe(PLAYER.BLACK)

        })
    })
})
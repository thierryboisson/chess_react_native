import { initPieces, TYPE_PIECE, DEFAULT_POSITION, PIECE_ID } from ".."
import { fetchPiece, fetchByPositions, getByPosition, movePiece } from "./utils-models";
import { PLAYER } from "../Types";
import Piece from "../Piece";

describe('utils-models', () => {

    it('initPiece', () => {
        const pieces = initPieces()
        expect(pieces.length).toBe(32)
    })

    describe('fetchPiece', () => {
        it('fetch By Player', () => {
            const pieces = initPieces();
            const piecesFiltered = fetchPiece('player', PLAYER.WHITE, pieces)
            expect(piecesFiltered.length).toBe(16)
            piecesFiltered.forEach(piece => {
                expect(piece.player).toBe(PLAYER.WHITE)
            })
        })

        it('fetch By Type', () => {
            const pieces = initPieces();
            const piecesFiltered = fetchPiece('type', TYPE_PIECE.PAWN, pieces)
            expect(piecesFiltered.length).toBe(16)
            piecesFiltered.forEach(piece => {
                expect(piece.type).toBe(TYPE_PIECE.PAWN)
            })
        })
    })
    describe("fetchByPositions", () => {
        it("with ont null result", () => {
                // init piece with start position
            const pieces = initPieces();
            const positions = [DEFAULT_POSITION.PAWN_BLACK_1, DEFAULT_POSITION.PAWN_BLACK_2]
            const piecesFiltered = fetchByPositions(positions, pieces)
            expect(piecesFiltered?.length).toBe(2)
            piecesFiltered?.forEach(piece => {
                expect(positions.indexOf(piece.position)).not.toBe(-1)
            })
        })

        
        it("with ont null result", () => {
            // init piece with start position
        const pieces = initPieces();
        const positions = [35,36] 
        const piecesFiltered = fetchByPositions(positions, pieces)
        expect(piecesFiltered).toBeNull()
    })
        
    })

    describe("getByPosition", () => {
       it('with not null result', () => {
        const pieces = initPieces();
        const piece = getByPosition(DEFAULT_POSITION.BISHOP_BLACK_1, pieces)
        expect(piece).not.toBeNull()
        expect(piece?.position).toBe(DEFAULT_POSITION.BISHOP_BLACK_1)
       }) 

       it('with null result', () => {
        const pieces = initPieces();
        const piece = getByPosition(35, pieces)
        expect(piece).toBeNull()
       }) 
    })

    describe('movePiece', () => {
        it('success' , () => {
            const piece = new Piece(PIECE_ID.PAWN_BLACK_5, PLAYER.BLACK, TYPE_PIECE.PAWN)
            movePiece(28, piece, [], [])
            expect(piece.position).toBe(28)
            expect(piece.hasBeenPlayerOneTime).toBe(true)
            expect(piece.positionsAllowed).toStrictEqual([36])
        })

        it('failure', () => {
            const piece = new Piece(PIECE_ID.PAWN_BLACK_5, PLAYER.BLACK, TYPE_PIECE.PAWN)
            try {
                // new position is not allowed by piece movement rules
                movePiece(21, piece, [36], [])
                fail()
            } catch (errorProcess) { }
        })
    })


})
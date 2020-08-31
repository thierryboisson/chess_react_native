import Piece from "./Piece"
import { PIECE_ID, PLAYER, TYPE_PIECE, DEFAULT_POSITION, fetchPiece, initPieces } from "."
import { MovementRulesBishop } from "../movement_rules/movement-rules-impl"
import { sortPositions } from "../movement_rules-utils/movement_rules-utils.test"


describe('Piece Model', () => {
    it('constructor', () => {
        const piece = new Piece(PIECE_ID.BISHOP_WHITE_1, PLAYER.WHITE, TYPE_PIECE.BISHOP)
        expect(piece.id).toBe(PIECE_ID.BISHOP_WHITE_1)
        expect(piece.player).toBe(PLAYER.WHITE)
        expect(piece.type).toBe(TYPE_PIECE.BISHOP)

        expect(piece.position).toBe(DEFAULT_POSITION.BISHOP_WHITE_1)
        expect(piece.hasBeenPlayerOneTime).toBe(false)
        expect(piece.movementRules).toBe(MovementRulesBishop)
        expect(piece.positionsAllowed).toStrictEqual([])
    })
    describe('function', () => {
        it('calculate position allowed', () => {
            const pieceTest: Piece = new Piece(PIECE_ID.PAWN_WHITE_1, PLAYER.WHITE, TYPE_PIECE.PAWN)
            pieceTest.calculatePositionAllowed([], [])
            expect(sortPositions(pieceTest.positionsAllowed)).toStrictEqual(sortPositions([40,32]))   
        })
        describe('move', () => {
            it('success context', () => {
                const pieceTest: Piece = new Piece(PIECE_ID.PAWN_WHITE_1, PLAYER.WHITE, TYPE_PIECE.PAWN)
                pieceTest.calculatePositionAllowed([], []) // set [40,32] as value of positionAllowed 
                pieceTest.move(40) 
                expect(pieceTest.position).toBe(40)
                expect(pieceTest.hasBeenPlayerOneTime).toBe(true)
            })
            it('failure context', () => {
                const pieceTest: Piece = new Piece(PIECE_ID.PAWN_WHITE_1, PLAYER.WHITE, TYPE_PIECE.PAWN)
                pieceTest.calculatePositionAllowed([], []) // set [40,32] as value of positionAllowed 
                try {
                    pieceTest.move(50) // this positio is not allowed
                    fail()
                } catch (errorProcess){}
            })
        })
        describe('promote', () => {
            it('success context', () =>{
                const pieceTest: Piece = new Piece(PIECE_ID.PAWN_WHITE_1, PLAYER.WHITE, TYPE_PIECE.PAWN)
                pieceTest.promote(TYPE_PIECE.KNIGHT)
                expect(pieceTest.type).toBe(TYPE_PIECE.KNIGHT)
            })

            describe('failure context', () => {
                it('wrong piece type', () => {
                    const pieceTest: Piece = new Piece(PIECE_ID.BISHOP_BLACK_2, PLAYER.BLACK, TYPE_PIECE.BISHOP)
                    try {
                        pieceTest.promote(TYPE_PIECE.KNIGHT)
                        fail()
                    } catch(errorProcess){}
                })
                it('wrong new piece type', () => {
                    const pieceTest: Piece = new Piece(PIECE_ID.PAWN_WHITE_1, PLAYER.WHITE, TYPE_PIECE.PAWN)
                    try {
                        pieceTest.promote(TYPE_PIECE.KING)
                        fail()
                    } catch(errorProcess){}
                })
            })
        })

        it('addPositionAllowed', () => {
            const pieceTest: Piece = new Piece(PIECE_ID.PAWN_WHITE_1, PLAYER.WHITE, TYPE_PIECE.PAWN)
            const newAllowedPositions: Array<number> = [55, 40]
            pieceTest.addPositionAllowed(newAllowedPositions)
            newAllowedPositions.forEach(position => {
                expect(pieceTest.positionsAllowed.indexOf(position)).not.toBe(-1)
            })
        })
    })
})
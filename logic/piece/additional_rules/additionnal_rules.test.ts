import { isPassingCatch, isRoque } from "./additional_rules"
import { Piece, PIECE_ID, PLAYER, TYPE_PIECE } from "../models"

describe('additionnal_rules', () => {
    describe('isPassingCatch', () => {
        describe('success context', () => {
            describe('attack allowed', () => {
                it('player black attack', () => {
                    const pieceTest= new Piece(PIECE_ID.PAWN_BLACK_2, PLAYER.BLACK, TYPE_PIECE.PAWN)
                    const positionOpponentPiece = [24,26]
                    pieceTest.calculatePositionAllowed([],positionOpponentPiece)
                    pieceTest.move(25)
                    const result = isPassingCatch(pieceTest,[], positionOpponentPiece)
                    expect(result).not.toBe(null)
                    expect(result?.length).toBe(2)
                    if(result?.length){
                        // right attack
                        const attack1 = result[0]
                        expect(attack1.positionAllowed).toBe(34)
                        expect(attack1.positionOpponentCatch).toBe(26)

                        // left attack
                        const attack2 = result[1]
                        expect(attack2.positionAllowed).toBe(32)
                        expect(attack2.positionOpponentCatch).toBe(24)
                    }
                })

                it('player white attack', () => {
                    const pieceTest= new Piece(PIECE_ID.PAWN_WHITE_2, PLAYER.WHITE, TYPE_PIECE.PAWN)
                    const positionOpponentPiece = [40,42]
                    pieceTest.calculatePositionAllowed([],positionOpponentPiece)
                    pieceTest.move(41)
                    const result = isPassingCatch(pieceTest,[], positionOpponentPiece)
                    expect(result).not.toBe(null)
                    expect(result?.length).toBe(2)
                    if(result?.length){
                        // right attack
                        const attack1 = result[0]
                        expect(attack1.positionAllowed).toBe(34)
                        expect(attack1.positionOpponentCatch).toBe(42)

                        // left attack
                        const attack2 = result[1]
                        expect(attack2.positionAllowed).toBe(32)
                        expect(attack2.positionOpponentCatch).toBe(40)
                    }
                })
            })

            describe('attack no allowed', () => {
                it('no opponent piece to attack', () => {
                    const pieceTest= new Piece(PIECE_ID.PAWN_BLACK_2, PLAYER.BLACK, TYPE_PIECE.PAWN)
                    const positionOpponentPiece = []
                    pieceTest.calculatePositionAllowed([],positionOpponentPiece)
                    pieceTest.move(25)
                    const result = isPassingCatch(pieceTest,[], positionOpponentPiece)
                    expect(result).toBe(null)
                })               
                it('player blocked by opponent', () => {
                    const pieceTest= new Piece(PIECE_ID.PAWN_BLACK_2, PLAYER.BLACK, TYPE_PIECE.PAWN)
                    const positionOpponentPiece = [26,34]
                    pieceTest.calculatePositionAllowed([],positionOpponentPiece)
                    pieceTest.move(25)
                    const result = isPassingCatch(pieceTest,[], positionOpponentPiece)
                    expect(result).toBe(null)
                })
                it('player blocked by his piece', () => {
                    const pieceTest= new Piece(PIECE_ID.PAWN_BLACK_2, PLAYER.BLACK, TYPE_PIECE.PAWN)
                    const positionOpponentPiece = [26]
                    const positionPlayerPiece = [34]
                    pieceTest.calculatePositionAllowed(positionPlayerPiece,positionOpponentPiece)
                    pieceTest.move(25)
                    const result = isPassingCatch(pieceTest,positionPlayerPiece, positionOpponentPiece)
                    expect(result).toBe(null)
                })
            })
        })
        it('failure context', () => {
            try {
                const result = isPassingCatch(new Piece(PIECE_ID.BISHOP_BLACK_1, PLAYER.BLACK, TYPE_PIECE.BISHOP),[],[])
                fail()
            } catch (errorProcess){}
        })
    })

    describe('isRoque', () => {
        describe('success context', () => {
            describe('movement allowed', () => {
                describe('little roque', () => {
                    it('white player', () => {
                        const rookPiece: Piece = new Piece(PIECE_ID.ROOK_WHITE_2,PLAYER.WHITE, TYPE_PIECE.ROOK)
                        const kingPiece: Piece =  new Piece(PIECE_ID.KING_WHITE,PLAYER.WHITE, TYPE_PIECE.KING)
                        const result = isRoque(rookPiece, kingPiece, [1], [2])
                        expect(result).not.toBeNull()
                        expect(result?.newPositionAllowedKing).toBe(62)
                        expect(result?.newPositionAllowedRook).toBe(61)
                    }) 
                    it('black player', () => {
                        const rookPiece: Piece = new Piece(PIECE_ID.ROOK_BLACK_2,PLAYER.BLACK, TYPE_PIECE.ROOK)
                        const kingPiece: Piece =  new Piece(PIECE_ID.KING_BLACK,PLAYER.BLACK, TYPE_PIECE.KING)
                        const result = isRoque(rookPiece, kingPiece, [1], [2])
                        expect(result).not.toBeNull()
                        expect(result?.newPositionAllowedKing).toBe(6)
                        expect(result?.newPositionAllowedRook).toBe(5)
                    }) 
                })

                describe('roque', () => {
                    it('white player', () => {
                        const rookPiece: Piece = new Piece(PIECE_ID.ROOK_WHITE_1,PLAYER.WHITE, TYPE_PIECE.ROOK)
                        const kingPiece: Piece =  new Piece(PIECE_ID.KING_WHITE,PLAYER.WHITE, TYPE_PIECE.KING)
                        const result = isRoque(rookPiece, kingPiece, [8], [9])
                        expect(result).not.toBeNull()
                        expect(result?.newPositionAllowedKing).toBe(57)
                        expect(result?.newPositionAllowedRook).toBe(58)
                    }) 

                    it('black player', () => {
                        const rookPiece: Piece = new Piece(PIECE_ID.ROOK_BLACK_1,PLAYER.BLACK, TYPE_PIECE.ROOK)
                        const kingPiece: Piece =  new Piece(PIECE_ID.KING_BLACK,PLAYER.BLACK, TYPE_PIECE.KING)
                        const result = isRoque(rookPiece, kingPiece, [8], [9])
                        expect(result).not.toBeNull()
                        expect(result?.newPositionAllowedKing).toBe(1)
                        expect(result?.newPositionAllowedRook).toBe(2)
                    }) 
                })
            })

            describe('movement not allowed', () => {

                it('other position block', () => {
                    const rookPiece: Piece = new Piece(PIECE_ID.ROOK_WHITE_1,PLAYER.WHITE, TYPE_PIECE.ROOK)
                    const kingPiece: Piece =  new Piece(PIECE_ID.KING_WHITE,PLAYER.WHITE, TYPE_PIECE.KING)
                    const result = isRoque(rookPiece, kingPiece, [57], [])
                    expect(result).toBeNull()
                })
                it('opponent position allowed block', () => {
                    const rookPiece: Piece = new Piece(PIECE_ID.ROOK_WHITE_1,PLAYER.WHITE, TYPE_PIECE.ROOK)
                    const kingPiece: Piece =  new Piece(PIECE_ID.KING_WHITE,PLAYER.WHITE, TYPE_PIECE.KING)
                    const result = isRoque(rookPiece, kingPiece, [], [58])
                    expect(result).toBeNull()
                })
            })
        })

        describe('failure context', () => {
            it('wrong king type piece', () => {
                try {
                    const result = isRoque(
                        new Piece(PIECE_ID.BISHOP_BLACK_1, PLAYER.BLACK, TYPE_PIECE.BISHOP),
                        new Piece(PIECE_ID.ROOK_BLACK_1, PLAYER.BLACK, TYPE_PIECE.ROOK),
                        [],
                        []
                    )
                    fail()
                } catch(errorProcess){}
            })

            it('wrong rook type piece', () => {
                try {
                    const result = isRoque(
                        new Piece(PIECE_ID.KING_BLACK, PLAYER.BLACK, TYPE_PIECE.KING),
                        new Piece(PIECE_ID.BISHOP_BLACK_1, PLAYER.BLACK, TYPE_PIECE.BISHOP),
                        [],
                        []
                    )
                    fail()
                } catch(errorProcess){}
            })

            it('two piece from different player', () => {
                try {
                    const result = isRoque(
                        new Piece(PIECE_ID.KING_BLACK, PLAYER.BLACK, TYPE_PIECE.KING),
                        new Piece(PIECE_ID.ROOK_WHITE_1, PLAYER.WHITE, TYPE_PIECE.ROOK),
                        [],
                        []
                    )
                    fail()
                } catch(errorProcess){}
            })
        })
    })
})
import { isCheckmate} from "./board_rules"
import { Piece, PIECE_ID, PLAYER, TYPE_PIECE } from "../../piece/models"
import { initPieces, getById } from "../../piece/models/models-utils/utils-models"
import { sortByPlayer } from "../board-utils/board-utils"
import { refreshPositionAllowed } from "../board-models/board-model-utils/board-model-utils"

describe('board_rules', () => {
    describe('isCheckmate', () => {
        it('true result', () => {
            const pieces: Array<Piece> = initPieces()
            getById(PIECE_ID.PAWN_WHITE_5, pieces)?.move(36)
            getById(PIECE_ID.PAWN_BLACK_6, pieces)?.move(29)
            refreshPositionAllowed(pieces)
            getById(PIECE_ID.QUEEN_BLACK, pieces)?.move(31)
            refreshPositionAllowed(pieces)
            const {playerPieces, opponentPieces} = sortByPlayer(PLAYER.BLACK, pieces)
            expect(isCheckmate(opponentPieces, playerPieces)).toBeTruthy()
        })
        describe('false result', () => {
            it("no potential attack" ,() =>{
                const pieces: Array<Piece> = initPieces()
                getById(PIECE_ID.PAWN_WHITE_5, pieces)?.move(36)
                getById(PIECE_ID.PAWN_BLACK_6, pieces)?.move(29)
                refreshPositionAllowed(pieces)
                getById(PIECE_ID.QUEEN_BLACK, pieces)?.move(22)
                refreshPositionAllowed(pieces)
                const {playerPieces, opponentPieces} = sortByPlayer(PLAYER.BLACK, pieces)
                expect(isCheckmate(opponentPieces, playerPieces)).not.toBeTruthy()
            })
            it('potential conterattack', () => {
                const pieces: Array<Piece> = initPieces()
                getById(PIECE_ID.PAWN_WHITE_5, pieces)?.move(36)
                getById(PIECE_ID.PAWN_BLACK_6, pieces)?.move(29)
                getById(PIECE_ID.PAWN_WHITE_8, pieces)?.move(39)
                refreshPositionAllowed(pieces)
                getById(PIECE_ID.QUEEN_BLACK, pieces)?.move(31)
                refreshPositionAllowed(pieces)
                const {playerPieces, opponentPieces} = sortByPlayer(PLAYER.BLACK, pieces)
                expect(isCheckmate(opponentPieces, playerPieces)).not.toBeTruthy()
            })
        })
    })

    /*describe('isEndangersMovement', () => {

        describe('success', () => {
            it('true result', () => {
                const king = new Piece(PIECE_ID.KING_WHITE, PLAYER.WHITE ,TYPE_PIECE.KING)
                const queen =  new Piece(PIECE_ID.QUEEN_WHITE, PLAYER.WHITE ,TYPE_PIECE.QUEEN)
                const pawn_4 = new Piece(PIECE_ID.PAWN_WHITE_4, PLAYER.WHITE, TYPE_PIECE.PAWN)
                const pawn_6 = new Piece(PIECE_ID.PAWN_WHITE_6, PLAYER.WHITE, TYPE_PIECE.PAWN)

                const bischop_2 = new Piece(PIECE_ID.BISHOP_WHITE_2, PLAYER.WHITE, TYPE_PIECE.BISHOP) 

                const attacker = new Piece(PIECE_ID.ROOK_BLACK_1, PLAYER.BLACK, TYPE_PIECE.ROOK)
                movePiece(24, attacker, [], [])
                movePiece(28, attacker, [], [])
                // the king is blocked by the queen and bischop_2
                const isEnDanger = isEndangersMovement(king, [queen, bischop_2, pawn_4, pawn_6, attacker], 20)
                expect(isEnDanger).toBe(true)
            })
            it('false result', () => {
                const king = new Piece(PIECE_ID.KING_WHITE, PLAYER.WHITE ,TYPE_PIECE.KING)
                const queen =  new Piece(PIECE_ID.QUEEN_WHITE, PLAYER.WHITE ,TYPE_PIECE.QUEEN)
                const pawn_4 = new Piece(PIECE_ID.PAWN_WHITE_4, PLAYER.WHITE, TYPE_PIECE.PAWN)
                const pawn_6 = new Piece(PIECE_ID.PAWN_WHITE_6, PLAYER.WHITE, TYPE_PIECE.PAWN)

                const attacker = new Piece(PIECE_ID.ROOK_BLACK_1, PLAYER.BLACK, TYPE_PIECE.ROOK)
                movePiece(24, attacker, [], [])
                movePiece(28, attacker, [], [])
                // king can move to right
                const isEndanger = isEndangersMovement(king, [queen, pawn_4, pawn_6, attacker], 20)
                expect(isEndanger).toBe(false)
            })
        })
        it('failure', () => {
            try {
                const isEnDanger = isEndangersMovement(new Piece(PIECE_ID.PAWN_BLACK_1, PLAYER.BLACK ,TYPE_PIECE.PAWN), [], 20)
                fail()
            } catch(errorProcess){}
        })
    })*/
})
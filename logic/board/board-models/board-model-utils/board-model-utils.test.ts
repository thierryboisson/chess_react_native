import { Piece, PIECE_ID, PLAYER, TYPE_PIECE, DEFAULT_POSITION } from "../../../piece/models"
import { sortByPlayer } from "../../board-utils/board-utils"
import { refreshPositionAllowed, attackPiece, changePlayer } from "./board-model-utils"

describe('board-model-utils', () => {
    it('refreshPositionAllowed', () => {

        // in this case, each piece has to have position allowed 
        let pieces = [
            new Piece(PIECE_ID.BISHOP_BLACK_1, PLAYER.BLACK, TYPE_PIECE.BISHOP ),
            new Piece(PIECE_ID.BISHOP_BLACK_2, PLAYER.BLACK, TYPE_PIECE.BISHOP ),
            new Piece(PIECE_ID.BISHOP_WHITE_1, PLAYER.WHITE, TYPE_PIECE.BISHOP ),
            new Piece(PIECE_ID.BISHOP_WHITE_2, PLAYER.WHITE, TYPE_PIECE.BISHOP ),
        ]
        const piecesSorted = sortByPlayer(PLAYER.BLACK, pieces)
        const positionsPlayerPiece: Array<number> = piecesSorted.playerPiece.map(piece => piece.position)
        const positionsOpponentPiece: Array<number> = piecesSorted.opponentPiece.map(piece => piece.position)
        pieces = refreshPositionAllowed(pieces)
        pieces.forEach(pieceRefresh => {
            expect(pieceRefresh.positionsAllowed.length).not.toBe(0)
        })
    })

    describe('attackPiece', () => {

        
        it('attack', () => {
            let pieces = [
                new Piece(PIECE_ID.BISHOP_BLACK_1, PLAYER.BLACK, TYPE_PIECE.BISHOP ),
                new Piece(PIECE_ID.BISHOP_BLACK_2, PLAYER.BLACK, TYPE_PIECE.BISHOP ),
                new Piece(PIECE_ID.BISHOP_WHITE_1, PLAYER.WHITE, TYPE_PIECE.BISHOP ),
                new Piece(PIECE_ID.BISHOP_WHITE_2, PLAYER.WHITE, TYPE_PIECE.BISHOP ),
            ]

            const piecesSorted = sortByPlayer(PLAYER.BLACK, pieces)
            const attackPosition = DEFAULT_POSITION[PIECE_ID.BISHOP_WHITE_1]
            const pieceAttacked =  new Piece(PIECE_ID.BISHOP_WHITE_1, PLAYER.WHITE, TYPE_PIECE.BISHOP )
            pieces = attackPiece(attackPosition, piecesSorted.opponentPiece,pieces)
            expect(pieces.length).toBe(3)
            expect(pieces.map(piece => piece.id).indexOf(PIECE_ID.BISHOP_WHITE_1)).toBe(-1)
        })

        it('no attack', () => {
            let pieces = [
                new Piece(PIECE_ID.BISHOP_BLACK_1, PLAYER.BLACK, TYPE_PIECE.BISHOP ),
                new Piece(PIECE_ID.BISHOP_BLACK_2, PLAYER.BLACK, TYPE_PIECE.BISHOP ),
                new Piece(PIECE_ID.BISHOP_WHITE_1, PLAYER.WHITE, TYPE_PIECE.BISHOP ),
                new Piece(PIECE_ID.BISHOP_WHITE_2, PLAYER.WHITE, TYPE_PIECE.BISHOP ),
            ]

            const piecesSorted = sortByPlayer(PLAYER.BLACK, pieces)
            const attackPosition = 50
            const pieceAttacked =  new Piece(PIECE_ID.BISHOP_WHITE_1, PLAYER.WHITE, TYPE_PIECE.BISHOP )
            pieces = attackPiece(attackPosition, piecesSorted.opponentPiece,pieces)
            expect(pieces.length).toBe(4)
            expect(pieces.map(piece => piece.id).indexOf(PIECE_ID.BISHOP_WHITE_1)).not.toBe(-1)
        })
    })

    it('changePlayer', () => {
        expect(changePlayer(PLAYER.WHITE)).toBe(PLAYER.BLACK)
    })
})
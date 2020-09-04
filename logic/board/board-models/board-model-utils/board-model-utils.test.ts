import { Piece, PIECE_ID, PLAYER, TYPE_PIECE, DEFAULT_POSITION } from "../../../piece/models"
import { sortByPlayer } from "../../board-utils/board-utils"
import { refreshPositionAllowed, } from "./board-model-utils"

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
        const positionsPlayerPiece: Array<number> = piecesSorted.playerPieces.map(piece => piece.position)
        const positionsOpponentPiece: Array<number> = piecesSorted.opponentPieces.map(piece => piece.position)
        pieces = refreshPositionAllowed(pieces)
        pieces.forEach(pieceRefresh => {
            expect(pieceRefresh.positionsAllowed.length).not.toBe(0)
        })
    })
})
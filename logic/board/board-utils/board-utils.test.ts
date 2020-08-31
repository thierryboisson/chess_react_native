import { sortByPlayer } from "./board-utils"
import { PLAYER, initPieces } from "../../piece/models"

describe('board-utils', () => {
    it('sort by Player', () => {
        const pieces = initPieces()
        const result = sortByPlayer(PLAYER.WHITE, pieces) 
        expect(result.playerPiece.length).toBeTruthy()
        expect(result.opponentPiece.length).toBeTruthy()
        result.playerPiece.forEach(piece => {
            expect(piece.player).toBe(PLAYER.WHITE)
            expect(pieces.indexOf(piece)).not.toBe(-1)
        })
        result.opponentPiece.forEach(piece => {
            expect(piece.player).not.toBe(PLAYER.WHITE)
            expect(pieces.indexOf(piece)).not.toBe(-1)
        })
        expect([...result.playerPiece, ...result.opponentPiece].length).toBe(pieces.length)
    })
})
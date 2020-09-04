import { sortByPlayer } from "./board-utils"
import { PLAYER, initPieces } from "../../piece/models"

describe('board-utils', () => {
    it('sort by Player', () => {
        const pieces = initPieces()
        const result = sortByPlayer(PLAYER.WHITE, pieces) 
        expect(result.playerPieces.length).toBeTruthy()
        expect(result.opponentPieces.length).toBeTruthy()
        result.playerPieces.forEach(piece => {
            expect(piece.player).toBe(PLAYER.WHITE)
            expect(pieces.indexOf(piece)).not.toBe(-1)
        })
        result.opponentPieces.forEach(piece => {
            expect(piece.player).not.toBe(PLAYER.WHITE)
            expect(pieces.indexOf(piece)).not.toBe(-1)
        })
        expect([...result.playerPieces, ...result.opponentPieces].length).toBe(pieces.length)
    })
})
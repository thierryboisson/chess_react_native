export interface MovementRules {
    /**
     * Description method to calculate allowed position of piece
     * 
     * @param positionPiece
     * @param positionsplayerrPiece
     * @param positionOppenentPiece
     * @@returns {[number]} 
     */
    calculate: (position: number, positionsPlayerPiece: Array<number>, positionsOppenentPiece: Array<number>) => Array<number>
}
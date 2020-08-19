const border= [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7, -1,
    -1,  8,  9, 10, 11, 12, 13, 14, 15, -1,
    -1, 16, 17, 18, 19, 20, 21, 22, 23, -1,
    -1, 24, 25, 26, 27, 28, 29, 30, 31, -1,
    -1, 32, 33, 34, 35, 36, 37, 38, 39, -1,
    -1, 40, 41, 42, 43, 44, 45, 46, 47, -1,
    -1, 48, 49, 50, 51, 52, 53, 54, 55, -1,
    -1, 56, 57, 58, 59, 60, 61, 62, 63, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
]

const borderIndex= [
    21, 22, 23, 24, 25, 26, 27, 28,
    31, 32, 33, 34, 35, 36, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48,
    51, 52, 53, 54, 55, 56, 57, 58,
    61, 62, 63, 64, 65, 66, 67, 68,
    71, 72, 73, 74, 75, 76, 77, 78,
    81, 82, 83, 84, 85, 86, 87, 88,
    91, 92, 93, 94, 95, 96, 97, 98
]

/**
 * Descrption - method to return new position with as argument movement an current position
 * @param movement 
 * @param position 
 * @returns {number} 
 */
export const calculateMovement = (movement: number, position: number) => border[borderIndex[position] + movement]


/**
 * Description - method check if piece go outside the board
 * @param position 
 * @param movement 
 * @return {boolean}
 */
export const calculateIsBord = (position: number, movement: number) => border[borderIndex[position] + movement] === -1

/**
 * Description - method check if piece touch other piece 
 * @param position 
 * @param movement 
 * @param positionsOtherPiece 
 * @return {boolean}
 */
export const calculateIsTouchPiece = (position: number, movement: number, positionsOtherPiece: Array<number>) => positionsOtherPiece.indexOf(border[borderIndex[position] + movement], 0) !== -1

/**
 * Description - method to calculate new position by movement, he take into consideration a border of board and position of other piece
 * 
 * @param movements 
 * @param position 
 * @param positionPlayerPiece 
 * @returns {[number]}
 */
export const calculateWithMovement = (movements: Array<number>, position: number, positionPlayerPiece: Array<number>) => {
    const positionAllowed: Array<number> = []
    for (let i = 0; i < movements.length; i++) {
        const movement = movements[i]
        if (!calculateIsBord(position, movement) && !calculateIsTouchPiece(position, movement, positionPlayerPiece)) {
            positionAllowed.push(calculateMovement(movement, position))
        }
    }
    return positionAllowed
}

/**
 * Description - method to calculate new position by direction , he take into consideration a border of board and position of other piece
 * 
 * Example - direction: -10 -> up, direction: 10 -> down, direction: -1 -> left, direction: 1 -> right, direction: 11 -> down-right etc... 
 * @param directions 
 * @param position 
 * @param positionPlayerPiece 
 * @param positionOpponentPiece 
 */
export const calculateWithDirection = (directions: Array<number>, position: number, positionPlayerPiece: Array<number>, positionOpponentPiece: Array<number>) => {
    const positionAllowed: Array<number> = []
    for (let i = 0; i < directions.length; i++) {
        let coef = 1
        let stopCalculation = false
        while (!stopCalculation) {
            const movement = directions[i] * coef
            if (calculateIsBord(position, movement) || calculateIsTouchPiece(position, movement, positionPlayerPiece)) {
                stopCalculation = true
            } else {
                const newPosition = calculateMovement(movement, position)
                positionAllowed.push(newPosition)
                if (calculateIsTouchPiece(position, movement, positionOpponentPiece)) {
                    stopCalculation = true
                }
            }
            coef++
        }

    }
    return positionAllowed
}

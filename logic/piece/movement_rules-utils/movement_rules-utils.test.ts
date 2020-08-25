import { calculateIsBord, calculateIsTouchPiece, calculateWithDirection, calculateWithMovement, calculateMovement } from "./movement_rules-utils"

export const sortPositions= (result: Array<number>) => result.sort((a,b) => a-b)

it('calculateMovement', () => {
    try {
        expect(calculateMovement(-1, 9)).toBe(8)
        expect(calculateMovement(-10, 9)).toBe(1)
        expect(calculateMovement(1, 9)).toBe(10)
        expect(calculateMovement(10, 9)).toBe(17)
    } catch (errorProcess){
        fail(errorProcess)
    }
})

it('calculateIsBord', () => {
    try {

        expect(calculateIsBord(0, +10)).toBe(false)
        expect(calculateIsBord(0, -10)).toBe(true)
        expect(calculateIsBord(0, -1)).toBe(true)
        expect(calculateIsBord(0, +1)).toBe(false)

        expect(calculateIsBord(7, +10)).toBe(false)
        expect(calculateIsBord(7, -10)).toBe(true)
        expect(calculateIsBord(7, -1)).toBe(false)
        expect(calculateIsBord(7, +1)).toBe(true)

        expect(calculateIsBord(56, +10)).toBe(true)
        expect(calculateIsBord(56, -10)).toBe(false)
        expect(calculateIsBord(56, -1)).toBe(true)
        expect(calculateIsBord(56, +1)).toBe(false)

        expect(calculateIsBord(63, +10)).toBe(true)
        expect(calculateIsBord(63, -10)).toBe(false)
        expect(calculateIsBord(63, -1)).toBe(false)
        expect(calculateIsBord(63, +1)).toBe(true)
    } catch(errorProcess){
        fail(errorProcess)
    }
})

it('calculateIsTouchPiece', () => {
    try {
        const positionsOtherPiece: Array<number> = [24,26] 
        expect(calculateIsTouchPiece(25,1,positionsOtherPiece)).toBe(true)
        expect(calculateIsTouchPiece(25,11,positionsOtherPiece)).toBe(false)
        expect(calculateIsTouchPiece(25,10,positionsOtherPiece)).toBe(false)
        expect(calculateIsTouchPiece(25,9,positionsOtherPiece)).toBe(false)
        expect(calculateIsTouchPiece(25,-1,positionsOtherPiece)).toBe(true)
        expect(calculateIsTouchPiece(25,-9,positionsOtherPiece)).toBe(false)
        expect(calculateIsTouchPiece(25,-10,positionsOtherPiece)).toBe(false)
        expect(calculateIsTouchPiece(25,-11,positionsOtherPiece)).toBe(false)
    } catch (errorProcess){
        fail(errorProcess)
    }
})

it('calculateWithPosition', () => {
    try {
        const position=0; 
        const positionsPlayerPiece: Array<number> = [1] 
        const movements = [-1, 1, 10]
        expect(sortPositions(calculateWithMovement(movements, position, positionsPlayerPiece))).toStrictEqual(sortPositions([8]))
    }catch(errorProcess) {
        fail(errorProcess)
    }    
})

it('calculateWithDirection', () => {
    try {
        const position= 35; 
        const positionsPlayerPiece: Array<number> = [38] 
        const positionsOppenentPiece: Array<number> = [43]
        const directions = [-10, 1, 10]
        expect(sortPositions(calculateWithDirection(directions, position, positionsPlayerPiece, positionsOppenentPiece))).toStrictEqual(sortPositions([27,19,11,3, 36,37, 43]))
    }catch(errorProcess) {
        fail(errorProcess)
    }    
})
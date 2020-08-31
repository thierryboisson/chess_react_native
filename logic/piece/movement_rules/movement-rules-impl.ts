import {MovementRules} from "./contract/MovementRules";
import { calculateWithMovement, calculateWithDirection } from "../movement_rules-utils/movement_rules-utils";
import { DEFAULT_POSITION } from "../models";

export const MovementRulesKing: MovementRules = {
    calculate: (position, positionPlayerPiece) => {
        const movementAllowed: Array<number> = [1, 11, 10, 9, -1 ,-9, -10, -11]
        return calculateWithMovement(movementAllowed, position, positionPlayerPiece)
    }
}

export const MovementRulesQueen: MovementRules = {
    calculate: (position, positionPlayerPiece, positionOpponentPiece) => {
        const directionAllowed: Array<number> = [-10,+10,-9,+9,-11,+11,-1,1]
        return calculateWithDirection(directionAllowed, position, positionPlayerPiece, positionOpponentPiece)
    }
}


export const MovementRulesRook: MovementRules = {
    calculate: (position, positionPlayerPiece, positionOpponentPiece) => {
        const directionAllowed: Array<number> = [-10,1,-1, 10]
        return calculateWithDirection(directionAllowed, position, positionPlayerPiece, positionOpponentPiece)
    }
}

export const MovementRulesBishop: MovementRules = {
    calculate: (position, positionPlayerPiece, positionOpponentPiece) => {
        const directionAllowed: Array<number> = [11,-11,9,-9]
        return calculateWithDirection(directionAllowed, position, positionPlayerPiece, positionOpponentPiece)
    }
}

export const MovementRulesKnight: MovementRules = {
    calculate: (position, positionPlayerPiece) => {
        const movementAllowed: Array<number> = [-19, 19, 21,-21, 8,-8, 12,-12]
        return calculateWithMovement(movementAllowed, position, positionPlayerPiece)
    }
}

export const MovementRulesPawnWhite: MovementRules = {
    calculate: (position, positionPlayerPiece, positionOpponentPiece) => {
        const movementAllowedWithoutEnemyPiece: Array<number> = [-10]
        const movementAllowedWithoutEnemyPieceFirstPlay: Array<number> = [-20]
        const movementAllowedWithEnemyPiece: Array<number> = [-9, -11]
        let positionsAllowed: Array<number> = []

        // check if the pawn play first time by check a position
        if(position >= DEFAULT_POSITION.PAWN_WHITE_1 && position <= DEFAULT_POSITION.PAWN_WHITE_8) {
            positionsAllowed = positionsAllowed.concat(calculateWithMovement(movementAllowedWithoutEnemyPieceFirstPlay, position, positionPlayerPiece))
        }

        // get positions in normal situation
        positionsAllowed = positionsAllowed.concat(calculateWithMovement(movementAllowedWithoutEnemyPiece, position, positionPlayerPiece))

        // get positions if enemy context
        const positionsAllowedWithEnemyPiece = calculateWithMovement(movementAllowedWithEnemyPiece, position, positionPlayerPiece)
        positionsAllowed = positionsAllowed.concat(positionsAllowedWithEnemyPiece.filter(position => positionOpponentPiece.indexOf(position) !== -1))
        return positionsAllowed
    }
}

export const MovementRulesPawnBlack: MovementRules = {
    calculate: (position, positionPlayerPiece, positionOpponentPiece) => {
        const movementAllowedWithoutEnemyPiece: Array<number> = [10]
        const movementAllowedWithoutEnemyPieceFirstPlay: Array<number> = [20]
        const movementAllowedWithEnemyPiece: Array<number> = [9, 11]
        let positionsAllowed: Array<number> = []

        // get positions in normal situation
        positionsAllowed = calculateWithMovement(movementAllowedWithoutEnemyPiece, position, positionPlayerPiece)

        // check if the pawn play first time by check a position
        if(position >= DEFAULT_POSITION.PAWN_BLACK_1 && position <= DEFAULT_POSITION.PAWN_BLACK_8) {
            positionsAllowed = positionsAllowed.concat(calculateWithMovement(movementAllowedWithoutEnemyPieceFirstPlay, position, positionPlayerPiece))
        }

        // get positions if enemy context
        const positionsAllowedWithEnemyPiece = calculateWithMovement(movementAllowedWithEnemyPiece, position, positionPlayerPiece)
        positionsAllowed = positionsAllowed.concat(positionsAllowedWithEnemyPiece.filter(position => positionOpponentPiece.indexOf(position) !== -1))

        return positionsAllowed
    }
}



import {MovementRulesKing, MovementRulesQueen, MovementRulesRook, MovementRulesBishop, MovementRulesKnight, MovementRulesPawnWhite, MovementRulesPawnBlack} from './impl'
import { sortPositions } from '../movement_rules-utils/movement_rules-utils.test'



describe('movement_rules', () => {
    describe('MovementRules implementation', () => {
        it('king movement rules', () => {
            expect(sortPositions(MovementRulesKing.calculate(26, [],[]))).toStrictEqual(sortPositions([17,18,19,25,27,33,34,35]))
            expect(sortPositions(MovementRulesKing.calculate(26, [33,34,35],[]))).toStrictEqual(sortPositions([17,18,19,25,27]))
            expect(sortPositions(MovementRulesKing.calculate(32, [25,33],[]))).toStrictEqual(sortPositions([24,40,41]))

        })

        it("queen movement rules", () => {
            // test without other piece
            expect(sortPositions(MovementRulesQueen.calculate(35, [], [])))
                .toStrictEqual(sortPositions([27,19,11,3,28,21,14,7,36,37,38,39,44,53,62,43,51,59,42,49,56,34,33,32,26,17,8]))

            // test with piece oppenent and player piece 
            expect(sortPositions(MovementRulesQueen.calculate(35, [28,44], [19])))
                .toStrictEqual(sortPositions([27,19, 36,37,38,39,43,51,59,42,49,56,34,33,32,26,17,8]))
        })
        it('rook movememt rules', () => {
            expect(sortPositions(MovementRulesRook.calculate(35, [], [])))
                .toStrictEqual(sortPositions([27,19,11,3,36,37,38,39,43,51,59,34,33,32]))
            
            expect(sortPositions(MovementRulesRook.calculate(35, [19], [36])))
                .toStrictEqual(sortPositions([27,36,43,51,59,34,33,32]))
            
        })

        it("bishop movement rules", () => {
            // test without other piece
            expect(sortPositions(MovementRulesBishop.calculate(35, [], [])))
                .toStrictEqual(sortPositions([28,21,14,7,44,53,62,42,49,56,26,17,8]))

            // test with piece oppenent and player piece 
            expect(sortPositions(MovementRulesBishop.calculate(35, [28], [53])))
                .toStrictEqual(sortPositions([44,53,42,49,56,26,17,8]))
        })

        it('rook movememt rules', () => {
            // test without other piece
            expect(sortPositions(MovementRulesKnight.calculate(35, [], [])))
                .toStrictEqual(sortPositions([25, 18, 20, 29, 45, 52, 50, 41]))

            // test with player piece     
            expect(sortPositions(MovementRulesKnight.calculate(35, [29, 50], [])))
                .toStrictEqual(sortPositions([25, 18, 20, 45, 52, 41]))
        })

        it('white pawn movement rules', () => {

            // test without other piece in first time
            expect(sortPositions(MovementRulesPawnWhite.calculate(49, [], [])))
                .toStrictEqual(sortPositions([41, 33]))
            
            // test without other piece
            expect(sortPositions(MovementRulesPawnWhite.calculate(41, [], [])))
                .toStrictEqual(sortPositions([33]))

            // test with piece oppenent and player piece 
            expect(sortPositions(MovementRulesPawnWhite.calculate(41, [33], [32, 34])))
                .toStrictEqual(sortPositions([32,34]))


        }) 

        it('black pawn movement rules', () => {

            // test without other piece in first time
            expect(sortPositions(MovementRulesPawnBlack.calculate(9, [], [])))
                .toStrictEqual(sortPositions([17, 25]))
            
            // test without other piece
            expect(sortPositions(MovementRulesPawnBlack.calculate(17, [], [])))
                .toStrictEqual(sortPositions([25]))

            // test with piece oppenent and player piece 
            expect(sortPositions(MovementRulesPawnBlack.calculate(17, [25], [24, 26])))
                .toStrictEqual(sortPositions([24,26]))
        }) 


    })
})
import { PIECE_ID, PLAYER, TYPE_PIECE, DEFAULT_POSITION, MOVEMENT_RULES } from "./Types";
import { MovementRules } from "../movement_rules/contract/MovementRules";

class Piece{
    id: PIECE_ID;
    player: PLAYER;
    type: TYPE_PIECE;
    hasBeenPlayerOneTime: boolean;
    position: number;
    positionsAllowed: Array<number>;
    movementRules: MovementRules;
    //additionnalCalculation?: () => Array<number>

    /**
     * Description - Piece Object
     * @param id 
     * @param player 
     * @param type 
     */
    constructor( 
        id: PIECE_ID,
        player: PLAYER,
        type: TYPE_PIECE,
    ){
        this.id = id
        this.player = player
        this.type = type
        this.position = parseInt(DEFAULT_POSITION[id])
        this.hasBeenPlayerOneTime = false,
        this.movementRules = MOVEMENT_RULES(player)[type]
        this.positionsAllowed = []
    }

    move(position: number){
        if(this.positionsAllowed.indexOf(position) !== -1){
            if(!this.hasBeenPlayerOneTime) {
                this.hasBeenPlayerOneTime = true
            }
            this.position = position

        } else {
            console.error("this position is not allowed")
        }
    }

    promote(type: TYPE_PIECE){
        if(this.type === TYPE_PIECE.PAWN){
            this.type = type
            this.movementRules = MOVEMENT_RULES(this.player)[type]
        } else {
            console.error("the piece type have to be a pawn to promote")
        }
    }
    calculatePositionAllowed(positionsPlayerPiece: Array<number>, positionsOppenentPiece: Array<number>){
        this.positionsAllowed = this.movementRules.calculate(this.position, positionsPlayerPiece, positionsOppenentPiece)
    }
    // add postionAllowed in special context (roque or passingCatch)
    addPositionAllowed(positionsAllowed: Array<number>){
        const newPositionAllowed: Array<number> = []
        positionsAllowed.forEach(position => {
            if(this.positionsAllowed.indexOf(position) !== 1){
                newPositionAllowed.push(position)
            }
        })
        this.positionsAllowed = this.positionsAllowed.concat(newPositionAllowed)
    }
}

export default Piece

import { initPieces, Piece, PLAYER, PIECE_ID, TYPE_PIECE } from "../../piece/models"
import { movePiece, getById, fetchPiece, getByPosition } from "../../piece/models/models-utils/utils-models";
import { sortByPlayer } from "../board-utils/board-utils";
import { isCheckmate } from "../board_rules/board_rules";
import { attackPiece, refreshPositionAllowed, changePlayer } from "./board-model-utils/board-model-utils";

/**
 * Description - Board model to manage chess game
 */
class Board {
    pieces: Array<Piece>;
    player: PLAYER;
    pieceSelected: Piece|null;
    winner: PLAYER|null;


    constructor(){
        this.pieces = initPieces()
        this.player = PLAYER.WHITE
        this.pieceSelected = null
        this.winner = null

    }

    /**
     * Description - method to move Piece
     * @param newPosition 
     */
    movePiece(newPosition: number){
        if(this.pieceSelected === null){
            throw new Error("the piece is not selected")
        }
        const piecesSorted = sortByPlayer(this.player, this.pieces)
        const positionsPlayerPiece = piecesSorted.playerPiece.map(piecePlayer => piecePlayer.position)
        const positionsOpponentPiece =  piecesSorted.opponentPiece.map(pieceOpponent => pieceOpponent.position)

        // movePiece
        movePiece(
            newPosition, 
            this.pieceSelected, 
            positionsPlayerPiece,
            positionsOpponentPiece
        )
        
        // attack piece if there are in new postion
        this.pieces = attackPiece(newPosition, piecesSorted.opponentPiece, this.pieces)

        // refresh postionAllowed with a new position
        this.pieces = refreshPositionAllowed(this.pieces)
        
        // check if it's checkmate
        const potentialKingCheckMate = fetchPiece("type", TYPE_PIECE.KING, piecesSorted.opponentPiece)[0]
        if(isCheckmate(
            potentialKingCheckMate.position,
            potentialKingCheckMate.positionsAllowed,
            sortByPlayer(this.player, this.pieces).playerPiece.map(piece => piece.positionsAllowed).reduce((acc, currentValue) => acc.concat(currentValue))
        )){
            this.win()
        }

        this.pieceSelected = null
        this.player = changePlayer(this.player)
    }

    

    /**
     * Description - method to select piece
     * @param pieceId 
     */
    selectPiece(pieceId: PIECE_ID){
        this.pieceSelected = getById(pieceId, this.pieces)
        if(this.pieceSelected?.player !== this.player){
            throw new Error('the piece does not belong to the current player')
        }
    }
    
    /**
     * Description - method when current player win
     */
    win(){
        this.winner = this.player
    }
}

export default Board
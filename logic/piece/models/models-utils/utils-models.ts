import { PIECE_ID, PLAYER, TYPE_PIECE, Piece } from "..";
import { sortByPlayer } from "../../../board/board-utils/board-utils";
import { refreshPositionAllowed } from "../../../board/board-models/board-model-utils/board-model-utils";

/**
 * Description - method to fetch Piece in list by key and value
 * @param key 
 * @param value 
 * @param listPiece 
 */
export const fetchPiece = (key: "player"|"type", value: PLAYER|TYPE_PIECE, listPiece: Array<Piece>):Array<Piece> => listPiece.filter(piece => piece[key] === value) 

/**
 * Description - method to get piece by id
 * @param id 
 * @param pieces 
 */
export const getById = (id: PIECE_ID, pieces: Array<Piece>):Piece|null => {
    let result: Piece|null = null
    for(let i = 0; i < pieces.length; i++){
        if(pieces[i].id === id){
            result = pieces[i]
            break;
        }
    }
    return result
}

/**
 * Description - method to getByPosition 
 * @param position 
 * @param pieces 
 */
export const getByPosition = (position: number, pieces: Array<Piece>):Piece|null => {
    let result: Piece|null = null
    for(let i = 0;i < pieces.length; i++){
        if(pieces[i].position === position){
            result = pieces[i]
            break;
        }
    }
    return result
}

/**
 * Description - method to fetch piece by position list
 * @param id 
 * @param pieces 
 */
export const fetchByPositions = (listPosition: Array<number>, pieces: Array<Piece>):Array<Piece>|null => {
    const pieceResult: Array<Piece> = [] 
    pieces.forEach(piece => {
        if(listPosition.indexOf(piece.position) !== -1){
           pieceResult.push(piece)
        }
    })
    return pieceResult.length ? pieceResult : null
}


/**
 * Description method to init all pieces with default value
 */
export const initPieces = () => {
    const pieces: Array<Piece> = []
    for(let pieceId in PIECE_ID){
        const element: Array<string> = pieceId.split('_')
        const type = TYPE_PIECE[element[0]]
        const player = PLAYER[element[1]]
        const id = PIECE_ID[pieceId]
        pieces.push(new Piece(id, player, type))
    }

    return refreshPositionAllowed(pieces)
}

/**
 * Description - method to move piece
 * @param newPosition 
 * @param piece 
 * @param positionsPlayerPiece 
 * @param positionOpponentPiece 
 */
export const movePiece = (newPosition: number, piece: Piece, positionsPlayerPiece: Array<number>, positionOpponentPiece: Array<number>) => {

    if(!piece.positionsAllowed.length){
        piece.calculatePositionAllowed(positionsPlayerPiece, positionOpponentPiece)
    }
    piece.move(newPosition)
    piece.calculatePositionAllowed(positionsPlayerPiece, positionOpponentPiece)
}
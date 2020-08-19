import { PIECE_ID, PLAYER, TYPE_PIECE, Piece } from ".";

/**
 * Description - method to fetch Piece in list by key and value
 * @param key 
 * @param value 
 * @param listPiece 
 */
export const fetchPiece = (key: "id"|"player"|"type"|"position", value: PIECE_ID|PLAYER|TYPE_PIECE|number, listPiece: Array<Piece>):Array<Piece> => listPiece.filter(piece => piece[key] === value) 
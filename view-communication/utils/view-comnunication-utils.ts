import {VIEW_POSITION, VIEW_PIECE_ID, BOARD_PIECE_ID } from "../models/view-commincation-models"

const viewPositions: Array<string>= [
    "a8",  "b8",  "c8",  "d8",  "e8",  "f8",  "g8",  "h8",
    "a7",  "b7",  "c7",  "d7",  "e7",  "f7",  "g7",  "h7",
    "a6",  "b6",  "c6",  "d6",  "e6",  "f6",  "g6",  "h6",
    "a5",  "b5",  "c5",  "d5",  "e5",  "f5",  "g5",  "h5",
    "a4",  "b4",  "c4",  "d4",  "e4",  "f4",  "g4",  "h4",
    "a3",  "b3",  "c3",  "d3",  "e3",  "f3",  "g3",  "h3",
    "a2",  "b2",  "c2",  "d2",  "e2",  "f2",  "g2",  "h2",
    "a1",  "b1",  "c1",  "d1",  "e1",  "f1",  "g1",  "h1"
]

/**
 * Description - method to convert view position to board position
 * @param viewPosition 
 */
export const viewPositionToBoardPosition = (viewPosition: VIEW_POSITION): number => {

    return viewPositions.indexOf(viewPosition)
}

/**
 * Description - method to convert board position to view position 
 */
export const boardPositionToViewPosition = (boardPosition: number): VIEW_POSITION => {
    return VIEW_POSITION[viewPositions[boardPosition]]
}

/**
 * Description - method to convert view piece id format to board  piece id format
 * @param viewPieceId 
 */
export const viewPieceIdToBoardPieceId = (viewPieceId: VIEW_PIECE_ID): BOARD_PIECE_ID => {
    return BOARD_PIECE_ID[viewPieceId]
}

/**
 * Description - method to convert board piece id format to view piece id format
 * @param boardPieceId 
 */
export const boardPieceIdToViewPieceId = (boardPieceId: BOARD_PIECE_ID): VIEW_PIECE_ID => {
    return VIEW_PIECE_ID[boardPieceId]
}
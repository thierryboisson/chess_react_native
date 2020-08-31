import { BOARD_PIECE_ID } from "../../models/view-commincation-models";
import { PLAYER } from "../../../logic/piece/models";

export enum EMITTER_ACTION {
    MOVE_PIECE="MOVE_PIECE",
    SELECT_PIECE="SELECT_PIECE",
    WIN="WIN"
}

export interface MovePieceArgument {
    pieceId: BOARD_PIECE_ID,
    position: number
}

export type SelectPieceArgument = Array<number>

export type WinArgument = PLAYER
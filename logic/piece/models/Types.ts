import { MovementRules } from "../movement_rules/contract/MovementRules";
import { MovementRulesPawnWhite, MovementRulesKing, MovementRulesQueen, MovementRulesRook, MovementRulesBishop, MovementRulesPawnBlack, MovementRulesKnight } from "../movement_rules/movement-rules-impl";

/**
 * Description Type of Piece
 */
export enum TYPE_PIECE {
    PAWN="PAWN",
    KING="KING",
    QUEEN="QUEEN",
    ROOK="ROOK",
    BISHOP="BISHOP",
    KNIGHT="KNIGHT"
}

export const MOVEMENT_RULES = (player:PLAYER):{[key: string]: MovementRules} => ({
    PAWN: player === PLAYER.WHITE ? MovementRulesPawnWhite : MovementRulesPawnBlack,
    KING: MovementRulesKing,
    QUEEN: MovementRulesQueen,
    ROOK: MovementRulesRook,
    BISHOP: MovementRulesBishop,
    KNIGHT: MovementRulesKnight
})

export enum PLAYER {
    WHITE="WHITE",
    BLACK="BLACK"
}

export enum PIECE_ID {
    PAWN_WHITE_1="PAWN_WHITE_1",
    PAWN_WHITE_2="PAWN_WHITE_2",
    PAWN_WHITE_3="PAWN_WHITE_3",
    PAWN_WHITE_4="PAWN_WHITE_4",
    PAWN_WHITE_5="PAWN_WHITE_5",
    PAWN_WHITE_6="PAWN_WHITE_6",
    PAWN_WHITE_7="PAWN_WHITE_7",
    PAWN_WHITE_8="PAWN_WHITE_8",
    BISHOP_WHITE_1="BISHOP_WHITE_1",
    BISHOP_WHITE_2="BISHOP_WHITE_2",
    ROOK_WHITE_1="ROOK_WHITE_1",
    ROOK_WHITE_2="ROOK_WHITE_2",
    KNIGHT_WHITE_1="KNIGHT_WHITE_1",
    KNIGHT_WHITE_2="KNIGHT_WHITE_2",
    KING_WHITE="KING_WHITE",
    QUEEN_WHITE="QUEEN_WHITE",
    PAWN_BLACK_1="PAWN_BLACK_1",
    PAWN_BLACK_2="PAWN_BLACK_2",
    PAWN_BLACK_3="PAWN_BLACK_3",
    PAWN_BLACK_4="PAWN_BLACK_4",
    PAWN_BLACK_5="PAWN_BLACK_5",
    PAWN_BLACK_6="PAWN_BLACK_6",
    PAWN_BLACK_7="PAWN_BLACK_7",
    PAWN_BLACK_8="PAWN_BLACK_8",
    BISHOP_BLACK_1="BISHOP_BLACK_1",
    BISHOP_BLACK_2="BISHOP_BLACK_2",
    ROOK_BLACK_1="ROOK_BLACK_1",
    ROOK_BLACK_2="ROOK_BLACK_2",
    KNIGHT_BLACK_1="KNIGHT_BLACK_1",
    KNIGHT_BLACK_2="KNIGHT_BLACK_2",
    KING_BLACK="KING_BLACK",
    QUEEN_BLACK="QUEEN_BLACK"
}

export enum DEFAULT_POSITION {
    PAWN_WHITE_1=48,
    PAWN_WHITE_2=49,
    PAWN_WHITE_3=50,
    PAWN_WHITE_4=51,
    PAWN_WHITE_5=52,
    PAWN_WHITE_6=53,
    PAWN_WHITE_7=54,
    PAWN_WHITE_8=55,
    BISHOP_WHITE_1=58,
    BISHOP_WHITE_2=61,
    ROOK_WHITE_1=56,
    ROOK_WHITE_2=63,
    KNIGHT_WHITE_1=57,
    KNIGHT_WHITE_2=62,
    KING_WHITE=59,
    QUEEN_WHITE=60,
    PAWN_BLACK_1=8,
    PAWN_BLACK_2=9,
    PAWN_BLACK_3=10,
    PAWN_BLACK_4=11,
    PAWN_BLACK_5=12,
    PAWN_BLACK_6=13,
    PAWN_BLACK_7=14,
    PAWN_BLACK_8=15,
    BISHOP_BLACK_1=2,
    BISHOP_BLACK_2=5,
    ROOK_BLACK_1=0,
    ROOK_BLACK_2=7,
    KNIGHT_BLACK_1=1,
    KNIGHT_BLACK_2=6,
    KING_BLACK=3,
    QUEEN_BLACK=4
}
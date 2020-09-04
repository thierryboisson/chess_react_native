export class ListenerError extends Error {
    constructor(message){
        super(message)
        this.name = "ListenerError"
    }
} 

export class BoardRulesError extends Error {
    constructor(message){
        super(message)
        this.name = "BoardRulesError"
    }
} 

export class PieceRulesError extends Error {
    constructor(message){
        super(message)
        this.name = "PieceRulesError"
    }
}
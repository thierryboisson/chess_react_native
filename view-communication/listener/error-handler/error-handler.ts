import ChessEmitter from "../../emitter/emitter-model/emitter-model";
import { EMITTER_ACTION } from "../../emitter/emitter-types/emitter-types";

export interface ErrorMessage {
    title: string,
    message: string
}

export function handleError(error: Error, emitter: ChessEmitter) {
    console.error(error)
    emitter.emit(EMITTER_ACTION.ERROR, {error: `Problem from server: ${error}`})
}
/**
 * Description - method to create pieces element in the dom
 * @param {[{id:string, position:string}]} pieces 
 * @param {string} currentPlayer
 */
function initPieces(pieces){
    const board = document.getElementById('board')

    // create pieces
    for(let i = 0; i<pieces.length;i++){
        const {id, position} = pieces[i]
        const pieceElement = document.createElement("div")
        pieceElement.classList.add(pieceIdToPieceCssClass(id))
        pieceElement.classList.add("piece")
        const {left, top} = viewPositionToCssPosition(position)
        pieceElement.id = id
        pieceElement.style.left = left
        pieceElement.style.top = top
        pieceElement.onclick = () => onSelect(id)
        board.insertBefore(pieceElement, board.firstChild)
    }
}

function erasePositionAllowedElement() {
    const zoneElements = document.querySelectorAll("div.position-allowed")
    if(zoneElements.length){
        zoneElements.forEach(zoneElement => {
            board.removeChild(zoneElement)
        })
    }
}

/**
 * Description - method to create allowed position in the dom
 * @param {[string]} allowedPositions 
 */
function selectPiece(allowedPositions){
    erasePositionAllowedElement()
    const board = document.getElementById('board')
    for(let i = 0; i<allowedPositions.length;i++){
        const zoneElement = document.createElement("div")
        zoneElement.classList.add("position-allowed")
        const {left, top} = viewPositionToCssPosition(allowedPositions[i])
        zoneElement.style.left = left
        zoneElement.style.top = top
        zoneElement.onclick = () => onMove(allowedPositions[i])
        board.insertBefore(zoneElement, board.firstChild)
        
    }
}
/**
 * Description - method to remove piece killed element
 * @param {string} id 
 */
function killPiece(id){
    const killPieceElement = document.getElementById(id)
    const bord = document.getElementById("board")
    bord.removeChild(killPieceElement)
}

/**
 * Description - method to modify piece position in the dom
 * @param {{id:string, position:string}} param0 
 */
function movePiece({id, position}){
    // remove position allowed element
    erasePositionAllowedElement()
    //move piece
    const pieceElement = document.getElementById(id)
    const {left, top} = viewPositionToCssPosition(position)
    pieceElement.style.left = left
    pieceElement.style.top = top
}

function win(winner){
    const board = document.getElementById("board")
    const winMessage = document.createElement("div")
    winMessage.classList.add("message-panel")
    winMessage.append(`the player ${winner} has winned`)
    board.appendChild(winMessage)
}
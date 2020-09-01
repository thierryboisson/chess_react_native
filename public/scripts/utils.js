const CASE_SIZE = 40

//left to right
const leftPositions = ["a","b","c","d","e","f","g","h"]

//top to bottm
const topPositions = ["8","7","6","5","4","3","2","1"]

function viewPositionToCssPosition(newPosition){
    const axePositions = newPosition.split('')
    return {
        left: (leftPositions.indexOf(axePositions[0]) + 1) * CASE_SIZE - CASE_SIZE,
        top: (topPositions.indexOf(axePositions[1]) + 1) * CASE_SIZE - CASE_SIZE
    }
}

function pieceIdToPieceCssClass(pieceId){
    const classNames = pieceId.split('-')
    return `${classNames[0]}-${classNames[1]}`
}



const board = document.getElementById("board")
console.log('board:', board)

const FillArray = (count) => {
    for (let i = 0; i < count; i++) {
        userfieldNumbers.push(i)
    }
}


const fillBingoField = (numOfFields) => {
    for (let i = 1; i <= numOfFields; i++) {
        let field = document.createElement("div")
        let span = document.createElement("span")

        field.appendChild(span).innerText = i
        field.classList.add("field")
        field.classList.add("covered")
        board.appendChild(field)
            //availableNumber.push(i)

    }
}

fillBingoField(81)
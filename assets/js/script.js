const board = document.getElementById("board")
const container = document.querySelector(".container")

let numOfMines = 10
let mines = Array(numOfMines)

let availableBoardIndices = []
let colPerRow = 9,
    RowPerBoard = 9

let numOfFields = colPerRow * RowPerBoard


const FillArray = () => {
    for (let i = 0; i < numOfFields; i++) {
        availableBoardIndices.push(i)
    }
}
FillArray()





// Create the board
const fillMinesweeperBoard = () => {
    for (let i = 0; i < RowPerBoard; i++) {
        let row = document.createElement("div")
        row.classList.add("row")
        for (let j = 0; j < colPerRow; j++) {
            let col = document.createElement("div")
            col.classList.add("col")
            col.addEventListener("click", (event) => {
                console.log(event.currentTarget.parentElement)
            })
            let span = document.createElement("span")
            span.innerText = `rInd ${j} cInd ${i}`
            span.classList.add("field")
            span.classList.add("covered")
            col.appendChild(span)
            row.appendChild(col)
        }
        container.appendChild(row)
    }
}

fillMinesweeperBoard()


// Adding mines to the field and make sure they are distinct from one another
const avoidRepetition = () => {
    let stillAvailable = true
    let pos = false
    let randomNum = 0
    do {
        randomNum = Math.floor(Math.random() * numOfFields + 1)
        pos = availableBoardIndices
            .includes(randomNum)
        if (pos === true) {
            availableBoardIndices
                .splice(availableBoardIndices
                    .indexOf(randomNum), 1)
            stillAvailable = false
        }
    } while (stillAvailable);
    return randomNum
}

const addMines = () => {
    const fields = document.getElementsByClassName("field covered")

    for (let i = 0; i < numOfMines; i++) {
        let index = avoidRepetition()
        fields[index].innerText = "M"
        fields[index].classList.add("mine")
        mines[i] = index
    }
}

addMines()

const getNeighbors = (index) => {
    let lsRInd = 0
    let rsRind = colPerRow - 1
    let tsCind = 0
    let bsCind = RowPerBoard - 1
    let rows = container.children
    let col = rows[0].children[0]
    console.log('col00:', col)

}
getNeighbors(0)

window.onload = () => {



}
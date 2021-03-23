const board = document.getElementById("board")
const container = document.querySelector(".container-fluid")

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
    for (let rI = 0; rI < RowPerBoard; rI++) {
        let row = document.createElement("div")
        row.classList.add("row")
        for (let cI = 0; cI < colPerRow; cI++) {
            let col = document.createElement("div")
            col.classList.add("col", "col-sm", "col-md", "col-lg", "col-xl", "m-2")
            col.id = `${rI}${cI}`
            col.addEventListener("click", (event) => {
                //getNeighbors(event.currentTarget.id)
            })
            let div = document.createElement("div")
            div.innerText = "" //`rInd ${rI} cInd ${cI}`
            div.classList.add("field", "covered", "p-2")
            col.appendChild(div)
            row.appendChild(col)
        }
        container.appendChild(row)
    }
}
fillMinesweeperBoard()


// Adding mines to the field and make sure they are distinct from one another.
// Calculating the field values for the direct neighbors of a mine.
const calcSumOfNumberfields = (id) => {
    id = id.split("")
    rI = parseInt(id[0])
    cI = parseInt(id[1])

    neighbors = [
        `${rI- 1}${cI - 1}`, //topleft
        `${rI- 1}${cI}`, //top
        `${rI- 1}${cI + 1}`, //topright
        `${rI}${cI -1}`, //left
        `${rI}${cI + 1}`, //right
        `${rI+ 1}${cI - 1}`, //bottomleft
        `${rI+ 1}${cI}`, //bottom
        `${rI+ 1}${cI + 1}`, //bottomright
    ]

    for (const neighbor of neighbors) {
        let currentEle = document.getElementById(neighbor)
        let div = ""
        if (currentEle !== null && currentEle.firstChild.classList.contains("mine") === false) {
            div = currentEle.firstChild
            if (div.innerText === "") {
                div.innerText = "1"
            } else {
                div.innerText = parseInt(div.innerText) + 1
            }
        }
    }
}

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
        let index = avoidRepetition() //create random mine
        fields[index].innerText = "M"
        fields[index].classList.add("mine") //marked as a mine

        //Increment the neighbor's field values by one. 
        calcSumOfNumberfields(fields[index].parentElement.id)
            //Id's of the col is saved in the mines array
        mines[i] = fields[index].parentElement.id
            //console.log('mines:', mines)
    }
}

addMines()




window.onload = () => {



}
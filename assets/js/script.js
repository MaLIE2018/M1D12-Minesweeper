const board = document.getElementById("board")
const container = document.querySelector("#board-container")

let numOfMines = 10
let mines = Array(numOfMines)

let availableBoardIndices = []

let colPerRow = 9,
    RowPerBoard = 9



let numOfFields = colPerRow * RowPerBoard
console.log('numOfFields:', numOfFields)


const FillArray = () => {
    for (let i = 0; i < numOfFields; i++) {
        availableBoardIndices.push(i)
    }

}
FillArray()


// Gameover
const gameOver = () => {
    alert("You losed - new game will be started")
    availableBoardIndices.length = 0
    location.reload()

}


//Winning Case
const catchedMines = () => {
    let flags = document.querySelectorAll("#flag")
    let count = 0
    for (const item of flags) {
        if (item.parentElement.classList.contains("mine") === true) {
            count++
        }
    }
    if (count === numOfMines) {
        alert("You Won - New game?")
        availableBoardIndices.length = 0
        location.reload()
    }
}

const uncoverFields = (id) => {
    id = id.split("")
    let indr = parseInt(id[0])
    let indc = parseInt(id[1])


    neighbors = [
        `${indr- 1}${indc - 1}`, //topleft
        `${indr- 1}${indc}`, //top
        `${indr- 1}${indc + 1}`, //topindrght
        `${indr}${indc -1}`, //left
        `${indr}${indc + 1}`, //indrght
        `${indr+ 1}${indc - 1}`, //bottomleft
        `${indr+ 1}${indc}`, //bottom
        `${indr+ 1}${indc + 1}`, //bottomindrght
    ]

    for (const neigh of neighbors) {
        let currentEle = document.getElementById(neigh)
        if (currentEle !== null && currentEle.classList.contains("mine") === false) {
            let mine = currentEle.classList.contains("mine")
            let num = currentEle.classList.contains("num")
            if (num) {
                currentEle.classList.remove("covered")
                currentEle.classList.add("uncovered")
                currentEle.firstChild.classList.remove("covered")
                currentEle.firstChild.classList.add("uncovered")
            } else if (!num && !mine && currentEle.classList.contains("uncovered") == false) {
                currentEle.classList.remove("covered")
                currentEle.firstChild.classList.remove("covered")
                currentEle.firstChild.classList.add("uncovered")
                currentEle.classList.add("uncovered")
                uncoverFields(currentEle.id)
            }
        }
    }
}

//Which fields should be uncovered

// Create the board
const fillMinesweeperBoard = () => {
    for (let indr = 0; indr < RowPerBoard; indr++) {
        let row = document.createElement("div")
        row.classList.add("row")
        for (let indc = 0; indc < colPerRow; indc++) {
            let col = document.createElement("div")
            col.classList.add("col", "m-2", "p-0", "col-sm", "col-md", "col-lg", "col-xl", "covered") //
            col.id = `${indr}${indc}`
            col.addEventListener("click", (event) => {
                let mine = event.currentTarget.classList.contains("mine")
                let num = event.currentTarget.classList.contains("num")
                let covered = event.currentTarget.classList.contains("covered")
                let flagged = event.currentTarget.classList.contains("flagged")


                if (flagged) {
                    event.currentTarget.querySelector("#flag").remove()
                    event.currentTarget.classList.remove("flagged")
                    event.currentTarget.classList.remove("#flag")
                    countFlags()
                } else {
                    if (mine) {
                        gameOver()
                    }
                    if (num && covered) {
                        event.currentTarget.classList.add("uncovered")
                        event.currentTarget.firstChild.classList.remove("covered")
                        event.currentTarget.firstChild.classList.add("uncovered")
                    } else if (num && !covered) {
                        //lucky shot
                    }
                    if (!num && !mine) {
                        event.currentTarget.classList.add("covered")
                        event.currentTarget.classList.add("uncovered")
                        uncoverFields(event.currentTarget.id)
                    }
                }


            })
            let div = document.createElement("div")
            div.innerText = "" //`indrnd ${indr} indcnd ${indc}`
            div.classList.add("field", "covered")
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
    indr = parseInt(id[0])
    indc = parseInt(id[1])

    neighbors = [
        `${indr- 1}${indc - 1}`, //topleft
        `${indr- 1}${indc}`, //top
        `${indr- 1}${indc + 1}`, //topindrght
        `${indr}${indc -1}`, //left
        `${indr}${indc + 1}`, //indrght
        `${indr+ 1}${indc - 1}`, //bottomleft
        `${indr+ 1}${indc}`, //bottom
        `${indr+ 1}${indc + 1}`, //bottomindrght
    ]

    for (const neighbor of neighbors) {
        let currentEle = document.getElementById(neighbor)
        let div = ""
        if (currentEle !== null && currentEle.classList.contains("mine") === false) {
            div = currentEle.firstChild
            if (div.innerText === "") {
                div.innerText = "1"
            } else {
                div.innerText = parseInt(div.innerText) + 1
            }
            currentEle.classList.add("num")
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
        fields[index].parentElement.classList.add("mine") //marked as a mine

        //Increment the neighbor's field values by one. 
        calcSumOfNumberfields(fields[index].parentElement.id)
            //Id's of the col is saved in the mines array
        mines[i] = fields[index].parentElement.id
    }
}

addMines()

const setAFlag = (event) => {
    let fields = event.path
    let flag = `<svg xmlns="http://www.w3.org/2000/svg" id="flag" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
  </svg>`
    for (const item of fields) {
        if (item.classList.contains("col") === true) {
            item.classList.add("flagged")
            item.innerHTML += flag
            countFlags()
            catchedMines()
        }
    }
}

//set a flag 
window.oncontextmenu = function(event) {
    setAFlag(event);
    return false; // cancel default menu
}

const countFlags = () => {
    let resultFlag = document.getElementById("setFlags")
    let result = numOfMines - parseInt(document.querySelectorAll("#flag").length)
    resultFlag.innerText = result
}
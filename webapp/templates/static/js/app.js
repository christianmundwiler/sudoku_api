const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
let submission = []

// loop over puzzleboard
for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    // set data attributes for cells
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', '1')
    inputElement.setAttribute('max', '9')
    // set background for puzzleboard design
    if ( 
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        inputElement.classList.add('odd-section')
    }
    // add each cell to puzzleboard object
    puzzleBoard.appendChild(inputElement)
}

// function to create array based on user input
const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })
    console.log(submission)
}

// function to populate board after response from api
const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    // if puzzle solvable, populate board with data from api
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
        solutionDisplay.innerHTML = 'This is the answer'
    } else {
        solutionDisplay.innerHTML = 'This is not solvable'
    }
}

const solve = () => {
    joinValues()
    const data = {puzzle: submission.join('')}
    console.log('data1', data)

    // send user data to server
    fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    })  .then(response => response.json())
        // get data back from server
        .then(data => {
            console.log('data2', data)
            // send data to populate board, if solvable
            populateValues(data.solvable, data.solution)
            submission = []
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

solveButton.addEventListener('click', solve)
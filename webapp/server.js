const PORT = 8080
// library to make HTTP requests
const axios = require('axios').default
// framework used for routing
const express = require('express')
// package for cors errors
const cors = require('cors')
// enable sharing of data from .env file
require('dotenv').config()
const app = express()
app.use(cors())
// enable correct parsing of json
app.use(express.json())

// make post request
app.post('/solve', (req,res) => {
    // set options
    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
        },
        data: {
            // user input puzzle data
            puzzle: req.body.numbers
        }
    }
    // make request to RapidAPI via axios
    axios.request(options).then((response) => {
        console.log('data3', response.data)
        res.json(response.data)
        }).catch((error) => {
        console.error(error)
    })
})

// listen, port 8080
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))
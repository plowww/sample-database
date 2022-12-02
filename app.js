/**
 * The main place to setup serving files, what requests do what, and determining routing
 */
const db = require('./database/db.js')
const express = require('express')
const bodyParser = require('body-parser')
const student = require('./routes/studentRoute.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = parseInt(process.env.PORT) || 3000

app.use(express.static('public'))
app.use('/about', express.static('public/about.html'))

// Student route
app.use('/student', student)

// For invalid endpoints
app.get('*', (req, res) => {
  res.status(500).send('Error 500: Invalid endpoint for request (check URL)')
})

// Start server on given port as well as db connection
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
  db.connect(db.MODE_PRODUCTION, (state) => {
    console.log(`Connected to database in mode: ${JSON.stringify(state.mode)}`)
  })
})

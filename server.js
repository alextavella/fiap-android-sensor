const express = require('express')
const cors = require('cors')
const router = express.Router()
const app = express()

const board = require('./src/board')

app.use(cors())
app.get('/status', (req, res) => res.send('OK'))
app.listen(3000, () => console.log('Listening http://localhost:3000'))
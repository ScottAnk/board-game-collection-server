const db = require('./config/db')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const PORT = 8000

mongoose.set('strictQuery', true)
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

requestLogger = require('./lib/request-logger')
const app = express()
app.use(express.json())
app.use(cors('http://127.0.0.1:55'))
app.use(requestLogger)

const boardGameRoutes = require('./routes/boardGameRoutes')
const userRoutes = require('./routes/userRoutes')
app.use('/boardGames/', boardGameRoutes)
app.use(userRoutes)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

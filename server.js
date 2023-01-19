const db = require('./config/db')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const PORT = 8000

const app = express()
app.use(express.json())
app.use(cors('http://127.0.0.1:55'))

mongoose.set('strictQuery', true)
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const indexRoutes = require('./routes/indexRoutes')
app.use(indexRoutes)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

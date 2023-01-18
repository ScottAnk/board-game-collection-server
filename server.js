const db = require('./config/db')
const mongoose = require('mongoose')
const express = require('express')

const PORT = 8000

const app = express()
app.use(express.json)
//just putting this in here for later
//app.use(cors)

const indexRoutes = require('./routes/indexRoutes')
app.use(indexRoutes)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

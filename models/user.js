const mongoose = require('mongoose')
const boardGameSchema = require('./boardgame')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  boardGames: [{
    type: boardGameSchema,
    default: []
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
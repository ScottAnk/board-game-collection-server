const mongoose = require('mongoose')

const boardGameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  minPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  }
})

const BoardGame = mongoose.model('BoardGame', boardGameSchema)

module.exports = BoardGame
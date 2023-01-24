const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "BoardGame"
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
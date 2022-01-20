const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: String,
  totalGames: Number,
  totalWins: Number,
  handCounts: {
    ROCK: Number,
    PAPER: Number,
    SCISSORS: Number,
  },
  games: [
    {
      type: mongoose.Schema.Types.String,
      ref: 'Game'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.name = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  _id: String,
  t: Number,
  playerA: {
    name: String,
    played: String
  },
  playerB: {
    name: String,
    played: String
  },
  winner: String,
})

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.gameId = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game


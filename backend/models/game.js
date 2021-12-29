const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  _id: String,
  date: Date,
  playerA: {
    player: {
      type: mongoose.Schema.Types.String,
      ref: 'User'
    },
    played: String
  },
  playerB: {
    player: {
      type: mongoose.Schema.Types.String,
      ref: 'User'
    },
    played: String
  }
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


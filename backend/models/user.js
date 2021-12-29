const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: String,
  games: [
    {
      type: mongoose.Schema.Types.String,
      ref: 'Game'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.userId = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
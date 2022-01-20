const mongoose = require('mongoose')

const cursorSchema = mongoose.Schema({
  _id: String,
})

cursorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

const Cursor = mongoose.model('Cursor', cursorSchema)

module.exports = Cursor
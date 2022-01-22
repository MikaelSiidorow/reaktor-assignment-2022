const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const logger = require('./utils/logger')
require('console-stamp')( console, 'HH:MM:ss.l' );
const middleware = require('./utils/middleware')
const gamesRouter = require('./controllers/games')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

const { getAll } = require('./utils/history')

const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')

    logger.info('fetching data from external api')
    getAll()
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/games', gamesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
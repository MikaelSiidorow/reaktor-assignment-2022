const gamesRouter = require('express').Router()
const Game = require('../models/game')

gamesRouter.get('/:time', async (request, response) => {
  if (isNaN(request.params.time)) {
    response.status(400).send({ error: 'invalid date' })
  }
  
  const t = parseInt(request.params.time) * 1000
  const games = await Game
    .find({ date: { $gte: new Date(t-600000) } })

  response.json(games)
})

gamesRouter.get('/', async (request, response) => {
  const games = await Game.find({}).limit(20)

  response.json(games)
})

module.exports = gamesRouter
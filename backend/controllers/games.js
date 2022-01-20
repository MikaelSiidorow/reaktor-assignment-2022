const gamesRouter = require('express').Router()
const Game = require('../models/game')

//route to get games within 10 mins of a given certain time
gamesRouter.get('/:time', async (request, response) => {
  if (isNaN(request.params.time)) {
    response.status(400).send({ error: 'invalid date' })
  }
  
  const t = parseInt(request.params.time) * 1000
  const games = await Game
    .find({ t: { $gte: t-100000 } })

  response.json(games)
})

//route to get first 20 games
gamesRouter.get('/', async (request, response) => {
  const games = await Game.find({}).limit(20)

  response.json(games)
})

module.exports = gamesRouter
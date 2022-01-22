const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}, { _id: 1 })

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id, { games: 0 })

  response.json(user)
})

usersRouter.get('/:id/games', async (request, response) => {

  const page = parseInt(request.query.page)
  const totalGames = (await User.findById(request.params.id)).games.length
  const pages = Math.ceil(totalGames / 20) - 1
  const firstPageCount = totalGames % 20 === 0 ? 20 : totalGames % 20

  if (!page) {
    const games = (await User
      .findById(request.params.id, { games: { $slice: firstPageCount } })
      .populate('games')).games

    response.json({
      nextPage: 1,
      games
    })
  } else if (page < pages) {
    const games = (await User
      .findById(request.params.id, { games: { $slice: [(page - 1) * 20 + firstPageCount, 20] } })
      .populate('games')).games

    response.json({
      nextPage: page + 1,
      games
    })
  }
  else if (page === pages) {
    const games = (await User
      .findById(request.params.id, { games: { $slice: [(page - 1) * 20 + firstPageCount, 20] } })
      .populate('games')).games

    response.json({
      nextPage: null,
      games
    })
  }
  else {
    response.json({
      nextPage: null,
      games: []
    })
  }
})

module.exports = usersRouter
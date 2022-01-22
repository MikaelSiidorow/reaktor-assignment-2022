const usersRouter = require('express').Router()
const User = require('../models/user')

// get all user names
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}, { _id: 1 })

  response.json(users)
})

// get all user data not including list of games from user
usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id, { games: 0 })

  response.json(user)
})

// get games some games from user
usersRouter.get('/:id/games', async (request, response) => {

  const page = parseInt(request.query.page)
  const totalGames = (await User.findById(request.params.id)).games.length
  const pages = Math.ceil(totalGames / 20) - 1
  const firstPageCount = totalGames % 20 === 0 ? 20 : totalGames % 20

  // page is 0 or not defined, return first page
  // first page has the remainder of games if total games is not divisible by 20
  if (!page) {
    const games = (await User
      .findById(request.params.id, { games: { $slice: firstPageCount } })
      .populate('games')).games

    response.json({
      nextPage: 1,
      games
    })
  }
  // return 20 games and next page
  else if (page < pages) {
    const games = (await User
      .findById(request.params.id, { games: { $slice: [(page - 1) * 20 + firstPageCount, 20] } })
      .populate('games')).games

    response.json({
      nextPage: page + 1,
      games
    })
  }
  // page is final page, don't return then page number
  else if (page === pages) {
    const games = (await User
      .findById(request.params.id, { games: { $slice: [(page - 1) * 20 + firstPageCount, 20] } })
      .populate('games')).games

    response.json({
      nextPage: null,
      games
    })
  }
  // page doesn't exist
  else {
    response.json({
      nextPage: null,
      games: []
    })
  }
})

module.exports = usersRouter
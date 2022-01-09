const axios = require('axios')
const User = require('../models/user')
const Game = require('../models/game')
const logger = require('./logger')
const { totalWins, mostPlayed, handCounts } = require('./utils')

const baseUrl = 'https://bad-api-assignment.reaktor.com'

const saveToDb = async (data) => {
  try {
    const game = new Game({
      _id: data.gameId,
      date: new Date(data.t),
      playerA: {
        player: data.playerA.name,
        played: data.playerA.played
      },
      playerB: {
        player: data.playerB.name,
        played: data.playerB.played
      }
    })
    await Promise.all([
      User.findByIdAndUpdate(
        { _id: data.playerA.name },
        {
          $addToSet: {
            games: data.gameId
          }
        },
        { new: true, upsert: true }),
      User.findByIdAndUpdate(
        { _id: data.playerB.name },
        {
          $addToSet: {
            games: data.gameId
          }
        },
        { new: true, upsert: true }),
      game.save()
    ])
  } catch (error) {
    if (error.name == 'MongoServerError' && error.message.includes('duplicate key error')) {
      //logger.info('already saved')
    }
    else {
      logger.error(error)
    }
  }
}

///rps/history?cursor=0PZ6xsyxvdxh
const getAll = async (cursor = '/rps/history') => {
  try {
    logger.info('getting url:', baseUrl + cursor)
    const response = await axios.get(baseUrl + cursor)
    if (response.data.data.cursor === null || response.data.data.length < 1) {
      logger.info('done fetching data from external api')
    }
    for (const game of response.data.data) {
      await saveToDb(game)
    }
    getAll(response.data.cursor)
  } catch (error) {
    logger.error(error)
  }
}

const updateUser = async (userId) => {
  try {
    const userFromDb = await User
      .findById(userId)
      .populate('games')
    const userNoGames = await User
      .findById(userId)

    userNoGames.totalGames = userFromDb.toJSON().games.length
    userNoGames.totalWins = totalWins(userFromDb.toJSON())
    userNoGames.mostPlayed = mostPlayed(userFromDb.toJSON())
    userNoGames.handCounts = handCounts(userFromDb.toJSON())

    console.log(await userNoGames.save())
  } catch (error) {
    logger.error(error)
  }
}

const sortGames = async (userId) => {
  try {
    User
      .findById(userId)
      .populate('games')
      .exec( async (err, docs) => {
        docs.games.sort((a, b) => {
          let c = 0
          if (a.date > b.date) {
            c = -1
          } else if (a.date < b.date) {
            c = 1
          }
          return c
        })
        await docs.save()
      })
  } catch (error) {
    logger.error(error)
  }
}

const updateUserData = async () => {
  try {
    /*
    const users = await User.find({})
    console.log(users.map( user => ({
      ...user.toJSON(),
      games: undefined
    })))
    */

    usersByName = await User.find({}).distinct('_id')
    for (const user of usersByName) {
      sortGames(user)

    }
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { getAll, updateUserData }
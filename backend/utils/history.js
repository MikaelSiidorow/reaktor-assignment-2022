const axios = require('axios')
const logger = require('./logger')
const { determineWinner } = require('./utils')
const User = require('../models/user')
const Game = require('../models/game')
const Cursor = require('../models/cursor')

const baseUrl = 'https://bad-api-assignment.reaktor.com'

const saveNewUser = async (ab, game) => {
  if (ab === 'a') {
    // first time seeing this user
    // create new user with data
    const newUser = new User({
      _id: game.playerA.name,
      totalGames: 1,
      totalWins: game.winner === game.playerA.name ? 1 : 0,
      handCounts: {
        ROCK: game.playerA.played === 'ROCK' ? 1 : 0,
        PAPER: game.playerA.played === 'PAPER' ? 1 : 0,
        SCISSORS: game.playerA.played === 'SCISSORS' ? 1 : 0
      },
      games: [
        game._id
      ]
    })
    //save user
    await newUser.save()
  }
  if (ab === 'b') {
    // first time seeing this user
    // create new user with data
    const newUser = new User({
      _id: game.playerB.name,
      totalGames: 1,
      totalWins: game.winner === game.playerB.name ? 1 : 0,
      handCounts: {
        ROCK: game.playerB.played === 'ROCK' ? 1 : 0,
        PAPER: game.playerB.played === 'PAPER' ? 1 : 0,
        SCISSORS: game.playerB.played === 'SCISSORS' ? 1 : 0
      },
      games: [
        game._id
      ]
    })
    //save user
    await newUser.save()
  }
}

const updateExistingUser = async (ab, user, game) => {
  if (ab === 'a') {
    //player found in db
    user.totalGames = user.totalGames + 1
    user.totalWins = game.winner === game.playerA.name ? user.totalWins + 1 : user.totalWins
    user.handCounts = {
      ROCK: game.playerA.played === 'ROCK' ? user.handCounts.ROCK + 1 : user.handCounts.ROCK,
      PAPER: game.playerA.played === 'PAPER' ? user.handCounts.PAPER + 1 : user.handCounts.PAPER,
      SCISSORS: game.playerA.played === 'SCISSORS' ? user.handCounts.SCISSORS + 1 : user.handCounts.SCISSORS
    }
    user.games = [
      game._id, ...user.games
    ]
    //update user data
    await user.save()
  }
  if (ab === 'b') {
    //player found in db
    user.totalGames = user.totalGames + 1
    user.totalWins = game.winner === game.playerB.name ? user.totalWins + 1 : user.totalWins
    user.handCounts = {
      ROCK: game.playerB.played === 'ROCK' ? user.handCounts.ROCK + 1 : user.handCounts.ROCK,
      PAPER: game.playerB.played === 'PAPER' ? user.handCounts.PAPER + 1 : user.handCounts.PAPER,
      SCISSORS: game.playerB.played === 'SCISSORS' ? user.handCounts.SCISSORS + 1 : user.handCounts.SCISSORS
    }
    user.games = [
      game._id, ...user.games
    ]
    //update user data
    await user.save()
  }
}

const sortGames = async () => {
  try {
    //sort games collection by time

    await Game
      .find({})
      .sort({ 't': 1 })

    //get all userIds
    const userIds = await User.find({}, { _id: 1 })

    //sort all games for each user
    for (const userId of userIds) {
      User
        .findById(userId)
        .populate('games')
        .exec(async (err, docs) => {
          docs.games.sort((a, b) => {
            let c = 0
            if (a.t > b.t) {
              c = -1
            } else if (a.t < b.t) {
              c = 1
            }
            return c
          })
          await docs.save()
        })
    }
  } catch (err) {
    logger.error(err)
  }
}

const saveData = async (data, index, total) => {
  //all logic breaks (AKA data differs from API) if there's an issue in between saving game and users but not like that would ever happen...
  try {
    //skip games already stored
    if (await Game.findById(data.gameId)) {
      console.log('already saved', index, 'of', total)
    }
    //save game and update users based on the result
    else {
      //create new game based on data
      const game = new Game({
        _id: data.gameId,
        ...data,
        winner: determineWinner(data),
      })
      //save game
      await game.save()

      //try to find users already stored in db with same name
      const getA = await User.findById(game.playerA.name)
      const getB = await User.findById(game.playerB.name)

      //rare case where player plays against themselves -> only update player once
      if (getA && getB && getA._id === getB._id) {
        // player found in db
        await updateExistingUser('a', getA, game)
      }
      else if (game.playerA.name === game.playerB.name) {
        // first time seeing this user
        // create new user with data
        await saveNewUser('a', game)
      }
      // two different players as expected
      else {
        if (getA) {
          // user found in db
          await updateExistingUser('a', getA, game)
        } else {
          // first time seeing this user
          // create new user with data
          await saveNewUser('a', game)
        }
        if (getB) {
          // user found in db
          await updateExistingUser('b', getB, game)
        } else {
          // first time seeing this user
          // create new user with data
          await saveNewUser('b', game)
        }
      }
    }
  } catch (err) {
    console.error('Error:', err, 'With input data:', data)
  }
}

const getAll = async (cursor = '/rps/history') => {
  try {
    const response = await axios.get(baseUrl + cursor)
    const total = response.data.data.length
    logger.info('getting url:', cursor, 'with', total, 'entries')
    // on last page sort games in database and restart API traversal from start
    if (response.data.data.cursor === null || total < 1) {
      logger.info('reached the end of the api, sorting games by time and restarting')
      await sortGames()
      getAll()
    }
    // always scan first page
    if (cursor === '/rps/history') {
      for (let [index, game] of response.data.data.entries()) {
        await saveData(game, index, total)
      }
    }
    // if cursor is found already scanned page is skipped
    else if (cursor !== '/rps/history' && !(await Cursor.findById(cursor))) {
      //const cursorToSave = new Cursor({ _id: cursor })
      for (let [index, game] of response.data.data.entries()) {
        await saveData(game, index, total)
      }
      // save cursor to db after fully scanning the page
      //try {await cursorToSave.save()} catch (err) { logger.error(err) }
    } else {
      console.log('already fetched page data: skipping...')
    }
    // scan next cursor
    getAll(response.data.cursor)
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { getAll }
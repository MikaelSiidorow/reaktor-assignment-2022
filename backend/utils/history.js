const axios = require('axios')
const logger = require('./logger')
const { determineWinner } = require('./utils')
const User = require('../models/user')
const Game = require('../models/game')
const Cursor = require('../models/cursor')

const baseUrl = 'https://bad-api-assignment.reaktor.com'

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
  //all logic breaks if there's an issue in between saving game and users but not like that would ever happen...
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

      //rare case where player plays against themselves
      //only update player once
      if (getA && getB && getA._id === getB._id) {
        //player found in db
        getA.totalGames = getA.totalGames + 1
        getA.totalWins = game.winner === game.playerA.name ? getA.totalWins + 1 : getA.totalWins
        getA.handCounts = {
          ROCK: game.playerA.played === 'ROCK' ? getA.handCounts.ROCK + 1 : getA.handCounts.ROCK,
          PAPER: game.playerA.played === 'PAPER' ? getA.handCounts.PAPER + 1 : getA.handCounts.PAPER,
          SCISSORS: game.playerA.played === 'SCISSORS' ? getA.handCounts.SCISSORS + 1 : getA.handCounts.SCISSORS
        }
        getA.games = [
          game._id, ...getA.games
        ]
        //update user data
        await getA.save()
      } else if (game.playerA.name === game.playerB.name) {
        // first time seeing this user
        //create new user with data
        const a = new User({
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
        await a.save()
      } else {
        if (getA) {
          //user found in db
          getA.totalGames = getA.totalGames + 1
          getA.totalWins = game.winner === game.playerA.name ? getA.totalWins + 1 : getA.totalWins
          getA.handCounts = {
            ROCK: game.playerA.played === 'ROCK' ? getA.handCounts.ROCK + 1 : getA.handCounts.ROCK,
            PAPER: game.playerA.played === 'PAPER' ? getA.handCounts.PAPER + 1 : getA.handCounts.PAPER,
            SCISSORS: game.playerA.played === 'SCISSORS' ? getA.handCounts.SCISSORS + 1 : getA.handCounts.SCISSORS
          }
          getA.games = [
            game._id, ...getA.games
          ]
          //update user data
          await getA.save()
        } else {
          // first time seeing this user
          //create new user with data
          const a = new User({
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
          await a.save()
        }
        if (getB) {
          //user found in db
          getB.totalGames = getB.totalGames + 1
          getB.totalWins = game.winner === game.playerB.name ? getB.totalWins + 1 : getB.totalWins
          getB.handCounts = {
            ROCK: game.playerB.played === 'ROCK' ? getB.handCounts.ROCK + 1 : getB.handCounts.ROCK,
            PAPER: game.playerB.played === 'PAPER' ? getB.handCounts.PAPER + 1 : getB.handCounts.PAPER,
            SCISSORS: game.playerB.played === 'SCISSORS' ? getB.handCounts.SCISSORS + 1 : getB.handCounts.SCISSORS
          }
          getB.games = [
            game._id, ...getB.games
          ]
          //update user data
          await getB.save()
        } else {
          // first time seeing this user
          // create new user with data
          const b = new User({
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
          await b.save()
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
      const cursorToSave = new Cursor({ _id: cursor })
      for (let [index, game] of response.data.data.entries()) {
        await saveData(game, index, total)
      }
      // save cursor to db after fully scanning the page
      try {await cursorToSave.save()} catch (err) { logger.error(err) }
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
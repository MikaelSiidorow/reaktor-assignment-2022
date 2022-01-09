const _ = require('lodash')

const mostPlayed = (user) => {

  const mostPlayedArray = _
    .chain(user.games)
    .map(game =>
      game.playerA.player === user.userId ? game.playerA.played : game.playerB.played)
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value()

  return mostPlayedArray[0]
}

const handCounts = (user) => {
  const handCounts = _
  .chain(user.games)
  .map(game =>
    game.playerA.player === user.userId ? game.playerA.played : game.playerB.played)
  .countBy()
  .value()

  return handCounts
}

const winner = (a, b) => {
  if (a.played === b.played) {
    return null
  }
  else if (a.played === 'PAPER' && b.played === 'ROCK') {
    return a
  }
  else if (a.played === 'ROCK' && b.played === 'SCISSORS') {
    return a
  }
  else if (a.played === 'SCISSORS' && b.played === 'PAPER') {
    return a
  }
  else {
    return null
  }
}

const totalWins = (user) =>
  _
    .chain(user.games)
    .map(game => ({
      'a': game.playerA.player === user.userId ? game.playerA : game.playerB,
      'b': game.playerB.player === user.userId ? game.playerA : game.playerB
    }))
    .map(game => winner(game.a, game.b))
    .compact()
    .size()
    .value()

module.exports = {
  totalWins,
  mostPlayed,
  handCounts
}
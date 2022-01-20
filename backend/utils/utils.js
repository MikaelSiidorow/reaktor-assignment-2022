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

const determineWinner = ({ playerA, playerB }) => {
  if (playerA.played === playerB.played) {
    return undefined
  }
  else if (playerA.played === 'PAPER' && playerB.played === 'ROCK') {
    return playerA.name
  }
  else if (playerA.played === 'ROCK' && playerB.played === 'SCISSORS') {
    return playerA.name
  }
  else if (playerA.played === 'SCISSORS' && playerB.played === 'PAPER') {
    return playerA.name
  }
  else {
    return playerB.name
  }
}

module.exports = {
  mostPlayed,
  determineWinner
}
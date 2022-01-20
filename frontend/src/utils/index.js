import { formatDistance } from 'date-fns'

export const dateParser = (t) => {
  return formatDistance(new Date(t), new Date()) + ' ago'
}

export const winner = ({ playerA, playerB }) => {
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
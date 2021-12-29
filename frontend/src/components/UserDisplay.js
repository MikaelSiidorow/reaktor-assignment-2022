import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "../services/users"
import FinishedGame from "./FinishedGame"
import _ from 'lodash'

const UserDisplay = () => {
  const [user, setUser] = useState(null)
  const userId = useParams().user

  useEffect(() => {
    userService.getUser(userId).then(user =>
      setUser(user))
  }, [userId])

  if (!user) {
    return (
      <div className='user'>
        <h2>{userId}</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const totalGames = user.games.length

  const mostPlayed = _
    .chain(user.games)
    .map(game =>
      game.playerA.player === userId ? game.playerA.played : game.playerB.played)
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value()

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
  
  const totalWins = _
    .chain(user.games)
    .map( game => ({
      'a': game.playerA.player === userId ? game.playerA : game.playerB,
      'b': game.playerB.player === userId ? game.playerA : game.playerB
    }))
    .map( game => winner(game.a, game.b))
    .compact()
    .size()
    .value()


  return (
    <div className='user'>
      <h2>{userId}</h2>
      <div className='aggregate'>
        <h2>Stats</h2>
        <table>
          <tbody>
            <tr>
              <th>Win Ratio</th>
              <th>Matches Played</th>
              <th>Most Played Hand</th>
            </tr>
            <tr>
              <td>{(totalWins/totalGames*100).toFixed(2)}%</td>
              <td>{totalGames}</td>
              <td>{mostPlayed[0]} {(mostPlayed[1]/totalGames * 100).toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='matchHistory'>
        <h2>Match History</h2>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Player A</th>
              <th>played</th>
              <th>vs</th>
              <th>played</th>
              <th>Player B</th>
            </tr>
            {user.games.map(game =>
              <FinishedGame key={game.gameId} game={game} />
            )}
          </tbody>
        </table>

      </div>
    </div>
  )

}

export default UserDisplay
import React, { useEffect, useState } from "react"
import userService from "../../services/users"
import FinishedGame from './FinishedGame'

const UserMatchHistory = ({ id }) => {
  const [games, setGames] = useState([])
  const [nextGames, setNextGames] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (!page) {
    userService.getGames(id, page).then(data => {
      setGames(data.games)
    })
    userService.getGames(id, page + 1).then(data => {
      setNextGames(data.games)
    })
    } else {
      setGames(nextGames)
      userService.getGames(id, page + 1).then(data => {
        setNextGames(data.games)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, id])

  if (!games || games.length === 0) {
    return (
      <div className='matchHistory'>
        <h2>Match History</h2>
        <p>Loading...</p>
      </div>
    )
  }

  return (
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
            {games.map(game =>
              <FinishedGame key={game.gameId} game={game}/> 
            )}
          </tbody>
        </table>
        <div>
          <button onClick={() => setPage(page - 1)}>Previous</button>
          Page: {page + 1}
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
  )
}

export default UserMatchHistory
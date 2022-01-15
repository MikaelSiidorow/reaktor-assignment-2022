import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"
import userService from "../../services/users"
import Game from '../components/Game'

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

      {games.map(game =>
        <Game key={game.gameId} game={game} />
      )}
      <Pagination>
        {page !== 0 ? <Pagination.Prev onClick={() => setPage(page - 1)}/> : null}
        <Pagination.Item active>{page + 1}</Pagination.Item>
        <Pagination.Next onClick={() => setPage(page + 1)}/>
      </Pagination>
    </div>
  )
}

export default UserMatchHistory
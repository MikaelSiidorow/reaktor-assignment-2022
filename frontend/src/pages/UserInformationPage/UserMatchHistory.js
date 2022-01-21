import React, { useEffect, useState } from "react"
import userService from "../../services/users"
import Game from '../components/Game'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserGames } from '../../reducers/userReducer'
import HistoryPagination from './HistoryPagination'

const UserMatchHistory = ({ name }) => {
  const games = useSelector(state => state.users).find(u => u.name === name).games
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const GAMES_PER_PAGE = 20

  //get all games by the user and add them to the store
  useEffect(() => {
    const getGames = async (page = 0) => {
      try {
        const response = await userService.getGames(name, page)
        if (response.games.length > 0) {
          dispatch(updateUserGames(name, response.games))
          if (response.nextPage !== null) {
            getGames(response.nextPage)
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
    getGames()
  }, [name, dispatch])

  if (!games || games.length === 0) {
    return (
      <div className='matchHistory'>
        <h2>Match History</h2>
        <p>Loading...</p>
      </div>
    )
  }

  //page games
  const pagedGames = Array(Math.ceil(games.length / GAMES_PER_PAGE))
    .fill()
    .map((_, index) => index * GAMES_PER_PAGE)
    .map(begin => games.slice(begin, begin + GAMES_PER_PAGE))

  const PAGE_COUNT = pagedGames.length

  return (
    <div className='matchHistory'>
      <h2>Match History</h2>
      {pagedGames[page].map(game =>
        <Game key={game.gameId} game={game} />
      )}
      <HistoryPagination current={page} total={PAGE_COUNT} setPage={setPage}/>
    </div>
  )
}

export default UserMatchHistory
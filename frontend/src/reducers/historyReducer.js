import gameService from "../services/games"
import { winner } from '../utils'

const historyReducer = (state = [], action) => {
  switch (action.type) {
    case 'GAME_RESULT': {
      const game = {
        ...action.data,
        winner: winner(action.data)
      }
      return [game, ...state].sort((a, b) => b.t - a.t).slice(0, 20)
    }
    case 'INIT_HISTORY':
      return action.data.sort((a, b) => b.t - a.t).slice(0, 20)
    default: return state
  }
}

export const initializeGames = () => {
  return async dispatch => {
    const games = await gameService.getRecentByTime(Math.floor(Date.now() / 1000))
    dispatch({
      type: 'INIT_HISTORY',
      data: games
    })
  }
}

export default historyReducer
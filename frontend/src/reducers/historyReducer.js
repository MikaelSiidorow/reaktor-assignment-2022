import gameService from "../services/games"

const historyReducer = (state = [], action) => {
  switch (action.type) {
    case 'GAME_RESULT':
      return [action.data, ...state]
    case 'INIT_HISTORY':
      return action.data
    default: return state
  }
}

export const initializeGames = () => {
  return async dispatch => {
    //time Math.floor(Date.now()/1000)
    const games = await gameService.getRecent()
    dispatch({
      type: 'INIT_HISTORY',
      data: games
    })
  }
}

export default historyReducer
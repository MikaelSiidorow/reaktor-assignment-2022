const liveReducer = (state = [], action) => {
  switch (action.type) {
    case 'GAME_BEGIN':
      return [...state, action.data]
    case 'GAME_RESULT':
      return state.filter(game =>
        game.gameId !== action.data.gameId
      )
    default: return state
  }
}

export default liveReducer
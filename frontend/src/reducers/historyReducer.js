const historyReducer = (state = [], action) => {
  switch (action.type) {
    case 'GAME_RESULT':
      return [action.data, ...state]
    case 'INIT_HISTORY':
      return action.data
    default: return state
  }
}



export default historyReducer
const historyReducer = (state = [], action) => {
  switch (action.type) {
    case 'GAME_RESULT':
      return [action.data, ...state]
    default: return state
  }
}

export default historyReducer
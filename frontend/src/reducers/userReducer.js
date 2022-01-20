import userService from "../services/users"

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.sort((a, b) => a.name.localeCompare(b.name))
    case 'UPDATE_USER':
      return state.map(user => user.name === action.data.name ? action.data : user)
    case 'UPDATE_USER_GAMES':
      return state.map(user => user.name === action.data.name ?
        {
          ...user,
          games: user.games ? [...user.games, ...action.data.games].sort( (a, b) => b.t - a.t) : action.data.games.sort( (a, b) => b.t - a.t)
        }
        : user)
    default: return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const updateUserData = (name) => {
  return async dispatch => {
    const user = await userService.getUser(name)
    dispatch({
      type: 'UPDATE_USER',
      data: user
    })
  }
}

export const updateUserGames = (name, games) => {
  return {
    type: 'UPDATE_USER_GAMES',
    data: {
      name,
      games
    }
  }
}

export default userReducer
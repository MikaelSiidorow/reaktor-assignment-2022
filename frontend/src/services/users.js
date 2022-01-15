import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUser = (user) => {
  const request = axios.get(`${baseUrl}/${user}`)
  return request.then(response => response.data)
}

const getGames = (user, page) => {
  const request = axios.get(`${baseUrl}/${user}/games/?page=${page}`)
  return request.then(response => response.data)
}

const userService = {
  getAll,
  getUser,
  getGames
}

export default userService
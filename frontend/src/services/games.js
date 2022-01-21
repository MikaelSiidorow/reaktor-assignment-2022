import axios from 'axios'

const baseUrl = '/api/games'

const getRecentByTime = (time) => {
  const request = axios.get(`${baseUrl}/${time}`)
  return request.then(response => response.data)
}

const getRecent = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const gameService = {
  getRecentByTime,
  getRecent
}

export default gameService
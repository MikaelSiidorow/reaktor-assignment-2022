import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/games'

const getRecent = (time) => {
  const request = axios.get(`${baseUrl}/${time}`)
  return request.then(response => response.data)
}

const gameService = {
  getRecent
}

export default gameService
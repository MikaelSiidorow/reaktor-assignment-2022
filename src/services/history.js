import axios from 'axios'

const baseUrl = 'https://bad-api-assignment.reaktor.com'

const sleep = (delay) => {
  return new Promise( (resolve) => {
    setTimeout(resolve, delay);
  });
}

axios.interceptors.response.use(async (response) => {
  await sleep(50)
  return response;
}, (error) => {
  console.error(error)
  return Promise.reject(error);
});

const getAll = (cursor = '/rps/history', data = []) => {
  return axios.get(baseUrl + cursor)
    .then(response => {
        console.log('getting url: ', baseUrl + cursor)
        if (response.data.data.length < 1 || response.data.data.cursor === null) return data
        console.log('response', response)
        data.push(...response.data.data)
        console.log('current data length', data.length)
        return getAll(response.data.cursor, data)
    })
}

const historyRouter = {
  getAll
}

export default historyRouter
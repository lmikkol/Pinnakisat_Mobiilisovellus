import axios from "axios";
const baseUrl = '/api/contests'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
  }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createContest = async newObject => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log('POSTSSS')
  return response.data
  //   const request = axios.post(baseUrl, newObject)
  // return request.then(response => response.data)
}

const deleteContest = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateContest = (id, newObject) => {
    console.log(request.body)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default { getAll, createContest, deleteContest, updateContest, setToken}
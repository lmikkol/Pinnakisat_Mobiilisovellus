import axios from "axios";
const baseUrl = '/api/contests'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createContest = newObject => {
    const request = axios.post(baseUrl, newObject)
  console.log('POSTSSS')
  return request.then(response => response.data)
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

export default { getAll, createContest, deleteContest, updateContest}
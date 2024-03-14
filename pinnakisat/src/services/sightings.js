import axios from "axios";
const baseUrl = '/api/sightings'



let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
  }


const getSightings = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createSighting = async (newObject) => {
    const config = {
      headers: { Authorization: token},
    }


    const response = await axios.post(baseUrl, newObject)
    return response.data
  }


export default { getSightings, createSighting, setToken }
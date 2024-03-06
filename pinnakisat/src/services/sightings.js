import axios from "axios";
const baseUrl = '/api/contests'

const getSightings = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addSighting = (newObject) => {
    
}

export default { getSightings }
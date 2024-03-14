import axios from "axios"
const baseUrl = '/api/users'

const createUser = async registerCredentials => {

  const response = await axios.post(baseUrl, registerCredentials)
  console.log('User created', registerCredentials)
  return response.data
}

const addContest = async (contestId, userId) => {
  axios.put(`${baseUrl}/joincontest/${contestId}/${userId}`, {})
    .then(response => {
      if (response.status === 200) {
        console.log('User added to contest successfully')
        return response.data
      } else {
        console.log('Failed to add user to contest');
      }
    })
    .catch(error => {
      console.error('Error adding user to contest:', error);
      console.log('An error occurred while adding user to contest');
    });
};

// const addSighting = async (userId) => {
//   axios.put(`${baseUrl}/addsighting/${userId}}`, {})
//   .then(response => {
//     if (response.status === 200) {
//       console.log('User sighting added succesfully')
//       return response.data
//     } else {
//       console.log('Failed to add sighting to user');
//     }
//   })
//   .catch(error => {
//     console.error('Error adding sighting to user:', error);
//     console.log('An error occurred while adding user sighting');
//   })
// }

// Function to remove a user from a contest.
// Sends a PUT request to the backend API to update the user's contest participation.
const removeContest = async (contestId, userId) => {
  axios.put(`${baseUrl}/leavecontest/${contestId}/${userId}`, {})
    .then(response => {
      if (response.status === 200) {
        console.log('User removed from contest successfully')
        return response.data
      } else {
        console.log('Failed to remove user from contest')
      }
    })
    .catch(error => {
      console.error('Error removing user from contest:', error);
      console.log('An error occurred while removing user from contest');
    });
}

const getUserContest = async (contestId) => {
  console.log('User contests:', contestId)

  const request = axios.get(`${baseUrl}/findusers/${contestId}`, {})
  return request.then(response => response.data)
}

const getAllUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createUserSighting = async (userId, newObject) => {
  console.log(newObject, "UID createSight")
const response = await axios.put(`${baseUrl}/addsighting/${userId}`, newObject)
  return response.data
}

const getUserSightings = async (userId) => {
  const request = axios.get(`${baseUrl}/findusersightings/${userId}`, {})
  return request.then(response => response.data)
}

export default { getUserContest, createUser, addContest, removeContest, getAllUsers, createUserSighting, getUserSightings }
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

  export default {createUser, addContest}
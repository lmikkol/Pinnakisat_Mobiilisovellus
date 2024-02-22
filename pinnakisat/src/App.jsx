import { useState, useEffect } from 'react'
import './App.css'
import NavigationBar from './components/NavBar'
import Header from './components/Header'
import Contests from './components/Contests'
import ContestForm from './components/ContestForm'
import contestService from './services/contests'
import CustomInput from './components/CustomInput'


const App = () => {

  // form for objects, used by contestFormData
  // when submit button is pressed
  // resets the contest form to default
  const contestInit = {
    name: '',
    description: '',
    date_begin: '',
    date_end: '',
    url: '',
    status: ''
  }
  // const [newContest, setNewContest] = useState('')
  const [contests, setContests] = useState([])
  const [contestFormData, setContestFormData] = useState(contestInit)

  // Gets and displays the array objects
  useEffect(() => {
    contestService
      .getAll()
      .then(initialContests => {
        setContests(initialContests)
        console.log(initialContests, "CONTESTSSSS")
      })
  }, [])

  
  // Handles the inputs change on content change  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContestFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handles submit buttons functionality
  // creating a new contest object on click
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(contestFormData);

    contestService
      .createContest(contestFormData)
      .then(returnedContest => {
        setContests(contests.concat(returnedContest))
        setContestFormData(contestInit)
        console.log('happening')
      })
  };

  // Handles the button clicks on so called NavForm
  // will be changed overtime
  const handler = () => {
    console.log(' was pressed')
  }

  return (

    <div>
      <Header header={Header} />
      <NavigationBar handler={handler} />
      <h2>Kilpailut</h2>
      <div>
        {contests.map(contest =>
          <Contests key={contest.id} contest={contest} />
        )}
      </div>
      <ContestForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} contestFormData={contestFormData}/>
      {/* <ContestForm addContest={addContest} newContest={newContest} newDescription={newDescription} handleContestChange={handleContestChange}/> */}
    </div>
  )
}




export default App

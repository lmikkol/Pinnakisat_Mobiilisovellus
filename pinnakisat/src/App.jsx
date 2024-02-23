import { useState, useEffect } from 'react'
import './App.css'
import NavigationBar from './components/NavBar'
import Header from './components/Header'
import Contests from './components/Contests'
import ContestForm from './components/ContestForm'
import contestService from './services/contests'
import loginService from './services/login'
import LoginForm from './components/LoginForm'


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

  // Sisältää tiedot kirjautumiselle eli spostin joka toimii käyttäjätunnuksena sekä salasanan
  const loginCredentials = {
    email: '',
    password: ''
  }

  // const [newContest, setNewContest] = useState('')
  const [contests, setContests] = useState([])
  const [contestFormData, setContestFormData] = useState(contestInit)
  const [loginFormData, setLoginFormData] = useState(loginCredentials)
  const [user, setUser] = useState(null)

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

  // Käsittelee inputin muutoksia
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Kirjautumisen käsittelijä
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({
        loginFormData
      })

      setUser(loggedUser)
      setLoginFormData(loginCredentials)
    } catch (exception) {
      console.log('Wrong credentials', exception)
    }
  }

  // Handles the button clicks on so called NavForm
  // will be changed overtime
  const handler = () => {
    console.log(' was pressed')
  }

  // Palauttaa kirjautumisen lomakkeen
  const loginForm = () => {
    return (
      <><h2>Kirjaudu</h2><div>
        <LoginForm handleLogin={handleLogin} handleLoginInputChange={handleLoginInputChange} loginFormData={loginFormData} />

      </div></>
    )
  }

  const contestForm = () => {
    return (
      <ContestForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} contestFormData={contestFormData} />
    )
  }

  return (

    <div>

      <Header header={Header} />
      <NavigationBar handler={handler} />

      {/* Muuttaa näkymää kirjautuneelle käyttäjälle */}
      {!user && loginForm()}
      {user && contestForm()}


      <h2>Kilpailut</h2>
      <div>
        {contests.map(contest =>
          <Contests key={contest.id} contest={contest} />
        )}
      </div>
    </div>
  )
}




export default App

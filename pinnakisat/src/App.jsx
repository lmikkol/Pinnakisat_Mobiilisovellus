import { useState, useEffect } from 'react'
import './App.css'
import NavigationBar from './components/NavBar'
import Header from './components/Header'
import Contests from './components/Contests'
import ContestForm from './components/ContestForm'
import contestService from './services/contests'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import SelectReact from './components/SelectReact'
import {groupedOptions, sorsalinnut, kanalinnut, kuikkalinnut, uikkulinnut, ulappalinnut, pelikaanilinnut, haikaralinnut,
  päiväpetolinnut, jalohaukkalinnut, kurkilinnut, rantalinnut, hietakanalinnut, kyyhkylinnut,
   käkilinnut, pöllölinnut, kehrääjälinnut, kirskulinnut, säihkylinnut, tikkalinnut, varpuslinnut
  } from './data/birds'
import Select from 'react-select'

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
  const [selectedOption, setSelectedOption] = useState(null);



  //Sets logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPinnakisaUser')
    if(loggedUserJSON !== null) {
      console.log(loggedUserJSON, "TESTII")
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      contestService.setToken(user.token)
    }
  }, [])

  // Gets and displays the array objects
  useEffect(() => {
    contestService
      .getAll()
      .then(initialContests => {
        setContests(initialContests)
        console.log(initialContests, "CONTESTSSSS")
      })
  }, [])

  const options = [
    { value: 'kyhmyjoutsen', label: 'Kyhmyjoutsen' },
    { value: 'pikkujoutsen', label: 'Pikkujoutsen' },
    { value: 'laulujoutsen',  label: 'Laulujoutsen' },
  ];

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

      window.localStorage.setItem(
        'loggedPinnakisaUser', JSON.stringify(loggedUser)
      )
      console.log(loggedUser, "lägges")

      contestService.setToken(loggedUser.token)
      setUser(loggedUser)
      setLoginFormData(loginCredentials)
    } catch (exception) {
      console.log('Wrong credentials', exception)
    }
  }

  // user logs out
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedPinnakisaUser')
    setUser(null)
  }

  // Handles the button clicks on so called NavForm
  // will be changed overtime
  const handler = (id) => {
    console.log(id, ' was pressed')
  }

  const handleAddUser = async (contestId) => {
    console.log(user.id, contestId)
    try {
      await contestService.addUserToContest(contestId, user.id);
      console.log('User added to contest successfully');
    } catch (error) {
      console.error('Error adding user to contest:', error);
      console.log('An error occurred while adding user to contest');
    }
  };

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

  // FILTTERÖI VAIN KÄYTTÄJÄN KISAT
  const userContests = () => {
    const results = contests.filter(contest => user.contests.includes(contest.id))

    return (
      <><h2>Käyttäjän kilpailut</h2><div>
         <div>
         {results.map(contest =>
          <Contests key={contest.id} contest={contest} handleAddUser={handleAddUser}/>
        )}
        
      </div>
      </div></>
    )
  }

  
  return (

    <div>
      <Header header={Header} />
      <NavigationBar handler={handler} handleLogOut={handleLogOut} />

      {/* Muuttaa näkymää kirjautuneelle käyttäjälle */}
      {user && userContests()}
      {!user && loginForm()}
      {user && contestForm()}

      
      <h2>Havainnot</h2>
      <form onSubmit={handler}>
      <Select
        value={selectedOption}
        isMulti={true}
        onChange={handler}
        options={groupedOptions}
        getOptionLabel={(option) => option.fi}
      />
      <button>Tallenna</button>
      </form>

      <SelectReact handler={handler} selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={options}/>
      <h2>Kilpailut</h2>
      <div>
        {contests.map(contest =>
          <Contests key={contest.id} contest={contest} handleAddUser={handleAddUser} handler={handler}/>
        )}
      </div>
    </div>
  )
}

export default App


import { useState, useEffect } from 'react'
import './App.css'
import NavigationBar from './components/NavBar'
import Header from './components/Header'
import Contests from './components/Contests'
import ContestForm from './components/ContestForm'
import contestService from './services/contests'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import userService from './services/userService'
import Notification from './components/Notification'
import AddBirdModal from './components/AddBirdModal'
import sightingService from './services/sightings'
import NavBar from './components/NavigationBar'
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom'

const App = () => {


  const padding = {
    padding: 5
  }

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

  const registerCredentials = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  }

  // const [newContest, setNewContest] = useState('')
  const [contests, setContests] = useState([])
  const [contestFormData, setContestFormData] = useState(contestInit)
  const [loginFormData, setLoginFormData] = useState(loginCredentials)
  const [registerFormData, setRegisterFormData] = useState(registerCredentials)
  const [loggedinUser, setUser] = useState(null)
  const [selectedOption, setSelectedOption] = useState([]);
  const [userContest, setUserContest] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [sightings, setSighting] = useState({})

  const handleShowModal = () => setShowModal(true);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPinnakisaUser')
    if (loggedUserJSON !== null) {
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
      })
  }, [])
  //Sets logged user


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
  const handleSightingAdd = (event) => {
    event.preventDefault();
    console.log("ONNISTUI SAATANA", sightings)
    sightingService
       .createSighting(sightings)
       .then(returnedSighting => {
        console.log(returnedSighting)
        setSighting({})
       })
  };

  // Handles submit buttons functionality
  // creating a new contest object on click
  const handleSubmit = (event) => {
    event.preventDefault();
    contestService
      .createContest(contestFormData)
      .then(returnedContest => {
        setContests(contests.concat(returnedContest))
        setUserContest(userContest.concat(returnedContest))
        setContestFormData(contestInit)
      })
  };

  // lisätty uutena testailua varten...
  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Käsittelee inputin muutoksia
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // lisätty uutena testailua varten...
  const handleRegistration = async (event) => {
    event.preventDefault()

    try {
      const registeredUser = await userService.createUser({
        registerFormData
      })

      setUser(registeredUser)
      setLoginFormData(registerCredentials)
    } catch (exception) {
      console.log('Something went wrong..', exception)
    }
  }

  // Kirjautumisen käsittelijä
  const handleLogin = async (event) => {
    event.preventDefault()
    // const navigate = useNavigate()
    // event.onLogin(loggedinUser.email)
    // navigate('/')

    try {
      const loggedUser = await loginService.login({
        loginFormData
      })

      window.localStorage.setItem(
        'loggedPinnakisaUser', JSON.stringify(loggedUser)
      )

      contestService.setToken(loggedUser.token)
      setUser(loggedUser)
      setLoginFormData(loginCredentials)
      const results = contests.filter(contest => loggedUser.contests.includes(contest.id))
      setUserContest(results)
    } catch (error) {
      console.log('Wrong credentials', error)
      setErrorMessage(
        `Wrong credentials`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    if(loggedinUser || loggedinUser !== null){
      window.localStorage.setItem('loggedPinnakisaUser', JSON.stringify(loggedinUser))
    }
  })

  // user logs out
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedPinnakisaUser')
    setUser(null)
  }

  // Handles the button clicks on so called NavForm
  // will be changed overtime
  const handler = (event) => {
    event.preventDefault()
    console.log(selectedOption, ' was selected')
    setSelectedOption(selectedOption)
  }



  const handleAddUser = async (contestId) => {
    console.log(loggedinUser.id, contestId)
    try {
      const updatedUser = await userService.addContest(contestId, loggedinUser.id)
     // const updatedUserContests = [...userContest, contests.find(contest => contest.id === contestId)];
     // console.log(updatedUserContests, "UPDATED LIST")
     // setUserContest(updatedUserContests);
      setUser(prevUser => ({
        ...prevUser,
        contests: [...prevUser.contests, contestId]
      }))

    } catch (error) {
      console.error('Error adding user to contest:', error);
      console.log('An error occurred while adding user to contest');
    }
  };


  // Palauttaa kirjautumisen lomakkeen
  const loginForm = () => {
    return (
      <LoginForm handleLogin={handleLogin} handleLoginInputChange={handleLoginInputChange} loginFormData={loginFormData} />
    )
  }

  const contestForm = () => {
    return (
      <ContestForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} contestFormData={contestFormData} />
    )
  }

  const registerForm = () => {
    return (
      <div>
        <RegisterForm handleRegistration={handleRegistration} handleRegisterInputChange={handleRegisterInputChange} registerFormData={registerFormData} />
      </div>
    )
  }

  // FILTTERÖI VAIN KÄYTTÄJÄN KISAT
  const userContests = () => {
    const results = contests.filter(contest => loggedinUser.contests.includes(contest.id))
    return (
      <><h2>Käyttäjän kilpailut</h2><div>
        <div>
          <Contests contests={results} handleAddUser={handleAddUser} handler={handler} />
        </div>
      </div></>
    )
  }

    // FILTTERÖI VAIN KÄYTTÄJÄN KISAT
    const birdSightModal = () => {
      return (
        <AddBirdModal showModal={showModal} setShowModal={setShowModal} contest={contest} user={loggedinUser} setSighting={setSighting} handleSightingAdd={handleSightingAdd} />
      )
    }

  const [contest, setContest] = useState(null)
  return (
    <><div>
      

      <Header header={"Pinnakisapalvelu"} />
      <Router>
			<div>
				<i>Pinnakisapalvelu, jossa käyttäjät voivat osallistua kilpailuihin ja lisätä lintuhavaintojaan.</i>
			</div>
			<div>
				{/* <Link style={padding} to="/">Etusivu</Link> */}
				<Link style={padding} to="/">Etusivu</Link>
				<Link style={padding} to="/contests">Kilpailut</Link>
				<Link style={padding} to="/registration">Rekisteröidy</Link>
				<Link style={padding} to="/login">Kirjaudu</Link>
				{loggedinUser
					? <em>{loggedinUser} logged in</em>
					: <Link style={padding} to="/login">login</Link>
				}
				{/* <Link style={padding} to="/logout">LogOut</Link> */}
			</div>

			<Routes>
				<Route path="/" component={App} />
				<Route path="/contests" element={<Contests contests={contests} handleAddUser={handleAddUser} setContest={setContest} handleShowModal={handleShowModal} showModal={showModal} />} />
				<Route path="/registration" element={<RegisterForm handleRegistration={handleRegistration} handleRegisterInputChange={handleRegisterInputChange} registerFormData={registerFormData} />} />
				<Route path="/login" element={<LoginForm handleLogin={handleLogin} handleLoginInputChange={handleLoginInputChange} loginFormData={loginFormData} />} />
        {/* <Route path="/logout" element={handleLogOut}/> */}
			</Routes>
		</Router>

      <NavBar Contests={Contests} contests={contests} handleAddUser={handleAddUser} setContest={setContest}
      handleShowModal={handleShowModal} showModal={showModal} RegisterForm={RegisterForm} handleRegistration={handleRegistration} handleRegisterInputChange={handleRegisterInputChange}
	registerFormData={registerFormData} LoginForm={LoginForm} handleLogin={handleLogin} handleLoginInputChange={handleLoginInputChange} loginFormData={loginFormData} loggedinUser={loggedinUser}/>

      {/* <NavigationBar handler={handler} handleLogOut={handleLogOut} /> */}
      <Notification message={errorMessage} />


      {/* Muuttaa näkymää kirjautuneelle käyttäjälle */}
      {/* {loggedinUser && userContests()}
      {!loggedinUser && loginForm()}
      {!loggedinUser && registerForm()}
      {loggedinUser && contestForm()}
      {loggedinUser && birdSightModal()} */}

      {/* <Contests contests={contests} handleAddUser={handleAddUser} setContest={setContest} handleShowModal={handleShowModal} showModal={showModal}/> */}

    </div></>
  )
}

export default App


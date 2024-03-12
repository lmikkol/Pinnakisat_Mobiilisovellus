import { useState, useEffect } from 'react'
import './custom_styles.css'
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
import ContestsPage from './components/ContestsPage'
import UserContestsPage from './components/UserContestsPage'
import UserScorePage from './components/UserScorePage'
import NavBar from './components/NavigationBar'
import Button from 'react-bootstrap/Button'

import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom'
import login from './services/login'

const Home = () => {

  return(
  <div>
    <h2>PLACEHOLDER.</h2>
  </div>
  )
}

const Login = ({handleLogin, setLoginFormData, loginFormData}) => {

  // console.log(loginFormData)
  const navigate = useNavigate()
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  
  return (
    <div>
      <LoginForm handleLogin={handleLogin} handleLoginInputChange={handleLoginInputChange} loginFormData={loginFormData} />
    </div>
  )
}

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

  const notificationInfo = {
    type: '',
    message: ''
  }

  // const [newContest, setNewContest] = useState('')
  const [contests, setContests] = useState([])
  const [scores, setScores] = useState(null)
  const [contestFormData, setContestFormData] = useState(contestInit)
  const [loginFormData, setLoginFormData] = useState(loginCredentials)
  const [registerFormData, setRegisterFormData] = useState(registerCredentials)
  const [loggedinUser, setUser] = useState(null)
  const [selectedOption, setSelectedOption] = useState([]);
  const [userContest, setUserContest] = useState([]);
  const [notificationMessage, setNotification] = useState({notificationInfo})
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

  const handleRemoveContestFromUser = async (event) => {
    //Update userObject in database -> remove refkey based on contest id === event.target.name
    console.log("TODO", event.target.name)
    try {
      // Call a method to remove the contest from the user's contests
     const updatedUser= await userService.removeContest(event.target.name, loggedinUser.id);
  
      // Update the user state to reflect the removal of the contest
      setUser(prevUser => ({
        ...prevUser,
        contests: prevUser.contests.filter(id => id !== event.target.name)
      }));
    } catch (error) {
      console.error('Error removing contest from user:', error);
      console.log('An error occurred while removing contest from user');
    }

  }

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
  // const handleLoginInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setLoginFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // }

  // lisätty uutena testailua varten...
  const handleRegistration = async (event) => {
    
    try {
      const registeredUser = await userService.createUser({
        registerFormData
      })

      console.log("KÄYTTÄJÄ LUOTU", registeredUser)
      setRegisterFormData({})
      // setUser(registeredUser)
      // setLoginFormData(registerCredentials)
    } catch (exception) {
      console.log('Something went wrong..', exception)
    }
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

      contestService.setToken(loggedUser.token)
      setUser(loggedUser)
      setLoginFormData(loginCredentials)
      const results = contests.filter(contest => loggedUser.contests.includes(contest.id))
      setUserContest(results)
      setNotification({
        type: "success",
        message: "Logged In!"
      })
      setTimeout(() => {
        setNotification(notificationInfo)
      }, 3000)
    } catch (error) {
      console.log('Wrong credentials', error)
      setNotification({
       type: "warning",
       message: `Wrong credentials`
      }
      )
      setTimeout(() => {
        setNotification(notificationInfo)
      }, 3000)
    }
    const navigate = useNavigate();
    navigate('/');
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

  const handleAddUserContest = async (contestId) => {
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

  const handleFindUserContest = async (event) => {
     const contestId = event.target.name
     
    try{
      const findingUser = await userService.getUserContest(contestId)
      console.log('löytyi:', findingUser)

    } catch (error) {
      console.error('Error finding user contest', error)
      console.log('Error occured while searching for user contest')
    }
  }

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
        <div>
          <UserContestsPage contests={results} handleShowModal={handleShowModal} setContest={setContest} handleRemoveContestFromUser={handleRemoveContestFromUser}/>
        </div>
    ) 
  }

  const Contests = () => {
    return(
    <ContestsPage contests={contests} handleAddUserContest={handleAddUserContest} loggedinUser={loggedinUser}/> 
    )
  }

    // FILTTERÖI VAIN KÄYTTÄJÄN KISAT
    const birdSightModal = () => {
      return (
        <AddBirdModal showModal={showModal} setShowModal={setShowModal} contest={contest} user={loggedinUser} setSighting={setSighting} handleSightingAdd={handleSightingAdd} />
      )
    }

    const contestScores = () => {
      // const results = contests.filter(contest => loggedinUser.contests.includes(contest.id))
      return (
        <div>
          <UserScorePage contests={contests} handleShowModal={handleShowModal} setContest={setContest} />
        </div>
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
				
				{loggedinUser ? (
          <><Link style={padding} to="/usercontest">Omat kilpailut</Link>
          <em>{loggedinUser.name} logged in</em></>
        ) : (
          <><Link style={padding} to="/registration">Rekisteröidy</Link>
          <Link style={padding} to="/login">login</Link></>
        )}

				{loggedinUser && <Link style={padding} to="/logout">LogOut</Link>}
        <Link style={padding} to="/contest-scores">Tulokset</Link>
			</div>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contests" element={Contests()} />
        <Route path="/usercontest" element={loggedinUser && userContests()} />
				<Route path="/registration" element={registerForm()} />
				<Route path="/login" element={<><Login handleLogin={handleLogin} setLoginFormData={setLoginFormData} loginFormData={loginFormData} /><Notification message={notificationMessage} /></>} />
        <Route path="/logout" Component={handleLogOut}/>
        <Route path="/contest-scores" element={contestScores()}/>
			</Routes>
		</Router>

    <Button name="65edc0fa4db8f95db486d907" type="button" className="btn btn-warning" onClick={(event) => handleFindUserContest(event)}>
            Poistu kisasta
          </Button>

      {/* Muuttaa näkymää kirjautuneelle käyttäjälle */}
      {loggedinUser && contestForm()}
      {loggedinUser && birdSightModal()} 

    </div></>
  )
}

export default App


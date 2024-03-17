import { useState, useEffect } from 'react'
import './custom_styles.css'
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

const CreateNewContest = () => {
  return(
    <div>
      <ContestForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} contestFormData={contestFormData}/>
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
      <LoginForm handleLogin={handleLogin} handleLoginInputChange={handleLoginInputChange} loginFormData={loginFormData}/>
    </div>
  )
}

const App = () => {
  
  const padding = {
    padding: 5
  }
  
  const alertTimer = () => {
    setTimeout(() => {
      setNotification({})
    }, 3000)
  }

//#region STATE CREDENTIALS
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
//#endregion STATE CREDENTIALS END

//#region STATES START
  // const [newContest, setNewContest] = useState('')
  const [scores, setScores] = useState(null)
  const [contestFormData, setContestFormData] = useState(contestInit)
  const [loginFormData, setLoginFormData] = useState(loginCredentials)
  const [registerFormData, setRegisterFormData] = useState(registerCredentials)
  const [loggedinUser, setUser] = useState(null)
  const [selectedOption, setSelectedOption] = useState([]);
  const [userContest, setUserContest] = useState([]);
  const [notificationMessage, setNotification] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [sightings, setSighting] = useState({})


  //UUDET JA PIDETTÄVÄT
  const [allUsers, setAllUsers] = useState([])
  const [contests, setContests] = useState([])
//#endregion STATES END

  const handleShowModal = () => setShowModal(true);


  //USEEFFECTIT START
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
      .then(allContests => {
        setContests(allContests)
       
      })
  }, [])

  useEffect(() => {
    userService
    .getAllUsers()
    .then(initialContests => {
      setUserContest(initialContests)
    })
  }, [])

  console.log(allUsers, "ENNEN EFEKTI'")

  useEffect(() => {
    userService
    .getAllUsers()
    .then(users => {
      setAllUsers(users)
      console.log(users, 'USEFEECT KAIKKI USERIT!')
  })
  }, [])

  
  console.log(allUsers, "JÄLKEEN EFEKTI'")


  // Handles the inputs change on content change  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContestFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


//#region KISAAN OSALLISTUMINEN JA POISTUMINEN START
  const handleRemoveContestFromUser = async (event) => {
    const contestId = event.target.name

    try {
     await userService.removeContest(contestId, loggedinUser.id);
    setUser(prevUser => ({
      ...prevUser,
      contests: prevUser.contests.filter(id => id !== contestId)
    }));
    } catch (error) {
      //FEAT: LISÄÄ NOTIFICAATIOT
      console.error('Error removing contest from user:', error);
      console.log('An error occurred while removing contest from user');
      setNotification({
        type: "warning",
        message: "Virhe poistettaessa kisaa käyttäjältä"
      })
      alertTimer()
    }
  }
  const handleAddUserToContest = async (contestId) => {

    try {
      await userService.addContest(contestId, loggedinUser.id)

      setUser(prevUser => ({
        ...prevUser,
        contests: [...prevUser.contests, contestId]
      }))
      console.log(userContest, 'USERIN CONTESTIIIIITTT')
      setNotification({
        type: "success",
        message: "Kisaan liitytty"
      })
      alertTimer()

    } catch (error) {
      //FEAT: LISÄÄ NOTIFICAATIOT
      console.error('Error adding user to contest:', error);
      console.log('An error occurred while adding user to contest');
      setNotification({
        type: "warning",
        message: "Virhe kisaan liittymisessä"
      })
      alertTimer()
    }
  };
//#endregion KISAAN OSALLISTUMINEN JA POISTUMINEN END


  const handleSightingAdd = (event) => {
    event.preventDefault();
    console.log("ONNISTUI SAATANA", sightings)
  }

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

  // Käyttäjän luomisen käsittelijä
  const handleRegistration = async (event) => {
    
    try {
      const registeredUser = await userService.createUser({
        registerFormData
      })

      console.log("KÄYTTÄJÄ LUOTU", registeredUser)
      setRegisterFormData({})
      setNotification({
        type: "success",
        message: "Käyttäjä rekisteröity!"
      })
      alertTimer()
      // setUser(registeredUser)
      // setLoginFormData(registerCredentials)
    } catch (exception) {
      console.log('Something went wrong..', exception)
      setNotification({
        type: "danger",
        message: "Virhe rekisteröinnissä"
      })
      alertTimer()
    }
  }

  //#region KIRJAUTUMISEN KÄSITTELY
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
        message: "Kirjauduttu sisään"
      })
      alertTimer()
    } catch (error) {
      console.log('Wrong credentials', error)
      setNotification({
       type: "danger",
       message: `Väärä sähköpostiosoite tai salasana`
      }
      )
      alertTimer()
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
//#endregion KIRJAUTUMISEN KÄSITTELIJÄ END

  // Handles the button clicks on so called NavForm
  // will be changed overtime
  const handler = (event) => {
    event.preventDefault()
    console.log(selectedOption, ' was selected')
    setSelectedOption(selectedOption)
  }


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

  //#region FORMIT!!!
  const contestForm = () => {
    return (
      <ContestForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} contestFormData={contestFormData}/>
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
    <ContestsPage contests={contests} handleAddUserToContest={handleAddUserToContest} loggedinUser={loggedinUser} handleRemoveContestFromUser={handleRemoveContestFromUser}/> 
    )
  }

    // FILTTERÖI VAIN KÄYTTÄJÄN KISAT
    const birdSightModal = () => {
      return (
        <AddBirdModal showModal={showModal}  setShowModal={setShowModal} contest={contest} user={loggedinUser} setAllUsers={setAllUsers} setSighting={setSighting} handleSightingAdd={handleSightingAdd} handleSubmit={handleSubmit} />
      )
    }

    const contestScores = () => {
      // const results = contests.filter(contest => findingUser.contests.includes(contest.id))
      console.log("all users", allUsers)
      return (
        <div>
          <UserScorePage users={allUsers} contests={contests} handleShowModal={handleShowModal} setContest={setContest}  />
        </div>
      )
    }

    const NotificationMessages = () => {
      return(
        <div>
          <Notification message={notificationMessage} />
        </div>
      )
    }
//#endregion FORMIT!!! END
  
const [contest, setContest] = useState(null)

  return (
    <><div>

      <Header header={"Pinnakisapalvelu"} />
      <Router>
			<div>
				<i>Pinnakisapalvelu, jossa käyttäjät voivat osallistua kilpailuihin ja lisätä lintuhavaintojaan.</i>
			</div>
			<div>
				<Link style={padding} to="/">Etusivu</Link>
				<Link style={padding} to="/contests">Kilpailut</Link>
				
				{loggedinUser ? (
          <><Link style={padding} to="/usercontest">Omat kilpailut</Link>
          <em>{loggedinUser.name} logged in</em></>
        ) : (
          <><Link style={padding} to="/registration">Rekisteröidy</Link>
          <Link style={padding} to="/login">Kirjaudu</Link></>
        )}

				{loggedinUser && <Link style={padding} to="/logout">LogOut</Link>}
        {/* <Link style={padding} to="/contest-scores">Tulokset</Link> */}
        {loggedinUser && loggedinUser.userRole===0 && <Link style={padding} to="/add-contest">Lisää kilpailu</Link>}
			</div>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contests" element={Contests()}/>
        <Route path="/contests/:id" element={contestScores()} />
        <Route path="/usercontest" element={loggedinUser && userContests()} />
				<Route path="/registration" element={registerForm()} />
				<Route path="/login" element={<><Login handleLogin={handleLogin} setLoginFormData={setLoginFormData} loginFormData={loginFormData} /> {NotificationMessages()}</>}/>
        <Route path="/logout" Component={handleLogOut}/>
        <Route path="/contest-scores" element={contestScores()}/>
        <Route path="/add-contest" element={loggedinUser && contestForm()}/>
			</Routes>
		</Router>

    {/* <Button name="65edc0fa4db8f95db486d907" type="button" className="btn btn-warning" onClick={(event) => handleFindUserContest(event)}>
            Poistu kisasta
          </Button> */}

      {/* Muuttaa näkymää kirjautuneelle käyttäjälle */}
      {/* {loggedinUser && contestForm()} */}
      {loggedinUser && birdSightModal()} 

    </div></>
  )
}

export default App
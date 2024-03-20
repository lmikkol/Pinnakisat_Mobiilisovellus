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
import ContestsPage from './components/ContestsPage'
import UserContestsPage from './components/UserContestsPage'
import UserScorePage from './components/UserScorePage'
import Footer from './components/Footer'
import sinitiainen from './sinitiainen.jpg';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'

const Home = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h2>TERVETULOA PINNAKISAPALVELUUN!</h2>
        <img src={sinitiainen} alt="sinitiainen" width={350} />
        <p>kuva: pixabay</p>
      </div>
    </div>
  )
}

const Login = ({ handleLogin, setLoginFormData, loginFormData }) => {
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  useEffect(() => {
    return () => {
      setLoginFormData({
        username: '',
        password: '',
      });
    };
  }, [setLoginFormData]);

  return (
    <div>
      <LoginForm handleLogin={handleLogin} handleLoginInputChange={handleLoginInputChange} loginFormData={loginFormData} />
    </div>
  )
}


const App = () => {

  const navigate = useNavigate()

  const alertTimer = () => {
    setTimeout(() => {
      setNotification({})
    }, 5000)
  }

  //#region STATE CREDENTIALS
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
    password: '',
    passwordAgain: ''
  }
  //#endregion STATE CREDENTIALS END

  //#region STATES START
  const [contestFormData, setContestFormData] = useState(contestInit)
  const [loginFormData, setLoginFormData] = useState(loginCredentials)
  const [registerFormData, setRegisterFormData] = useState(registerCredentials)
  const [loggedinUser, setUser] = useState(null)
  const [userContest, setUserContest] = useState([]);
  const [notificationMessage, setNotification] = useState({})
  const [showModal, setShowModal] = useState(false);


  //UUDET JA PIDETTÄVÄT
  const [allUsers, setAllUsers] = useState([])
  const [contests, setContests] = useState([])
  //#endregion STATES END

  const handleShowModal = () => setShowModal(true);


  //#region USEEFFECTIT START
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


  useEffect(() => {
    userService
      .getAllUsers()
      .then(users => {
        setAllUsers(users)
      })
  }, [])

  //#endregion 

  // Handles the inputs change on content change  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContestFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  //#region KISAAN OSALLISTUMINEN JA POISTUMINEN START
  const handleRemoveContestFromUser = async (contestid) => {
    const contestId = contestid

    try {
      await userService.removeContest(contestId, loggedinUser.id);
      setUser(prevUser => ({
        ...prevUser,
        contests: prevUser.contests.filter(id => id !== contestId)
      }));
      setNotification({
        type: "success",
        message: "Poistuit kilpailusta onnistuneesti!"
      })
      alertTimer()
    } catch (error) {

      //console.error('Error removing contest from user:', error);
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
      setNotification({
        type: "success",
        message: "Liityit kilpailuun!"
      })
      alertTimer()

    } catch (error) {
      //console.error('Error adding user to contest:', error);
      setNotification({
        type: "warning",
        message: "Kilpailuun liittyessä tapahtui virhe, yritä uudelleen."
      })
      alertTimer()
    }
  };

  //#endregion KISAAN OSALLISTUMINEN JA POISTUMINEN END


  const handleSubmit = (event, closeModalCallback, clearDateFieldsCallback) => {
    event.preventDefault();

    // console.log(contestFormData)
    console.log(event.currentTarget, "TÄÄLLÄ OLLAAN")

    const currentDate = new Date();
    const startDate = new Date(contestFormData.date_begin);
    const endDate = new Date(contestFormData.date_end);

    let newStatus = '';

    if (startDate > currentDate) {
      newStatus = "upcoming";
    } else if (currentDate >= startDate && currentDate <= endDate) {
      newStatus = "active";
    } else {
      newStatus = "archived";
    }

    // Update status in contestFormData
    const updatedFormData = {
      ...contestFormData,
      status: newStatus
    };

    // Create the contest with updatedFormData
    contestService.createContest(updatedFormData)
      .then(returnedContest => {
        const updatedStatus = returnedContest.status;
        setContestFormData({
          ...contestFormData,
          status: updatedStatus
        });
        setContests(contests.concat(returnedContest));
        setUserContest(userContest.concat(returnedContest));
        setContestFormData(contestInit);

        setNotification({
          type: "success",
          message: "Kilpailun lisääminen onnistui!"
        })
        alertTimer()

        closeModalCallback();
        clearDateFieldsCallback();
      })
      .catch(error => {
        setNotification({
          type: "warning",
          message: "Kilpailun lisäyksessä tapahtui virhe, tarkista kentät ja yritä uudelleen."
        })
        alertTimer()
      });
  };


  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email)
  }

  // Käyttäjän luomisen käsittelijä
  const handleRegistration = async (event) => {
    event.preventDefault()


    if (!registerFormData.password || registerFormData.password.length < 5 || !/\d/.test(registerFormData.password)) {
      setNotification({
        type: "danger",
        message: "Salasanan on oltava vähintään 5 merkkiä pitkä ja sisältää 1 numero"
      });
      alertTimer();
      return;
    }

    if (!registerFormData.email || !isValidEmail(registerFormData.email)) {
      setNotification({
        type: "danger",
        message: "Sähköpostiosoite ei ole oikeassa muodossa. Sähköpostin tulee sisältää @ -merkki ja päättyä päätteeseen fi tai com."
      })
      alertTimer()
      return;
    }

    if (!registerFormData.password || registerFormData.password.length < 5 || !/\d/.test(registerFormData.password)) {
      setNotification({
        type: "danger",
        message: "Salasanan on oltava vähintään 5 merkkiä pitkä ja sisältää 1 numero"
      });
      alertTimer();
      return; // Prevent further execution
    }

    if (registerFormData.password !== registerFormData.passwordAgain) {
      setNotification({
        type: "danger",
        message: "Salasanat eivät täsmää. Yritä uudelleen."
      })
      alertTimer()
      return;
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      try {
        const registeredUser = await userService.createUser({
          registerFormData
        })

        //console.log("KÄYTTÄJÄ LUOTU", registeredUser)
        setRegisterFormData(registerCredentials)

        setNotification({
          type: "success",
          message: "Käyttäjän rekisteröityminen onnistui!"
        })
        alertTimer()
        navigate('/', { replace: true })
        // setUser(registeredUser)
        // setLoginFormData(registerCredentials)
      } catch (error) {
        //console.log('Wrong credentials', error)
        setNotification({
          type: "warning",
          message: `Käyttäjätietojen kirjaamisessa tapahtui ongelma, yritä uudelleen.`
        }
        )
        alertTimer()
      }
    }
  }


  //#region KIRJAUTUMISEN KÄSITTELY
  // Kirjautumisen käsittelijä
  const handleLogin = async (event) => {

    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

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
          message: "Olet kirjautunut sisään!"
        })
        alertTimer()
      } catch (error) {
        //console.log('Wrong credentials', error)
        setNotification({
          type: "warning",
          message: `Väärät käyttäjätiedot, yritä uudelleen.`
        }
        )
        alertTimer()
      }
    }
  }


  useEffect(() => {
    if (loggedinUser || loggedinUser !== null) {
      window.localStorage.setItem('loggedPinnakisaUser', JSON.stringify(loggedinUser))
    }
  })

  // user logs out
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedPinnakisaUser')
    setUser(null)

    return (
      <div>
        <p>Olet kirjautunut ulos pinnakisapalvelusta!<br />
          Päivitä sivu/paina etusivu painiketta palataksesi etusivulle!
        </p>
      </div>
    )
  }
  //#endregion KIRJAUTUMISEN KÄSITTELIJÄ END




  //#region FORMIT!!!
  const registerForm = () => {
    return (
      <div>
        <RegisterForm handleRegistration={handleRegistration} handleRegisterInputChange={handleRegisterInputChange} registerFormData={registerFormData} setRegisterFormData={setRegisterFormData} />
      </div>
    )
  }

  // FILTTERÖI VAIN KÄYTTÄJÄN KISAT
  const userContests = () => {
    console.log(contests)
    const results = contests.filter(contest => loggedinUser.contests.includes(contest.id))
    return (
      <div>
        <UserContestsPage contests={results} handleShowModal={handleShowModal} setContest={setContest} handleRemoveContestFromUser={handleRemoveContestFromUser} />
      </div>
    )
  }

  const Contests = () => {
    return (
      <ContestsPage contests={contests} handleAddUserToContest={handleAddUserToContest} loggedinUser={loggedinUser} handleRemoveContestFromUser={handleRemoveContestFromUser} handleSubmit={handleSubmit} handleInputChange={handleInputChange} contestFormData={contestFormData} />
    )
  }

  // FILTTERÖI VAIN KÄYTTÄJÄN KISAT
  const birdSightModal = () => {
    return (
      <AddBirdModal showModal={showModal} setShowModal={setShowModal} contests={contests} contestId={contest} setContests={setContests} user={loggedinUser} setNotification={setNotification} alertTimer={alertTimer} />
    )
  }

  const contestScores = () => {

    return (
      <div>
        <UserScorePage contests={contests} />
      </div>
    )
  }

  const NotificationMessages = () => {
    return (
      <div>
        <Notification message={notificationMessage} />
      </div>
    )
  }
  //#endregion FORMIT!!! END


  const [contest, setContest] = useState(null)

  return (
    <><div>

      <Header header="Pinnakisapalvelu" subheader="Pinnakisapalvelu, jossa käyttäjät voivat osallistua kilpailuihin ja lisätä lintuhavaintojaan." />
      {NotificationMessages()}


      <div className="navbar">
        <Link to="/">Etusivu</Link>
        <Link to="/contests">Kilpailut</Link>
        {loggedinUser ? (
          <>
            <Link to="/usercontest">Omat kilpailut</Link>
            {/* <em>{loggedinUser.name} kirjautunut sisään</em> */}
          </>
        ) : (
          <>
            <Link to="/registration">Rekisteröidy</Link>
            <Link to="/login">Kirjaudu sisään</Link>
          </>
        )}
        {loggedinUser && <Link to="/logout">Kirjaudu ulos</Link>}
      </div>

      <div>
        <em style={{ marginBottom: '5px', fontWeight: 'bold' }}>
          {loggedinUser ? `${loggedinUser.name} on kirjautunut sisään` : 'Kirjaudu sisään osallistuaksesi kilpailuihin'}
        </em>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contests" element={Contests()} />
        <Route path="/contests/:id" element={contestScores()} />
        <Route path="/usercontest" element={loggedinUser && userContests()} />
        <Route path="/registration" element={registerForm()} />
        <Route path="/login" element={loggedinUser ? <Home /> : <Login handleLogin={handleLogin} setLoginFormData={setLoginFormData} loginFormData={loginFormData} />} />
        <Route path="/logout" Component={handleLogOut} />
        <Route path="/contest-scores" element={contestScores()} />
      </Routes>

      {/* Muuttaa näkymää kirjautuneelle käyttäjälle */}
      {/* {loggedinUser && contestForm()} */}
      {loggedinUser && birdSightModal()}

      <Footer />

    </div></>
  )
}


export default App
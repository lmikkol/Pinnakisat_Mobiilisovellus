import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
	useParams,
	useNavigate,
} from 'react-router-dom'
import App from '../App'


const NavBar = ({
	Contests, contests, handleAddUser, setContest, handleShowModal, showModal, RegisterForm, handleRegistration, handleRegisterInputChange,
	registerFormData, LoginForm, handleLogin, handleLoginInputChange, loginFormData, loggedinUser }) => {

	const padding = {
		padding: 5
	}

	return (
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
				{/* <Link style={padding} to="/users">Käyttäjät</Link> */}
			</div>

			<Routes>
				<Route path="/" component={App} />
				<Route path="/contests" element={<Contests contests={contests} handleAddUser={handleAddUser} setContest={setContest} handleShowModal={handleShowModal} showModal={showModal} />} />
				<Route path="/contests/:id" element={<Contests contests={contests} />} />
				<Route path="/registration" element={<RegisterForm handleRegistration={handleRegistration} handleRegisterInputChange={handleRegisterInputChange} registerFormData={registerFormData} />} />
				<Route path="/login" element={<LoginForm handleLogin={handleLogin} handleLoginInputChange={handleLoginInputChange} loginFormData={loginFormData} />} />
			</Routes>
		</Router>
	)
}

export default NavBar
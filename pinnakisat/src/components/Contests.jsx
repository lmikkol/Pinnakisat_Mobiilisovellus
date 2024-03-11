import Button from 'react-bootstrap/Button'
import ContestCard from './ContestCard'
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom'

const ContestItem = ({contest, handleAddUser, setContest, handleShowModal}) => {

  const TEST = ({event}) => {
    setContest(event.target.name)
    handleShowModal(true)
  }

  return (
<div>
<h3>{contest.name}</h3>
<p className="p">{contest.description}</p>

<Button name={contest.id} type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModalScrollable"onClick={() => handleAddUser(contest.id)} >
      Osallistu kisaan!
            </Button>


      <Button name={contest.id} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable" onClick={(event) => TEST(event = {event})} >
        Lisää uusi havainto
      </Button>
<hr/>
</div>
  )
}


const Contests = ({contests, handleAddUser, setContest, handleShowModal }) => {
  return (
    <div>
        <h2>Kilpailut</h2>
      {contests.map(contest =>
        <><ContestItem key={contest.id} contest={contest} handleAddUser={handleAddUser} setContest={setContest} handleShowModal={handleShowModal} /><ContestCard contest={contest} handleAddUser={handleAddUser} /></>
        )}
    </div>
  )
}

export default Contests



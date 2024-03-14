import Card from 'react-bootstrap/Card';
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


function ContestCard({contest, handleAddUserContest, loggedinUser, handleRemoveContestFromUser}) {    
    const dates = {start: new Date(contest.date_begin), end: new Date(contest.date_end)};
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDates = {start: dates.start.toLocaleDateString(undefined, options), end: dates.end.toLocaleDateString(undefined, options)}
    const datesForm = (<><p>{formattedDates.start}- {formattedDates.end}</p></>)
    console.log(loggedinUser)

    const isParticipant = loggedinUser && loggedinUser.contests.includes(contest.id);

    
  return (
    
    <Card style={{ width: '36rem' }} className="shadow-sm mb-1 bg-white rounded">
      <Card.Body style={{ position: "relative" }}>
      <Card.Title>{contest.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{datesForm}</Card.Subtitle>
        <Card.Text>
          {contest.description}
        </Card.Text>
        <Link to={`/contests/${contest.id}`}>Tulokset</Link>
        {loggedinUser && <>
          {isParticipant ? (
              <Button name={contest.id} type="button" className="btn btn-warning" onClick={(event) => handleRemoveContestFromUser(event)}>
              Poistu kisasta
            </Button>
        ) : (
          <Button name={contest.id} type="button" className="btn btn-success" onClick={() => handleAddUserContest(contest.id)} >
            Participate in contest
          </Button>
        )} </>  
      }
      </Card.Body>
    </Card>   
  );
}

export default ContestCard;
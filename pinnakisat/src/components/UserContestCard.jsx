import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function UserContestCard({ contest, handleShowModal, setContest, handleRemoveContestFromUser }) {
  console.log(contest)

  const TEST = ({ event }) => {
    setContest(event.target.name)
    handleShowModal(true)
  }

  const dates = { start: new Date(contest.date_begin), end: new Date(contest.date_end) };
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDates = { start: dates.start.toLocaleDateString(undefined, options), end: dates.end.toLocaleDateString(undefined, options) }
  const datesForm = (<><p>{formattedDates.start} - {formattedDates.end}</p></>)

  return (
    <Card style={{ width: '36rem' }}>
      <Card.Body style={{ position: "relative" }}>
        <Card.Title>{contest.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{datesForm}</Card.Subtitle>
        <Link to={`/contests/${contest.id}`}>Katso tulokset</Link>
        <Card.Text>
          {contest.url}
        </Card.Text>
        <Button name={contest.id} type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#exampleModalScrollable" onClick={(event) => TEST(event = { event })} >
          Lisää uusi havainto
        </Button>
        <Button name={contest.id} type="button" className="btn btn-warning" onClick={(event) => handleRemoveContestFromUser(event)}>
          Poistu kisasta
        </Button>
      </Card.Body>
    </Card>



  );
}



export default UserContestCard;
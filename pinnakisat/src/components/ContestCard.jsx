import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Placeholder for styles

function ContestCard({ contest, handleAddUserToContest, loggedinUser, handleRemoveContestFromUser }) {

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const showConfirmation = () => {
    setShowConfirmationModal(true);
  }
  
  const hideConfirmation = () => {
    setShowConfirmationModal(false);
  }

  const confirmLeaveContest = () => {
    handleRemoveContestFromUser(contest.id);
    hideConfirmation();
    console.log(contest.id)
  }

  const styles = {
    invalid: {
      border: '1px solid red'
    },
    invalidTooltip: {
      color: 'red',
      fontSize: '12px',
    },
    label: {
      display: 'block', // Make the label a block-level element
    },
    customCard: {
      background: "#bebebe"
    },
    upcomingCard: {
      background: "#76ac76"
    },
  };

  const formatDates = () => {
    const dates = { start: new Date(contest.date_begin), end: new Date(contest.date_end) };
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDates = { start: dates.start.toLocaleDateString(undefined, options), end: dates.end.toLocaleDateString(undefined, options) }
    return (
      <p>{formattedDates.start} - {formattedDates.end}</p>
    )
  }

  const isParticipant = loggedinUser && loggedinUser.contests.includes(contest.id);

  // style={contest.status === "archived" ? styles.customCard : {}}

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Card style={{ width: '36rem' }} className="shadow-sm mb-1 bg-white rounded">
      <Card.Body style={contest.status === "archived" ? styles.customCard : contest.status === "upcoming" ? styles.upcomingCard : {}}>
        <Card.Title>{contest.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{formatDates()}</Card.Subtitle>
        <Card.Text >
          {contest.description}
        </Card.Text>
        <div>
        {contest.status !== "upcoming" && (
          <Link to={`/contests/${contest.id}`}>Katso tulokset</Link>
        )}
      </div>

        {contest.status === "archived" && (
          <p>Kilpailu on päättynyt.</p>
        )}
        {loggedinUser && contest.status === "active" && (
          <>
            {isParticipant ? (
              <p>Olet osallistunut tähän kilpailuun.</p>
            ) : (
              <p>Et ole osallistunut tähän kilpailuun.</p>
            )}
            {isParticipant ? (
              <Button name={contest.id} type="button" className="btn btn-warning" onClick={(event) => { showConfirmation(event) }}>
              Poistu kisasta
            </Button>
            ) : (
              <Button name={contest.id} type="button" className="btn btn-success" onClick={() => handleAddUserToContest(contest.id)} >
                Osallistu kisaan
              </Button>
            )}
          </>
        )}
      </Card.Body>
    </Card>
    <ConfirmationModal
    show={showConfirmationModal}
    onHide={hideConfirmation}
    onConfirm={confirmLeaveContest}
  />
  </div>
  </>
  );
}

export default ContestCard;
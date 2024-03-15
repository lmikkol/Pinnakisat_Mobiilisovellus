import { Button } from 'react-bootstrap';
import ContestCard from './ContestCard';
import Stack from 'react-bootstrap/Stack';

const ContestsPage = ({contests, handleAddUserToContest, loggedinUser, handleRemoveContestFromUser }) => {
    return (
    <div>
      <Stack gap={1}>
      {contests.map(contest =>  
          <>
          <div className="p-2">
          <ContestCard contest={contest} handleAddUserToContest={handleAddUserToContest} loggedinUser={loggedinUser} handleRemoveContestFromUser={handleRemoveContestFromUser}/>
					</div>
					</>
        )}
    </Stack>

    </div>
  )
}

export default ContestsPage



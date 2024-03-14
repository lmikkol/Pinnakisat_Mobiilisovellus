import ContestCard from './ContestCard';
import Stack from 'react-bootstrap/Stack';

const styles = {
  grid: {
      paddingLeft: 0,
      paddingRight: 0
  },
  row: {
      marginBottom: 12
  },
  col: {
      paddingLeft: 0,
      paddingRight: 0
  }
};


const ContestsPage = ({contests, handleAddUserContest, loggedinUser, handleRemoveContestFromUser }) => {
    return (
    <div>
      <Stack gap={1}>
      {contests.map(contest =>  
          <>
          <div className="p-2">
          {/* <Link to={`/contests/${contest.id}`}>{contest.name}</Link> */}
          <ContestCard contest={contest} handleAddUserContest={handleAddUserContest} loggedinUser={loggedinUser} handleRemoveContestFromUser={handleRemoveContestFromUser}/>
					</div>
					</>
        )}
    </Stack>

    </div>
  )
}

export default ContestsPage



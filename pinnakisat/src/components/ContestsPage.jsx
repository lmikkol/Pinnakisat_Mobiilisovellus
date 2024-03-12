
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


const ContestsPage = ({contests, handleAddUserContest, loggedinUser }) => {
    return (
    <div>
      <Stack gap={1}>
      {contests.map(contest =>  
          <>
          <div className="p-2">
          <ContestCard contest={contest} handleAddUserContest={handleAddUserContest} loggedinUser={loggedinUser} />
					</div>
					</>
        )}
    </Stack>

    </div>
  )
}

export default ContestsPage



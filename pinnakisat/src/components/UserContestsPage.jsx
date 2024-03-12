import UserContestCard from './UserContestCard'
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


const UserContestsPage = ({contests, handleShowModal,setContest , handleRemoveContestFromUser }) => {
  return (
    <div>
      <Stack gap={1}>
      {contests.map(contest =>  
          <>
          <div className="p-2">
						<UserContestCard contest={contest} handleShowModal={handleShowModal} setContest={setContest} handleRemoveContestFromUser={handleRemoveContestFromUser} />
					</div>
					</>
        )}
    </Stack>
    </div>
  )
}

export default UserContestsPage



import UserScoreCard from './UserScoreCard';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react';
import userService from '../services/userService';


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


const UserScorePage = ({contests, handleShowModal, setContest}) => {
    const [isOpen, setIsOpen] = useState(false);
    // const results = contests.filter(contest => loggedinUser.contests.includes(contest.id))
    // console.log('Im here')

  
    const handleClick = () => {
      setIsOpen(!isOpen);
    };
  return (
    
    <div>
      <Stack gap={1}>
      {contests.map(contest =>  
          <>
          <div className="p-2"> 
						<UserScoreCard contest={contest} handleShowModal={handleShowModal} setContest={setContest} />
					</div>
					</>
        )}
    </Stack>
    <div className="just-padding">
      <div className="list-group list-group-root">
        <a href="#item-1" className="list-group-item list-group-item-action" onClick={handleClick}>
          <i className={`fa ${isOpen ? 'fa-caret-down' : 'fa-caret-right'}`}></i>Osallistuja
        </a>
        <div>
        <a href="#item-1" className="list-group-item list-group-item-action" onClick={handleClick}>
          <i className={`fa ${isOpen ? 'fa-caret-down' : 'fa-caret-right'}`}></i>Havainnot
        </a>
        </div>
        <div className={`list-group ${isOpen ? 'show' : 'collapse'}`} id="item-1">
          {contests.map(contest => (
          <a href={`#item-${contest.id}`} className="list-group-item list-group-item-action" key={contest.id} >
           {contest.name}
          </a>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserScorePage
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';

import { useParams } from 'react-router-dom'; // Import useParams from React Router
import { Fragment } from 'react';

const UserScorePage = ({ users, contests }) => {
  const [openRows, setOpenRows] = useState([]);



  const id = useParams().id

  const contestName = contests.map(contest => { if (contest.id === id) return contest.name })


  const participatedUsers = users.filter(user => {
    return user.sightings.some(sighting => sighting.contest === id);
  });

  const toggleRow = (rowIndex) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(rowIndex)
        ? prevOpenRows.filter((row) => row !== rowIndex)
        : [...prevOpenRows, rowIndex]
    );
  };
  const calculatePoints = (sightings) => {
    let points = 0
    sightings.forEach((sighting) => {
      if (sighting.contest === id) {
        sighting.birdList.forEach(b => points += 1)
      }
    })
    return points;
  }

  participatedUsers.sort((a, b) => calculatePoints(b.sightings) - calculatePoints(a.sightings));
  

  if (participatedUsers.length === 0) {

    return ( 
      <><h2>{contestName}</h2><p>No users have participated in this contest.</p></> )
  }

  return (
    <>
      <h2>{contestName}</h2>
      <table>
        <thead>
          <tr>
            <th>Osallistuja</th>
            <th>Havainnot</th>
            <th>Pisteet</th>
          </tr>
        </thead>
        <tbody>
          {participatedUsers.map((user, index) => (
            <Fragment key={index}>
              <tr className="table-primary" onClick={() => toggleRow(index)}>
                <td>{user.email}</td>
                <td />
                {/* TÄHÄN LASKETAAN KÄYTTÄJÄN PISTEET*/}
                {<td>{calculatePoints(user.sightings)}</td>}
              </tr>
              {openRows.includes(index) && (
                <tr>
                  <td />
                  <td colSpan="2">
                    <div>
                      {/* Rendering subrow content */}
                      {user.sightings && user.sightings.map((sighting) => {
                        // Checking if the sighting is for the current contest
                        if (sighting.contest === id) {
                          return sighting.birdList.map((bird, idx) => (
                            <div key={idx}>
                              {/* Render subrow content here */}
                              {bird.name} {/* Example property */}
                            </div>
                          ));
                        }
                        return null; // Return null if the condition doesn't match
                      })}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserScorePage;
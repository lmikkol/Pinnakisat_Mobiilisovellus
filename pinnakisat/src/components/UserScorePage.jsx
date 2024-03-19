import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';

import { useParams } from 'react-router-dom'; // Import useParams from React Router
import { Fragment } from 'react';

const UserScorePage = ({ users, contests }) => {
  const [openRows, setOpenRows] = useState([]);

  const toggleRow = (rowIndex) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(rowIndex)
        ? prevOpenRows.filter((row) => row !== rowIndex)
        : [...prevOpenRows, rowIndex]
    );
  };

  const id = useParams().id


  const thisContest = contests.filter(contest => contest.id === id)[0]

  if (!thisContest) {
    return <h2>No contest found with the provided id.</h2>;
  }

  const thisSightings = thisContest.sightings


  thisSightings.sort((a, b) => b.birdList.length - a.birdList.length)

  if (thisSightings.length === 0) {

    return (
      <><h2>{thisContest.name}</h2><p>No users have participated in this contest.</p></>)
  }

  return (
    <>
      <h2>{thisContest.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Osallistuja</th>
            <th>Havainnot</th>
            <th>Pisteet</th>
          </tr>
        </thead>
        <tbody>
          {thisSightings.map((sighting, index) => (
            <Fragment key={index}>
              <tr className="table-primary" onClick={() => toggleRow(index)}>
                <td>{sighting.userId.firstName} {sighting.userId.lastName}</td>
                <td />
                {/* TÄHÄN LASKETAAN KÄYTTÄJÄN PISTEET*/}
                {<td>{sighting.birdList.length}</td>}
              </tr>
              {openRows.includes(index) && (
                <tr>
                  <td />
                  <td colSpan="2">
                    <div>

                      {sighting.birdList.map((bird, idx) => (
                        <div key={idx}>
                          {/* Render subrow content here */}
                          {bird.name} {/* Example property */}
                        </div>
                      ))
                      }
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


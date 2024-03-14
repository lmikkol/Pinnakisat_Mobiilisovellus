import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';

import { useParams } from 'react-router-dom'; // Import useParams from React Router
import { Fragment } from 'react';

const UserScorePage = ({ users }) => {
  const [openRows, setOpenRows] = useState([]);

  const id = useParams().id

  const participatedUsers = users.filter(user => {
    return user.contests.some(contest => contest.id === id);
  });

  const toggleRow = (rowIndex) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(rowIndex)
        ? prevOpenRows.filter((row) => row !== rowIndex)
        : [...prevOpenRows, rowIndex]
    );
  };

  return (
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
          <td >{user.email}</td>
          <td />
          {/* TÄHÄN LASKETAAN KÄYTTÄJÄN PISTEET*/ }
          <td>{13}</td>
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
  )
}

export default UserScorePage;
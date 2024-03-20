import { useState } from 'react';

import { useParams } from 'react-router-dom'; // Import useParams from React Router
import { Fragment } from 'react';

const UserScorePage = ({ contests }) => {
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
      <div style={{ minHeight: '100vh' }}>
        <><h2>{thisContest.name}</h2><p>Kukaan osallistujista ei ole lisännyt havaintoja kilpailulle.</p></>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <h2>{thisContest.name}</h2>
      <p>
        Painamalla osallistujan nimeä voit tarkastella osallistujan havaintoja.
      </p>
      <table style={{ margin: '0 auto', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ minWidth: '150px' }}>Osallistuja</th>
            <th style={{ minWidth: '100px' }}></th>
            <th style={{ minWidth: '80px' }}>Pisteet</th>
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
                  <tr style={{ fontWeight: 'bold' }}>Havainnot:</tr>
                  <td colSpan="2">
                    <div>

                      {sighting.birdList.map((bird, idx) => (
                        <div key={idx} style={{ margin: '0 auto', textAlign: 'left' }}>
                          {bird.name} 
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
    </div>

  )
}

export default UserScorePage;


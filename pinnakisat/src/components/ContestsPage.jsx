import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ContestCard from './ContestCard';
import Stack from 'react-bootstrap/Stack';
import ContestFormModal from './ContestForm';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fi } from 'date-fns/locale/fi';
registerLocale('fi', fi)
import contestService from '../services/contests'


const ContestsPage = ({ contests, handleAddUserToContest, loggedinUser, handleRemoveContestFromUser, handleSubmit, handleInputChange, contestFormData, setContestFormData }) => {


  const [showModal, setShowModal] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleModalClose = () => {
    setShowModal(false);
    setStartDate(null);
    setEndDate(null)
    // setContestFormData(prevFormData => {
    //   return{
    //   ...prevFormData,
    //   name: '',
    //   description: '',
    //   url: ''
    // }})
    // setContestFormData.name('')
    // setContestFormData.description('')
    // setContestFormData('')
    window.location.reload()
    // console.log(contestFormData, 'MITÄS TÄÄLTÄ VITTU LÖYTYY?!?!')
  }
  const handleModalShow = () => setShowModal(true);
  // console.log(startDate, currentDate)

  const sortedContests = contests.sort((a, b) => {
    const statusOrder = {
      "active": 0,
      "archived": 1,
      "upcoming": 2
    };

    const statusA = a.status;
    const statusB = b.status;

    return statusOrder[statusA] - statusOrder[statusB];
  });

  return (
    <div>
      <>
        {
          loggedinUser && loggedinUser.userRole === 0 &&
          <Button variant="primary" onClick={handleModalShow}>
            Lisää kilpailu
          </Button>
        }

        <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Contest Form</Modal.Title>
              </Modal.Header>
              <Modal.Body >
                <form onSubmit={(event) => handleSubmit(event, handleModalClose, () => { setStartDate(null), setEndDate(null); })}>
                  <CustomInput
                    onChange={handleInputChange}
                    value={contestFormData ? contestFormData.name : ''}
                    name="name"
                    type={'text'}
                    placeholder={'Kilpailun nimi'}
                    inputTitle={"Nimi"}
                  />

                  <CustomInput
                    onChange={handleInputChange}
                    value={contestFormData ? contestFormData.description : ''}
                    name="description"
                    type={'text'}
                    placeholder={'Kilpailun tiedot'}
                    inputTitle={"Lisätiedot"}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px' }}>Aloituspäivämäärä</label>
                    <DatePicker
                      selected={startDate}
                      showIcon
                      dateFormat="dd/MM/yyyy"
                      placeholderText='Aloituspäivämäärä'
                      onChange={date => {
                        setStartDate(date)
                        handleInputChange({ target: { name: "date_begin", value: date } })
                      }}
                      maxDate={endDate ? endDate : ""}
                    />
                  </div>


                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px' }}>Päättymispäivämäärä</label>
                    <DatePicker
                      selected={endDate}
                      showIcon
                      dateFormat="dd/MM/yyyy"
                      placeholderText='Päättymispäivämäärä'
                      onChange={date => {
                        setEndDate(date)
                        handleInputChange({ target: { name: "date_end", value: date } })
                      }}
                      minDate={(startDate > currentDate) ? startDate : currentDate}
                    />
                  </div>

                  <CustomInput
                    onChange={handleInputChange}
                    value={contestFormData ? contestFormData.url : ''}
                    name="url"
                    type={'text'}
                    placeholder={'Kilpailun URL'}
                    inputTitle={"URL"}
                  />

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Poistu
                    </Button>
                    <Button variant="primary" type="submit">
                      Tallenna muutokset
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </>

      {/* Stack of ContestCards */}
      <Stack gap={1}>
        <h2>Käynnissä olevat kilpailut</h2>
        {sortedContests.map(contest =>
          contest.status === "active" && (
            <div className="p-2" key={contest.id}>
              <ContestCard contest={contest} handleAddUserToContest={handleAddUserToContest} loggedinUser={loggedinUser} handleRemoveContestFromUser={handleRemoveContestFromUser}
              />
            </div>
          )
        )}
      </Stack>
      <Stack gap={1}>
        <h2>Menneet kilpailut</h2>
        {sortedContests.map(contest =>
          contest.status === "archived" && (
            <div className="p-2" key={contest.id}>
              <ContestCard contest={contest} handleAddUserToContest={handleAddUserToContest} loggedinUser={loggedinUser} handleRemoveContestFromUser={handleRemoveContestFromUser}
              />
            </div>
          )
        )}
      </Stack>
      {loggedinUser?.userRole === 0 && <h2>Tulevat kilpailut</h2>}
      <Stack gap={1}>
        {sortedContests.map(contest => (
          (loggedinUser?.userRole === 0 && contest.status === "upcoming") ? (
            <div className="p-2" key={contest.id}>
              <ContestCard contest={contest} handleAddUserToContest={handleAddUserToContest} loggedinUser={loggedinUser} handleRemoveContestFromUser={handleRemoveContestFromUser} />
            </div>
          ) : null
        ))}
      </Stack>
    </div>
  );
}

export default ContestsPage;


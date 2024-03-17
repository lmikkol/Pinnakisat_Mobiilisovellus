import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ContestCard from './ContestCard';
import Stack from 'react-bootstrap/Stack';
import ContestFormModal from './ContestForm';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';


const ContestsPage = ({ contests, handleAddUserToContest, loggedinUser, handleRemoveContestFromUser, handleSubmit, handleInputChange, contestFormData }) => {
  // const padding = {
  //   padding: 5
  // }
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  console.log(loggedinUser)
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

 
  return (
    <div>
      {/* Button to open the modal */}
      {/* <Link style={padding} to="/add-contest">Lisää kilpailu</Link> */}
      <>
    
 {
    loggedinUser && loggedinUser.userRole === 0  && 
  
      <Button variant="primary" onClick={handleModalShow}>
        Lisää kilpailu
      </Button>
    
  }
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contest Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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

            <CustomInput
              onChange={handleInputChange}
              value={contestFormData ? contestFormData.date_begin : ''}
              name="date_begin"
              type={'date'}
              placeholder={'Kilpailun aloituspäivämäärä'}
              inputTitle={"Aloituspäivämäärä"}
            />

            <CustomInput
              onChange={handleInputChange}
              value={contestFormData ? contestFormData.date_end : ''}
              name="date_end"
              type={'date'}
              placeholder={'Kilpailun päättymispäivämäärä'}
              inputTitle={"Päättymispäivämäärä"}
            />

            <CustomInput
              onChange={handleInputChange}
              value={contestFormData ? contestFormData.url : ''}
              name="url"
              type={'text'}
              placeholder={'Kilpailun URL'}
              inputTitle={"URL"}
            />

            <CustomInput
              onChange={handleInputChange}
              value={contestFormData ? contestFormData.status : '' }
              name="status"
              type={'text'}
              placeholder={'Kilpailun tila'}
              inputTitle={"Tila"}
            />

            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
    
      {/* Stack of ContestCards */}
      <Stack gap={1}>
        {contests.map(contest =>
          <div className="p-2" key={contest.id}>
            <ContestCard contest={contest} handleAddUserToContest={handleAddUserToContest} loggedinUser={loggedinUser} handleRemoveContestFromUser={handleRemoveContestFromUser}
            />
          </div>
        )}
      </Stack>
    </div>
  );
}

export default ContestsPage;


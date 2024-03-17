import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CustomInput from './CustomInput';

const ContestFormModal = ({ handleSubmit, handleInputChange, contestFormData }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <>
      <Button variant="primary" onClick={handleModalShow}>
        Lisää kilpailu
      </Button>

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
  );
}

export default ContestFormModal;
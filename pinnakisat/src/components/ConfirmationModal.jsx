import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ConfirmationModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Vahvista toiminto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tahdotko varmasti poistaa kilpailun?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Peruuta
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Vahvista
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
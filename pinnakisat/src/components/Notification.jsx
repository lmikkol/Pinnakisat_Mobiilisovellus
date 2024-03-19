import { Alert } from 'react-bootstrap'


const Notification = ({ message }) => {
  if (!message.message) {
    return null
  }


  return (
    <div className="d-flex justify-content-center">
      <Alert variant={message.type} className="text-center">
      <span style={{ fontSize: '1.0rem', fontWeight: 'bold', color: '#333' }}>{message.message}</span>
       </Alert>
    </div>
  )
}


export default Notification
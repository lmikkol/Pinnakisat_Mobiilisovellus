import { Alert } from 'react-bootstrap'


const Notification = ({ message }) => {
  if (!message.message) {
    return null
  }


  return (
    <div>
      <Alert variant={message.type}>
       {message.message}
       </Alert>
    </div>
  )
}


export default Notification
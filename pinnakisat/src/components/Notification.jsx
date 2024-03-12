
import { Alert } from 'react-bootstrap'
import Stack from '@mui/material/Stack';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  // the alert is displayed by default

  return (
    <div>
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant={message.type}>
       {message.message}</Alert>
      </Stack>
    </div>
  )
}


export default Notification
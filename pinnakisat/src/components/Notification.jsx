
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  // the alert is displayed by default

  return (
    <div>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{message}</Alert>
      </Stack>
    </div>
  )
}


export default Notification
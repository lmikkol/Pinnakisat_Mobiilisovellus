import CustomInput from "./CustomInput"
import Stack from 'react-bootstrap/Stack';
import '../custom_styles.css';
import { Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, handleLoginInputChange, loginFormData }) => {


  return (
    <div className="centered-container">
    <div>
      <Stack gap={1} className="text-center">

        <h2>Kirjaudu sisään</h2>

        <form className="p-2" onSubmit={handleLogin} noValidate>
          <CustomInput
            onChange={handleLoginInputChange}
            value={loginFormData.email}
            name="email"
            type={'text'}
            placeholder={'nimi@esimerkki.com'}
            inputTitle={"Sähköposti"}
            isRequired={true}
          />

          <CustomInput
            onChange={handleLoginInputChange}
            value={loginFormData.password}
            name="password"
            type={'password'}
            placeholder={'Salasana'}
            inputTitle={"Salasana"}
            isRequired={true}

          />

<Button variant="dark" type="submit">Kirjaudu</Button>

        </form>
      </Stack>
    </div>
    </div>
  )
}

export default LoginForm
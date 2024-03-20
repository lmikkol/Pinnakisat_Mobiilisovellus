import CustomInput from "./CustomInput"
import Stack from 'react-bootstrap/Stack';
import { Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, handleLoginInputChange, loginFormData }) => {


  return (

    <Stack gap={1} className="text-center" >

      <h2>Kirjaudu sisään</h2>

      <form className="p-2" onSubmit={handleLogin} noValidate>
        <CustomInput
          onChange={handleLoginInputChange}
          value={loginFormData.email}
          name="email"
          type={'text'}
          placeholder={'Nimi@esimerkki.com'}
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
        <div className="text-center">
          <Button variant="dark" type="submit">Kirjaudu</Button>
        </div>
      </form>
    </Stack>

  )
}

export default LoginForm
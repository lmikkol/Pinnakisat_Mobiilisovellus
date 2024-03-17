import CustomInput from "./CustomInput"

import Stack from 'react-bootstrap/Stack';


const LoginForm = ({ handleLogin, handleLoginInputChange, loginFormData }) => {


  return (
    <div>
      <Stack gap={1}>

        <h2>Kirjaudu</h2>

        <form className="p-2" onSubmit={handleLogin} noValidate>
          <CustomInput
            onChange={handleLoginInputChange}
            value={loginFormData.email}
            name="email"
            type={'text'}
            placeholder={'Sähköposti'}
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

          <button type="submit">Kirjaudu</button>

        </form>
      </Stack>
    </div>
  )
}

export default LoginForm
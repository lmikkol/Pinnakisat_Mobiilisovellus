import CustomInput from "./CustomInput"
import Stack from 'react-bootstrap/Stack';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

/// JATKA TÄSTÄ

const RegisterForm = ({ handleRegistration, handleRegisterInputChange, registerFormData, setRegisterFormData}) => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setRegisterFormData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordAgain: ''
      });
    };
  }, [setRegisterFormData]);

  // const handleRegisterInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setRegisterFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  return (
    <div>
      <Stack gap={1}>
      <h2>Rekisteröi käyttäjä</h2>
      <form className="p-2" onSubmit={handleRegistration} noValidate>
        <CustomInput
          onChange={handleRegisterInputChange}
          value={registerFormData.email}
          name="email"
          type={'text'}
          placeholder={'Sähköposti'}
          inputTitle={"Sähköposti"}
          isRequired={true}

        />

        <CustomInput
          onChange={handleRegisterInputChange}
          value={registerFormData.firstName}
          name="firstName"
          type={'text'}
          placeholder={'Etunimi'}
          inputTitle={"Etunimi"}
          isRequired={true}

        />

        <CustomInput
          onChange={handleRegisterInputChange}
          value={registerFormData.lastName}
          name="lastName"
          type={'text'}
          placeholder={'Sukunimi'}
          inputTitle={"Sukunimi"}
          isRequired={true}

        />

        <CustomInput
          onChange={handleRegisterInputChange}
          value={registerFormData.password}
          name="password"
          type={'password'}
          placeholder={'Salasana'}
          inputTitle={"Salasana"}
          isRequired={true}

        />

        <CustomInput
        onChange={handleRegisterInputChange}
          value={registerFormData.passwordAgain}
          name="passwordAgain"
          type={'password'}
          placeholder={'Vahvista salasana'}
          inputTitle={"Vahvista salasana"}
          isRequired={true}

        />
        <button type="submit">Rekisteröidy</button>

      </form>
      </Stack>
    </div>
  )
}

export default RegisterForm
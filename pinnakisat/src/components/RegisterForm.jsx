import CustomInput from "./CustomInput"



/// JATKA TÄSTÄ

const RegisterForm = ({ handleRegistration, handleRegisterInputChange, registerFormData }) => {

  return (
    <div>
      <h2>Rekisteröi käyttäjä</h2>
      <form onSubmit={handleRegistration}>
        <CustomInput
          onChange={handleRegisterInputChange}
          value={registerFormData.email}
          name="email"
          type={'text'}
          placeholder={'Sähköposti'}
          inputTitle={"Sähköposti"}
        />

        <CustomInput
          onChange={handleRegisterInputChange}
          value={registerFormData.firstName}
          name="firstName"
          type={'text'}
          placeholder={'Etunimi'}
          inputTitle={"Etunimi"}
        />

        <CustomInput
          onChange={handleRegisterInputChange}
          value={registerFormData.lastName}
          name="lastName"
          type={'text'}
          placeholder={'Sukunimi'}
          inputTitle={"Sukunimi"}
        />

        <CustomInput
          onChange={handleRegisterInputChange}
          value={registerFormData.password}
          name="password"
          type={'password'}
          placeholder={'Salasana'}
          inputTitle={"Salasana"}
        />


        <button type="submit">Rekisteröidy</button>

      </form>
    </div>
  )
}

export default RegisterForm
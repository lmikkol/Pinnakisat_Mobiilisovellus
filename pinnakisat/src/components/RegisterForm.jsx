import CustomInput from "./CustomInput"



/// JATKA TÄSTÄ

const RegisterForm = ({handleLogin, handleLoginInputChange, loginFormData }) => {
 
    return(
    <form onSubmit={handleLogin}>
          <CustomInput
            onChange={handleLoginInputChange}
            value={loginFormData.email}
            name="email"
            type={'text'}
            placeholder={'Sähköposti'}
            inputTitle = {"Sähköposti"}
          />
  
          <CustomInput
            onChange={handleLoginInputChange}
            value={loginFormData.password}
            name="password"
            type={'password'}
            placeholder={'Salasana'}
            inputTitle={"Salasana"}
          />
          <button type="submit">Kirjaudu</button>
  
        </form>
    )
  }

  export default RegisterForm
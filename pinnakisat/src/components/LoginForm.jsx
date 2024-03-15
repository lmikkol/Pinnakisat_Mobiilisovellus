import CustomInput from "./CustomInput"

const LoginForm = ({handleLogin, handleLoginInputChange, loginFormData }) => {
 
    return(
      <div>
        <h2>Kirjaudu</h2>
      
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
        </div>
    )
  }

  export default LoginForm
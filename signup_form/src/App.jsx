import React, { useState } from 'react'
import axios from 'axios'
import FormHeader from './component/FormHeader';
import FormFields from './component/FormFields';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => 
  {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    const {username, email, password, confirmPassword } = formData

    if (!username) 
    {
      setError('Käyttäjänimi on pakollinen');
      return;
    }
    //katotaa ettei sähköpostiosoite ole tyhjä
    if (!email) 
    {
      setError('Sähköpostiosoite on pakollinen');
      return;
    }

    //katotaa ettei salasana kenttä oo tyhjä
    if (!password || !confirmPassword) 
    {
      setError('Salasana kenttä on tyhjä')
      return;
    }
    //verrataa salasanoi, onks ne samat
    if (password !== confirmPassword) {
      setError('Salasanat eivät täsmää')
      return
    }

    //katotaa onks sähköposti käytös
    try 
    {
      const existingUserResponse = await axios.get(`http://localhost:3001/users?email=${email}`)
      if (existingUserResponse.data.length > 0) {
        setError('Sähköpostiosoite on jo käytössä')
        return
      }

      //lähettää lomakkee tiedot, jos kaikki ok
      const response = await axios.post('http://localhost:3001/users', formData)
      console.log(response.data)

      //tyhjä error
      setError('')
    } 
    catch (error) 
    {
      console.error('Virhe rekisteröinnissä:', error)
      setError('Virhe rekisteröinnissä. Yritä uudelleen.')
    }
  }

  
  return (
    <div>
      <FormHeader />
      <div className="app-container">
        <h2>Rekisteröidy</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <FormFields formData={formData} handleChange={handleChange} />
          <button type="submit">Tallenna</button>
        </form>
        
      </div>
    </div>
  )
}
export default RegistrationForm


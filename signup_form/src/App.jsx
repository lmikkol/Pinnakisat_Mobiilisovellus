import React, { useState } from 'react'
import axios from 'axios'
import FormHeader from './component/FormHeader'
import FormFields from './component/FormFields'

const RegistrationForm = () => 
{
  const [formData, setFormData] = useState
  ({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

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

    //tarkistetaan että käyttäjänimi on vähintään 3 merkkiä pitkä
    if (username.length < 3) 
    {
      setError('Käyttäjänimen tulee olla vähintään 3 merkkiä pitkä')
      return
    }

    //katotaa ettei sähköpostiosoite ole tyhjä
    if (!email) 
    {
      setError('Sähköpostiosoite on pakollinen')
      return
    }

    //tarkistetaan että salasanassa on vähintään 6 merkkiä
    if (password.length < 6) 
    {
      setError('Salasanan tulee olla vähintään 6 merkkiä pitkä')
      return
    }

    //tarkastetaan että salasanassa on vähintää yks iso krijain
    if (!/[A-Z, Å, Ä, Ö]/.test(password)) 
    {
      setError('Salasanassa tulee olla vähintään yksi iso kirjain')
      return
    }

    //tarkastetaan että salasana sisältää vähintää yhen numeron
    if (!/[0-9]/.test(password))
    {
      setError('Salasanassa tulee olla vähintään yksi numero')
      return
    }
  
    //katotaa ettei salasana kenttä oo tyhjä
    if (!password || !confirmPassword) 
    {
      setError('Salasana kenttä on tyhjä')
      return
    }
    //verrataa salasanoi, onks ne samat
    if (password !== confirmPassword) {
      setError('Salasanat eivät täsmää')
      return
    }

    try 
    {
      //katotaa onks käyttäjänimi jo käytös
      const existingUserResponse1 = await axios.get(`http://localhost:3001/users?username=${username}`)
      if (existingUserResponse1.data.length > 0) {
        setError('Käyttäjänimi on jo käytössä')
        return
      }
      
      //katotaa onks sähköosti jo käytös
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

      //Käyttäjän luomisen onnistuessa ilmestyy viesti ja sivu latautuu uudelleen 
      setMessage('Käyttäjä luotu onnistuneesti, sivu latautuu uudelleen 3 sekunnin kuluttua')
      setTimeout(function()
      {
        location.reload()
      }, 3000)

    } 
    catch (error) 
    {
      //error kun käyttäjää ei pystytä luomaan
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
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <FormFields formData={formData} handleChange={handleChange} />
          <button type="submit">Tallenna</button>
        </form>
        
      </div>
    </div>
  )
}
export default RegistrationForm
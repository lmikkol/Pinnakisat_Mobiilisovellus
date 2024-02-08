import React from 'react'

const FormFields = ({ formData, handleChange }) => {
  return (
    <>
      <label>
        Luo käyttäjänimi:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br /> <br/>
      <label>
        Syötä sähköpostiosoite:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br /> <br/>
      <label>
        Luo salasana:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br /> <br/>
      <label>
        Vahvista salasana:
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
      </label>
      <br /> <br/>
    </>
  )
}

export default FormFields

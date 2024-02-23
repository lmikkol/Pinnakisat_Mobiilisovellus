import CustomInput from "./CustomInput"

const ContestForm = ({handleSubmit, handleInputChange, contestFormData }) => {
 
  return(
  <form onSubmit={handleSubmit}>
        <CustomInput
          onChange={handleInputChange}
          value={contestFormData.name}
          name="name"
          type={'text'}
          placeholder={'Kilpailun nimi'}
          inputTitle = {"Nimi"}
        />

        <CustomInput
          onChange={handleInputChange}
          value={contestFormData.description}
          name="description"
          type={'text'}
          placeholder={'Kilpailun tiedot'}
          inputTitle={"Lisätiedot"}
        />

        <CustomInput
          onChange={handleInputChange}
          value={contestFormData.date_begin}
          name="date_begin"
          type={'date'}
          placeholder={'Kilpailun aloituspäivämäärä'}
          inputTitle={"Aloituspäivämäärä"}
        />

        <CustomInput
          onChange={handleInputChange}
          value={contestFormData.date_end}
          name="date_end"
          type={'date'}
          placeholder={'Kilpailun päättymispäivämäärä'}
          inputTitle={"Päättymispäivämäärä"}
        />

        <CustomInput
          onChange={handleInputChange}
          value={contestFormData.url}
          name="url"
          type={'text'}
          placeholder={'Kilpailun URL'}
          inputTitle={"URL"}
        />

        <CustomInput
          onChange={handleInputChange}
          value={contestFormData.status}
          name="status"
          type={'text'}
          placeholder={'Kilpailun tila'}
          inputTitle={"Tila"}
        />

        <button type="submit">Tallenna</button>

      </form>
  )
}
  export default ContestForm
import { useState, useEffect } from 'react'
import CustomInput from './CustomInput'

const DynamicInputForm = ({ list }) => {
  const contestInit = {
    userId: '',
    contestId: '',
    kilometers: '',
    spoded: '',
    birds: []
}


const [contestFormData, setContestFormData] = useState(contestInit)    
const [formData, setFormData] = useState(Array(list.length).fill());

useEffect(() => {
    // Handle form submission here, using contestFormData state
    console.log(contestFormData);
  }, [contestFormData]);


const handleSelectChange = (index, event) => {
    const newFormData = [...formData];
    newFormData[index] = event.target.value;
    setFormData(newFormData);
  };

  const handleSecInputChange = (event) => {
    const { name, value } = event.target;
    setContestFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //EI NÄIN VAAN LUO UUSI TIETUE AIEMPIEN DATOJEN POHJALTA
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData, "TESTIN")
    console.log(list)
    let birdObject = {addedBird: {}, date: ''}
    let addingBirds = []
    list.map((bird, idx) => {
        birdObject.addedBird = bird
        birdObject.date = formData[idx]
        addingBirds.push(birdObject)
        birdObject = {addedBird: {}, date: ''}
    })

    console.log(addingBirds)
    const newObject = {
        userId: 1,
        contestId: 2,
        kilometers: contestFormData.kilometers,
        spoded: contestFormData.spoded,
        birds: addingBirds
    }
    addingBirds = []
    console.log("NEW", newObject)
  
  };


return (
  <form onSubmit={handleSubmit}>
    {list.map((item, index) => (
      <div key={index}>
        <label>{list[index].label}</label>
        <input
          type="text"
          value={formData[index]}
          onChange={(event) => handleSelectChange(index, event)}
        />
      </div>
    ))}

<CustomInput
      onChange={handleSecInputChange}
      value={contestFormData.kilometers}
      name="kilometers"
      type={'text'}
      placeholder={'kilometrit'}
      inputTitle = {"kilometrit"}
    />

    <CustomInput
      onChange={handleSecInputChange}
      value={contestFormData.spoded}
      name="spoded"
      type={'text'}
      placeholder={'spoded'}
      inputTitle={"spoded"}
    />


    <button type="submit">Submit</button>
  </form>
);
}
export default DynamicInputForm;
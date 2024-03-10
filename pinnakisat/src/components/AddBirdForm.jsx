import { useState } from 'react'
import SightingsForm from './SightingsForm';
import DynamicInputForm from './DynamicInputForm';
const AddBirdForm = () => {

    const [selectedOption, setSelectedOption] = useState([]);
    const handler = (event) => {
        event.preventDefault()
        console.log(selectedOption, ' was selected')
        setSelectedOption(selectedOption)
      }

   

    return(
        <div>
        <SightingsForm handler={handler} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
        <h2>Valitut linnut</h2>
      {selectedOption.length === 0 ? (
        <p>Select an option</p>
      ) : (
        <div>
            <DynamicInputForm list = {selectedOption}></DynamicInputForm>

       </div>
      )
      }
              </div>

      )
    }


export default AddBirdForm
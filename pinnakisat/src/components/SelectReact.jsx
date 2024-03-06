import React from 'react';
import Select from 'react-select';

const SelectReact = ({addSighting, selectedOption, setSelectedOption, options, sightings}) => {
    
    return(
    <div className='App'>
        <h2>Havainnot</h2>
        
      <form onSubmit={addSighting}>
        <Select
        defaultValue={selectedOption}
        isMulti
        onChange={setSelectedOption}
        options={options}
        />
        <button>Submit</button>
        </form>
      </div>
    )
}

export default SelectReact

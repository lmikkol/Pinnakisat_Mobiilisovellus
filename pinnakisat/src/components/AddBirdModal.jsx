import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'
import CustomInput from './CustomInput'

import Select from 'react-select';

import {
  groupedOptions, sorsalinnut, kanalinnut, kuikkalinnut, uikkulinnut, ulappalinnut, pelikaanilinnut, haikaralinnut,
  päiväpetolinnut, jalohaukkalinnut, kurkilinnut, rantalinnut, hietakanalinnut, kyyhkylinnut,
  käkilinnut, pöllölinnut, kehrääjälinnut, kirskulinnut, säihkylinnut, tikkalinnut, varpuslinnut
} from '../data/birds'



function AddBirdModal({ showModal, setShowModal, contest, user, setSighting, handleSightingAdd }) {
  const handleCloseModal = () => setShowModal(false);




  const [selectedOption, setSelectedOption] = useState([]);
  const handler = (event) => {
    event.preventDefault()
    console.log(selectedOption, ' was selected')
    setSelectedOption(selectedOption)
  }


  const contestInit = {
    userId: '',
    contestId: '',
    kilometers: '',
    spontaneous: '',
    region: '',
    hours: '',
    birds: []
  }


  const [contestFormData, setContestFormData] = useState(contestInit)
  const [formData, setFormData] = useState(Array(selectedOption.length).fill());

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
    console.log(contest[0].id, "TEESTTT")
    event.preventDefault();
    console.log(formData, "TESTIN")
    console.log(selectedOption)
    let birdObject = { name: '', date: '' }
    let addingBirds = []
    selectedOption.map((bird, idx) => {
      birdObject.name = bird.fi
      birdObject.date = formData[idx]
      addingBirds.push(birdObject)
      birdObject = { name: '', date: '' }
    })

    console.log(addingBirds)
    const newObject = {
      userId: user.id,
      contestId: contest,
      kilometers: contestFormData.kilometers,
      spontaneous: contestFormData.spontaneous,
      region: contestFormData.region,
      hours: contestFormData.hours,
      birds: addingBirds
    }
    setSighting(newObject)
    handleSightingAdd(event)
    addingBirds = []
    console.log("NEW", newObject)

  };



  return (

    <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable" role="document">

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Lisää havainto </Modal.Title>
          </Modal.Header>
          <div className="modal-body">

            <Modal.Body>
              <div className="form-group">
                <label htmlFor="formControlSelectBird">Valitse linnut</label>
                <div id="formControlSelectBird">
                  <Select
                    value={selectedOption}
                    isMulti
                    onChange={setSelectedOption}
                    options={groupedOptions}
                    getOptionLabel={(option) => option.fi}
                    getOptionValue={(option) => option.fi}
                    closeMenuOnSelect={false}
                  />
                </div>
              </div>

            
              {selectedOption.length === 0 ? (
                <p>Valitse vähintään yksi lintu</p>
              ) : (
                <div>
                 

                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="formControlAddDates">Lisää havainnon päivämäärä</label>
                      <div id="formControlAddDates">
                        {selectedOption.map((item, index) => (
                          <div key={index}>
                            <CustomInput
                              onChange={(event) => handleSelectChange(index, event)}
                              value={formData[index]}
                              name="kilometers"
                              type={'text'}
                              placeholder={'kilometrit'}
                              inputTitle={selectedOption[index].label} />
                          </div>
                        ))}
                      </div>
                      </div>

                      <div className="form-group">
                      <label htmlFor="formControlAddDates">Lisää kuljetut kilometrit</label>
                      <div id="formControlAddDates">
                      <CustomInput
                        onChange={handleSecInputChange}
                        value={contestFormData.kilometers}
                        name="kilometers"
                        type={'text'}
                        placeholder={'kilometrit'}
                        inputTitle={"kilometrit"} />
                          </div>
                      </div>

                      <div className="form-group">
                      <label htmlFor="formControlAddDates">Lisää spontaanit havainnot</label>
                      <div id="formControlAddDates">
                      <CustomInput
                        onChange={handleSecInputChange}
                        value={contestFormData.spontaneous}
                        name="spontaneous"
                        type={'text'}
                        placeholder={'spondet'}
                        inputTitle={'spondet'} />
                          </div>
                      </div>

                      <div className="form-group">
                      <label htmlFor="formControlAddDates">Lisää paikkakunta</label>
                      <div id="formControlAddDates">
                      <CustomInput
                        onChange={handleSecInputChange}
                        value={contestFormData.region}
                        name="region"
                        type={'text'}
                        placeholder={'region'}
                        inputTitle={'region'} />
                          </div>
                      </div>

                      <div className="form-group">
                      <label htmlFor="formControlAddDates">Retkeillyt tunnit</label>
                      <div id="formControlAddDates">
                      <CustomInput
                        onChange={handleSecInputChange}
                        value={contestFormData.hours}
                        name="hours"
                        type={'text'}
                        placeholder={'hours'}
                        inputTitle={'hours'} />
                          </div>
                      </div>
                   
                    </form>
                  </div>
         

              )
              }
            </Modal.Body>
          </div>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Peruuta
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Lisää havainto
            </Button>



          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AddBirdModal;
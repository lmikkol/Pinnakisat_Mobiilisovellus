import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'
import CustomInput from './CustomInput'
import sightingService from '../services/sightings';
import Select from 'react-select';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

//Näitä käyttämättömiä ei saa poistaa
import {
  groupedOptions, sorsalinnut, kanalinnut, kuikkalinnut, uikkulinnut, ulappalinnut, pelikaanilinnut, haikaralinnut,
  päiväpetolinnut, jalohaukkalinnut, kurkilinnut, rantalinnut, hietakanalinnut, kyyhkylinnut,
  käkilinnut, pöllölinnut, kehrääjälinnut, kirskulinnut, säihkylinnut, tikkalinnut, varpuslinnut
} from '../data/birds'


function AddBirdModal({ showModal, setShowModal, contests, contestId, setContests, user, setNotification, alertTimer }) {

  const contestInit = {
    contestId: '',
    kilometers: '',
    spontaneous: '',
    region: '',
    hours: '',
    birds: []
  }
  const [selectedBird, setSelectedBird] = useState([]);
  const [contestFormData, setContestFormData] = useState(contestInit)
  const [birdsDate, setBirdsDate] = useState(Array(selectedBird.length).fill());
  const [limitDates, setLimitDates] =useState({})
  const handleCloseModal = () => {
    setShowModal(false)
    setContestFormData(contestInit);
    setBirdsDate(Array(selectedBird.length).fill())
    setSelectedBird([])
  }

  useEffect(() => {
    const thisContest = contests.find(contest => contest.id === contestId)
    console.log(thisContest)
    if (thisContest) {
      setLimitDates(
        {
          "start": thisContest.date_begin,
          "end": thisContest.date_end

        }
      )
    
      const userSighting = thisContest.sightings.find(sighting => sighting.userId.id === user.id && sighting.contestId === contestId);
      if (userSighting) {
        setBirdsDate(userSighting.birdList.map(bird => bird.date));
        setSelectedBird(groupedOptions.reduce((acc, curr) => {
          curr.options.forEach(option => {
            if (userSighting.birdList.some(bird => bird.name === option.label)) {
              acc.push(option);
            }
          });
          return acc;
        }, []));
        setContestFormData({
          contestId: contestId,
          kilometers: userSighting.distanceKM,
          spontaneous: userSighting.spontaneous,
          region: userSighting.region,
          hours: userSighting.hours,
          birds: userSighting.birdList
        });
      } else {
        setSelectedBird([]);
        setContestFormData(contestInit);
      }
    }
  }, [showModal]);


const handleSelectChange = (index, event) => {
  const newbirdsDate = [...birdsDate];
  newbirdsDate[index] = event.target.value;
  setBirdsDate(newbirdsDate);
};

const handleSecInputChange = (event) => {
  const { name, value } = event.target;
  setContestFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};

const handleSubmit = (event) => {
  event.preventDefault();
  let birdObject = { name: '', date: '' }
  let addingBirds = []

  selectedBird.map((bird, idx) => {
    birdObject.name = bird.fi
    birdObject.date = birdsDate[idx]
    addingBirds.push(birdObject)
    birdObject = { name: '', date: '' }
  })

  let newObject = {
    userId: user.id,
    contestId: contestId,
    kilometers: contestFormData.kilometers,
    spontaneous: contestFormData.spontaneous,
    region: contestFormData.region,
    hours: contestFormData.hours,
    birds: addingBirds
  }

  sightingService.createSighting(newObject).then(returnedContest => {
    returnedContest.sightings.map(sighting => {
      sighting.contestId === returnedContest.id ? sighting.userId = {"firstName": user.firstName, "lastName": user.lastName, "id": user.id} : sighting
    })

    setContests(contests => 
      contests.map(contest => 
        contest.id === returnedContest.id ? returnedContest : contest
      )
    );
    setContestFormData(contestInit);
    setSelectedBird([]);
    setBirdsDate(Array(selectedBird.length).fill());
    handleCloseModal();
    setNotification({
      type: "success",
      message: "Havainnon lisääminen onnistui!"
    });
    alertTimer();
  })
  .catch(error => {
    console.error('Error creating sighting:', error);
    setNotification({
      type: "warning",
      message: `Havainnon lisäyksessä tapahtui ongelma, yritä uudelleen.`
    });
    alertTimer();
  }); 

  addingBirds = []

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
                  value={selectedBird}
                  isMulti
                  onChange={setSelectedBird}
                  options={groupedOptions}
                  getOptionLabel={(option) => option.fi}
                  getOptionValue={(option) => option.fi}
                  closeMenuOnSelect={false}
                />
              </div>
            </div>


            {selectedBird.length === 0 ? (
              <p>Valitse vähintään yksi lintu</p>
            ) : (
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="formControlAddDates">Lisää havainnon päivämäärä</label>
                    <div id="formControlAddDates" style={{ marginBottom: '0px' }}>
                      {selectedBird.map((item, index) => (
                       <div key={index}>
                       <label style={{ marginRight: '5px' }}>{selectedBird[index].label}</label>
                     <DatePicker
                       selected={birdsDate[index] || new Date()}
                       onChange={date => handleSelectChange(index, { target: { name: "kilometers", value: date } })}
                       showIcon
                       dateFormat="dd/MM/yyyy"
                       placeholderText={'Havainnon päivämäärä'}
                       minDate={limitDates.start}
                       maxDate={limitDates.end}
                     />
                   </div>
                      ))}
                    </div>
                    <br />

                  </div>

                  <div className="form-group">
                    <label htmlFor="formControlAddDates" style={{ marginBottom: '0px' }}>Lisää kuljetut kilometrit</label>
                    <div id="formControlAddDates">
                      <CustomInput
                        onChange={handleSecInputChange}
                        value={contestFormData.kilometers}
                        name="kilometers"
                        type={'text'}
                        placeholder={'kilometrit'}
                        // inputTitle={"kilometrit"}
                         />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="formControlAddDates" style={{ marginBottom: '0px' }}>Lisää spontaanit havainnot</label>
                    <div id="formControlAddDates">
                      <CustomInput
                        onChange={handleSecInputChange}
                        value={contestFormData.spontaneous}
                        name="spontaneous"
                        type={'text'}
                        placeholder={'spondet'}
                        // inputTitle={'spondet'} 
                        />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="formControlAddDates" style={{ marginBottom: '0px' }}>Lisää paikkakunta</label>
                    <div id="formControlAddDates">
                      <CustomInput
                        onChange={handleSecInputChange}
                        value={contestFormData.region}
                        name="region"
                        type={'text'}
                        placeholder={'region'}
                        // inputTitle={'region'} 
                        />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="formControlAddDates" style={{ marginBottom: '0px' }}>Retkeillyt tunnit</label>
                    <div id="formControlAddDates">
                      <CustomInput
                        onChange={handleSecInputChange}
                        value={contestFormData.hours}
                        name="hours"
                        type={'text'}
                        placeholder={'hours'}
                        // inputTitle={'hours'} 
                        />
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
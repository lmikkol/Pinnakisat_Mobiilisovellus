import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'
import CustomInput from './CustomInput'
import sightingService from '../services/sightings';
import Select from 'react-select';

import {
  groupedOptions, sorsalinnut, kanalinnut, kuikkalinnut, uikkulinnut, ulappalinnut, pelikaanilinnut, haikaralinnut,
  päiväpetolinnut, jalohaukkalinnut, kurkilinnut, rantalinnut, hietakanalinnut, kyyhkylinnut,
  käkilinnut, pöllölinnut, kehrääjälinnut, kirskulinnut, säihkylinnut, tikkalinnut, varpuslinnut
} from '../data/birds'


function AddBirdModal({ showModal, setShowModal, contests, contestId, user }) {

  const [isModalOpen, setIsModalOpen] = useState(false); // New state variable to track modal open/close

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

  const handleCloseModal = () => {
    setShowModal(false)
    setContestFormData(contestInit);
    setBirdsDate(Array(selectedBird.length).fill())
    setSelectedBird([])
    setIsModalOpen(false) // Update isModalOpen state when closing modal
  }



  useEffect(() => {
    //   if (showModal) {
    const thisContest = contests.find(contest => contest.id === contestId)
    console.log(contests, contestId)
    console.log("NO LÖYTY VITTU", thisContest)

    if (thisContest) {
      const userSighting = thisContest.sightings.find(sighting => sighting.userId === user.id && sighting.contestId === contestId);
      if (userSighting) {
        console.log("LÖYTYY havainto KÄYTTÄJÄLTÄ", userSighting)
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
//console.log("user ennen",user)

//EI NÄIN VAAN LUO UUSI TIETUE AIEMPIEN DATOJEN POHJALTA
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
    console.log(returnedContest)
    // const contestExists = user.sightings.some(sighting => sighting.contest === newObject.contestId);
    // ////console.log(user, newObject.contestId)

    // if (!contestExists) {
    //   //console.log("EI OLE OLEMASSA",returnedUser )
    //   user.sightings.push({
    //     contest: newObject.contestId,
    //     distanceKM: newObject.kilometers,
    //     spontaneous: newObject.spontaneous,
    //     region: newObject.region,
    //     hours: newObject.hours,
    //     birdList: newObject.birds
    //   });
    // } else {
    //   //console.log("ON OLEMASSA", returnedUser)
    //   user.sightings = returnedUser.sightings.map(sighting => {
    //     if (sighting.contest === contestFormData.contestId) {
    //       let updatedSighting = returnedUser.sightings.filter(sighting => sighting.contest === newObject.contestId)[0]
    //       //console.log(updatedSighting, "UPDATED SIGHTING")
    //       return {
    //         contest: updatedSighting.contest,
    //         distanceKM: updatedSighting.distanceKM,
    //         spontaneous: updatedSighting.spontaneous,
    //         region: updatedSighting.region,
    //         hours: updatedSighting.hours,
    //         birdList: updatedSighting.birdList
    //       };
    //     }
    //     return sighting;
    //  }

    //   setUser(user)
    setIsModalOpen(false); // Update isModalOpen state after form submission
    //    }

    setContestFormData(contestInit);
    setSelectedBird([]);
    setBirdsDate(Array(selectedBird.length).fill())
    // setAllUsers(prevUsers => {
    //   const userIndex = prevUsers.findIndex(u => u.id === returnedUser.id);
    //   if (userIndex !== -1) {
    //     const updatedUsers = [...prevUsers];
    //     updatedUsers[userIndex] = returnedUser;
    //     return updatedUsers;
    //   }
    //   return prevUsers;
    // });
  })

  addingBirds = []

};



return (

  <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-scrollable" role="document">

      <Modal show={showModal} onHide={handleCloseModal} onShow={() => setIsModalOpen(true)}>
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
                    <div id="formControlAddDates">
                      {selectedBird.map((item, index) => (
                        <div key={index}>
                          <CustomInput
                            onChange={(event) => handleSelectChange(index, event)}
                            value={birdsDate[index] ? birdsDate[index] : ''}
                            name="kilometers"
                            type={'text'}
                            placeholder={'päivämäärä'}
                            inputTitle={selectedBird[index].label} />
                        </div>

                      ))}
                    </div>
                    <br />

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
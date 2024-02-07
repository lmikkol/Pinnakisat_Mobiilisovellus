import { useState } from 'react'
import './App.css'
import NavigationBar from './components/NavBar'
import Header from './components/Header'
import Contests from './components/Contests'
import ContestForm from './components/ContestForm'
import axios from 'axios'
import { render } from 'react-dom'

const App = () => {

  const [contests, setContests] = useState([{
    id: "123",
    name: "Talvipihapinnakisa 2021 - 2022",
    description: "Jo 16. perättäinen talvipihapinnakisa. PiLYn toiminta-alueella...",
    date_begin: "2021-12-01",
    date_end: "2022-02-28",
    url: "http://www.pily.fi/event/talvipihapinnakisa-ja-talvikauden-lajien-laskenta-pirkanmaalla-alkavat-tiistaina-1-12-osallistu-sinakin/",
    location_list: "0",
    status: "archived"
  },
  {
    id: "456",
    name: "Keskustoripinnakisa 2021 - 2022",
    description: "Jo 16. perättäinen talvipihapinnakisa. PiLYn toiminta-alueella...",
    date_begin: "2021-12-01",
    date_end: "2022-02-28",
    url: "http://www.pily.fi/event/talvipihapinnakisa-ja-talvikauden-lajien-laskenta-pirkanmaalla-alkavat-tiistaina-1-12-osallistu-sinakin/",
    location_list: "0",
    status: "published"
  }]
  )
  const [newContest, setNewContest] = useState('')

  // const addContest = (event) => {
  //   event.preventDefault()
  //   const contestObject = {
  //     name: newContest
  //   };

  //   console.log('happening')
  //   setContests(contests.concat(contestObject))
  //   setNewContest('')
  // }


  const handleContestChange = (event) => {
    console.log(event.target.value)
    setNewContest(event.target.value)
  }

  const handler = () => {
    console.log(' was pressed')
  }

  return (

    <div>
      <Header header={Header} />
      <NavigationBar handler={handler} />
      <h2>Kilpailut</h2>
      <div>
        {contests.map(contest =>
          <Contests key={contest.id} contest={contest} />
        )}
      </div>
    </div>
  )
}




export default App

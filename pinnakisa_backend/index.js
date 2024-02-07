const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

let contests = [
    {
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

app.get('/', (request, response) => {
    response.send('<h1>Kilpailut<h1>')
})

app.get('/api/contests', (request, response) => {
    response.json(contests)
})

app.get('/api/contests/:id', (request, response) => {
    const id = request.params.id
    const contest = contests.find(contest => contest.id === id)

    if (contest) {
        response.json(contest)
    }else {
        response.status(404).end
    }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
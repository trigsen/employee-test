const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3001

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.json())
app.use(cors())

const employees = [
    {
        id: 1,
        name: 'John',
        status: 'Working',
        img: 'https://picsum.photos/200'
    },
    {
        id: 2,
        name: 'Jack',
        status: 'Working',
        img: 'https://picsum.photos/200'
    },
    {
        id: 3,
        name: 'Sheli',
        status: 'Working',
        img: 'https://picsum.photos/200'
    },
    {
        id: 4,
        name: 'Eitan',
        status: 'Working',
        img: 'https://picsum.photos/200'
    },
]

app.get('/users', (req, res) => {
    res.send(employees);
})

app.post('/users/:id', (req, res) => {
    const index = employees.findIndex((obj => obj.id === +req.params.id));
    employees[index].status = req.body.status
    res.send(employees);
})

app.post('/users', (req, res) => {
    const username = req.body.name

    employees.push({
        id: employees.length + 1,
        img: 'https://picsum.photos/200',
        status: 'Working',
        name: username,
    })

    res.send(employees);
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
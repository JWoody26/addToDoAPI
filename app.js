const express = require('express')
const app = express()
const port = 3000


let toDoList = [{
    title: "James"
},
{
    title: "Woody"
}
];


app.use(express.json())


app.listen(port, () => {
    console.log(`App Running port ${port}`)
})

app.post('/toDoListAdd', (req, res) => {
    toDoList.push(req.body)
    res.send(toDoList)
})

app.get('/toDoList', (req, res) =>{
    res.send(toDoList)
})

app.delete('/toDoListDelete', (req, res) => {
    toDoList = [];
    res.send(toDoList)
})



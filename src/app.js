//import Question from './model/Question'

const express = require('express')
const app = express()
const port = 3000
const Question = require('./model/Question.js')

app.get('/', (req, res) => {
    let question = new Question('Hello World?', 1)
    question.ask()
    res.send(question)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


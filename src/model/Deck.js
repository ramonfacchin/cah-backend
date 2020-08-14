const shuffle = require('../util/Shuffler')

class Deck {
    constructor(id, name, questions, answers, description) {
        this.questions = questions ? questions : []
        this.answers = answers ? answers : []
        this.id = id
        this.name = name
        this.description = description
        this.discardedQuestions = []
        this.discardedAnswers = []
    }

    shuffleQuestions = () => {
        shuffle(this.questions)
        return this.questions
    }

    shuffleAnswers = () => {
        shuffle(this.answers)
        return this.answers
    }

    drawQuestion = () => {
        let question = this.questions.pop()
        if (!question) {
            this.questions = this.discardedQuestions
            this.discardedQuestions = []
            this.shuffleQuestions()
            question = this.questions.pop()
        }
        return question
    }

    drawAnswer = () => {
        let answer = this.answers.pop()
        if (!answer) {
            this.answers = this.discardedAnswers
            this.discardedAnswers = []
            this.shuffleAnswers()
            answer = this.answers.pop()
        }
        return answer
    }

    discardQuestion = (question) => {
        this.discardedQuestions.push(question)
        return question
    }

    discardAnswer = (answer) => {
        this.discardedAnswers.push(answer)
        return answer
    }
}

module.exports = Deck
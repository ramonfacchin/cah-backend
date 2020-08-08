class Deck {
    constructor(id, name, questions, answers, description) {
        this.questions = questions
        this.answers = answers
        this.id = id
        this.name = name
        this.description = description
        this.discardedQuestions = []
        this.discardedAnswers = []
    }

    shuffleQuestions = () => {
        this.shuffleArray(this.questions)
        return this.questions
    }

    shuffleAnswers = () => {
        this.shuffleArray(this.answers)
        return this.answers
    }

    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); //WTF, JS?!
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }
}

module.exports = Deck
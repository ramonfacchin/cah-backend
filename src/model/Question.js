class Question {
    constructor(id, sentence, expectedAnswers) {
        this.id = id
        this.sentence = sentence
        this.expectedAnswers = expectedAnswers && expectedAnswers > 0 ? expectedAnswers : 1
    }

    ask = () => {
        return this.sentence;
    }
}

module.exports = Question
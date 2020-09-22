const assert = require('assert')
const Deck = require('../src/model/Deck')
const Question = require('../src/model/Question')
const Answer = require('../src/model/Answer')

const questions = [
    { id : 1, sentence : 'Question1?'},
    { id : 2, sentence : 'Question2?'},
    { id : 3, sentence : 'Question3?'},
    { id : 4, sentence : 'Question4?'},
    { id : 5, sentence : 'Question5?'},
    { id : 6, sentence : 'Question6?'},
]

const answers = [
    { id : 1, sentence : 'Question1?'},
    { id : 2, sentence : 'Question2?'},
    { id : 3, sentence : 'Question3?'},
    { id : 4, sentence : 'Question4?'},
    { id : 5, sentence : 'Question5?'},
    { id : 6, sentence : 'Question6?'},
]

describe('Deck', () => {
    it('should have id', () => {
        let deck = new Deck(1, 'Brazil')
        assert.ok(deck)
        assert.ok(deck.id)
        assert.strictEqual(1, deck.id)
    })
    it('should have name', () => {
        let deck = new Deck(1, 'Brazil')
        assert.ok(deck)
        assert.ok(deck.name)
        assert.strictEqual('Brazil', deck.name)
    })
    it('should have questions', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0))
        assert.ok(deck)
        assert.ok(deck.questions)
        assert.ok(deck.questions.length === 6)
    })
    it('should shuffle questions', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0))
        let ids = deck.questions.map(question => question.id)
        deck.shuffleQuestions()
        let ids2 = deck.questions.map(question => question.id)
        assert.notStrictEqual(ids, ids2)
    })
    it('should have answers', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        assert.ok(deck)
        assert.ok(deck.answers)
        assert.ok(deck.answers.length === 6)
    })
    it('should shuffle answers', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        let ids = deck.answers.map(answer => answer.id)
        deck.shuffleQuestions()
        let ids2 = deck.answers.map(answer => answer.id)
        assert.notStrictEqual(ids, ids2)
    })
    it('should draw questions', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        let question = deck.popQuestion()
        assert.strictEqual(6, question.id)
        assert.strictEqual(5, deck.questions.length)
    })
    it('should draw answers', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        let answer = deck.popAnswer()
        assert.strictEqual(6, answer.id)
        assert.strictEqual(5, deck.answers.length)
    })
    it('should discard questions', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        assert.strictEqual(0, deck.discardedQuestions.length)
        const question = { id: 1, sentence: 'QuestionN?', expectedAnswers: 1 }
        deck.discardQuestion(question)
        assert.strictEqual(1, deck.discardedQuestions.length)
        assert.strictEqual(question, deck.discardedQuestions[0])
    })
    it('should discard answers', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        assert.strictEqual(0, deck.discardedAnswers.length)
        const answer = { id: 1, sentence: 'AnswerN'}
        deck.discardAnswer(answer)
        assert.strictEqual(1, deck.discardedAnswers.length)
        assert.strictEqual(answer, deck.discardedAnswers[0])
    })
    it('should shuffle discarded questions into questions pile when drawing with no questions left', () => {
        let deck = new Deck(1, 'Brazil')
        questions.forEach(question => {
            deck.discardQuestion(question)
        })
        assert.strictEqual(0, deck.questions.length)
        assert.strictEqual(6, deck.discardedQuestions.length)
        let question = deck.popQuestion()
        assert.strictEqual(5, deck.questions.length)
        assert.strictEqual(0, deck.discardedQuestions.length)
    })
    it('should shuffle discarded answers into answer pile when drawing with no answers left', () => {
        let deck = new Deck(1, 'Brazil')
        answers.forEach(answer => {
            deck.discardAnswer(answer)
        })
        assert.strictEqual(0, deck.answers.length)
        assert.strictEqual(6, deck.discardedAnswers.length)
        let answer = deck.popAnswer()
        assert.strictEqual(5, deck.answers.length)
        assert.strictEqual(0, deck.discardedAnswers.length)
    })
})
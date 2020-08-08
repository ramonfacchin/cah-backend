var assert = require('assert')
var Deck = require('../src/model/Deck')
var Question = require('../src/model/Question')
var Answer = require('../src/model/Answer')

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
        assert.equal(1, deck.id)
    })
    it('should have name', () => {
        let deck = new Deck(1, 'Brazil')
        assert.ok(deck)
        assert.ok(deck.name)
        assert.equal('Brazil', deck.name)
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
        assert.notEqual(ids, ids2)
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
        assert.notEqual(ids, ids2)
    })
    it('should draw questions', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        let question = deck.drawQuestion()
        assert.equal(6, question.id)
        assert.equal(5, deck.questions.length)
    })
    it('should draw answers', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        let answer = deck.drawAnswer()
        assert.equal(6, answer.id)
        assert.equal(5, deck.answers.length)
    })
    it('should discard questions', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        assert.equal(0, deck.discardedQuestions.length)
        const question = { id: 1, sentence: 'QuestionN?', expectedAnswers: 1 }
        deck.discardQuestion(question)
        assert.equal(1, deck.discardedQuestions.length)
        assert.equal(question, deck.discardedQuestions[0])
    })
    it('should discard answers', () => {
        let deck = new Deck(1, 'Brazil', questions.slice(0), answers.slice(0))
        assert.equal(0, deck.discardedAnswers.length)
        const answer = { id: 1, sentence: 'AnswerN'}
        deck.discardAnswer(answer)
        assert.equal(1, deck.discardedAnswers.length)
        assert.equal(answer, deck.discardedAnswers[0])
    })
})
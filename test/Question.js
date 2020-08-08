var assert = require('assert')
var Question = require('../src/model/Question')

describe('Question', () => {
    it('should have id', () => {
        let question = new Question(1, 'Who came first, egg or chicken?')
        assert.ok(question)
        assert.ok(question.id)
        assert.equal(1, question.id)
    })
    it('should have sentence', () => {
        let question = new Question(1, 'Who came first, egg or chicken?')
        assert.ok(question)
        assert.ok(question.sentence)
        assert.equal('Who came first, egg or chicken?', question.sentence)
    })
    it('should ask question', () => {
        let question = new Question(1, 'Who came first, egg or chicken?')
        assert.ok(question.ask())
    })
    it('should expect at least 1 answer', () => {
        let question = new Question(1, 'Who came first, egg or chicken?')
        assert.ok(question.expectedAnswers > 0)
    })
    it('should ignore negative expected answers', () => {
        let question = new Question(1, 'Who came first, egg or chicken?', -1)
        assert.ok(question.expectedAnswers > 0)
    })
})
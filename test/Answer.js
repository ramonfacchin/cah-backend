const assert = require('assert')
const Answer = require('../src/model/Answer')

describe('Answer', () => {
    it('should have id', () => {
        let answer = new Answer(1, 'Who came first, egg or chicken?')
        assert.ok(answer)
        assert.ok(answer.id)
        assert.equal(1, answer.id)
    })
    it('should have sentence', () => {
        let answer = new Answer(1, 'Who came first, egg or chicken?')
        assert.ok(answer)
        assert.ok(answer.sentence)
        assert.equal('Who came first, egg or chicken?', answer.sentence)
    })
})
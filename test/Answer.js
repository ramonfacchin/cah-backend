const assert = require('assert')
const Answer = require('../src/model/Answer')

describe('Answer', () => {
    it('should have id', () => {
        let answer = new Answer(1, 'Chicken!')
        assert.ok(answer)
        assert.ok(answer.id)
        assert.strictEqual(1, answer.id)
    })
    it('should have sentence', () => {
        let answer = new Answer(1, 'Chicken!')
        assert.ok(answer)
        assert.ok(answer.sentence)
        assert.strictEqual('Chicken!', answer.sentence)
    })
})
const assert = require('assert')
const Player = require('../src/model/Player')
const Game = require('../src/model/Game')
const Deck = require('../src/model/Deck')

const testGame = new Game(1, new Deck(1, 'Deck 1', [], [
    {
        id : 1,
        sentence : 'Sentence1'
    },
    {
        id : 2,
        sentence : 'Sentence2'
    },
    {
        id : 3,
        sentence : 'Sentence3'
    },
    {
        id : 4,
        sentence : 'Sentence4'
    }
], 'Deck 1 Description'))

describe('Player', () => {
    it('should draw answers', () => {
        let player = new Player('Player 1', 1, false, testGame)
        assert.ok(player)
        assert.ok(player.answers.length == 0)
        player.drawAnswer()
        assert.ok(player.answers.length == 1)
        player.drawAnswer()
        assert.ok(player.answers.length == 2)
        player.drawAnswer()
        assert.ok(player.answers.length == 3)
        player.drawAnswer()
        assert.ok(player.answers.length == 4)
        player.drawAnswer()
        assert.ok(player.answers.length == 4)
    })
})
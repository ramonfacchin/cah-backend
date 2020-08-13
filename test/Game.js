const assert = require('assert')
const Game = require('../src/model/Game')
const Player = require('../src/model/Player')
const STATUS = require('../src/model/enumerations/GameStatus')

describe('Game', () => {
    it('should have id', () => {
        let game = new Game(1, {})
        assert.ok(game)
        assert.ok(game.id)
        assert.equal(1, game.id)
    })
    it('should have initial state GAME_SETUP', () => {
        let game = new Game(1, {})
        assert.equal(game.status, 'GAME_SETUP')
    })
    it('should allow players to enter the game', () => {
        let game = new Game(1, {})
        assert.equal(game.players.length, 0)
        assert.equal(game.joinPlayer(new Player('Player 1', 1, game, {})), 1)
        assert.equal(game.players.length, 1)
        assert.equal(game.joinPlayer(new Player('Player 2', 2, game, {})), 2)
        assert.equal(game.players.length, 2)
    })
    it('should not allow more than 8 players to enter the game', () => {
        let game = new Game(1, {})
        assert.equal(game.players.length, 0)
        for (let i = 1; i < 9; i++) {
            assert.equal(game.joinPlayer(new Player('Player '+i, i, game, {})), i)
            assert.equal(game.players.length, i)
        }
        assert.throws(() => {game.joinPlayer(new Player('Player 9', 9, game, {}))}, Error, 'There are 8 players in this game already.')
        assert.equal(game.players.length, 8)
    })
    it('should not allow same player to enter the game twice', () => {
        let game = new Game(1, {})
        assert.equal(game.players.length, 0)
        assert.equal(game.joinPlayer(new Player('Player 1', 1, game, {})), 1)
        assert.equal(game.players.length, 1)
        assert.throws(() => {game.joinPlayer(new Player('Player 1', 1, game, {}))}, Error, 'A player cannot join the game twice.')
        assert.equal(game.players.length, 1)
    })
    it('should not allow game to start with less than 4 players', () => {
        let game = new Game(1, {})
        game.joinPlayer(new Player('Player 1', 1, game, {}))
        game.joinPlayer(new Player('Player 2', 2, game, {}))
        game.joinPlayer(new Player('Player 3', 3, game, {}))
        assert.throws(() => {game.start()}, Error, 'Cannot start a game with less than 4 players.')
        game.joinPlayer(new Player('Player 4', 4, game, {}))
        assert.doesNotThrow(() => {game.start()}, Error)
    })
})
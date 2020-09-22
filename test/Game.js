const assert = require('assert')
const Game = require('../src/model/Game')
const Player = require('../src/model/Player')
const STATUS = require('../src/model/enumerations/GameStatus')
const Deck = require('../src/model/Deck')
const Answer = require('../src/model/Answer')

const generateAnswers = (amountOfAnswers) => [...Array(amountOfAnswers).keys()].map( key => new Answer(key, 'Answer ' + key))

describe('Game', () => {
    it('should have id', () => {
        let game = new Game(1, {})
        assert.ok(game)
        assert.ok(game.id)
        assert.strictEqual(1, game.id)
    })
    it('should have initial state GAME_SETUP', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        assert.strictEqual(game.status, 'GAME_SETUP')
    })
    it('should allow players in', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        assert.strictEqual(game.players.length, 0)
        assert.strictEqual(game.joinPlayer(new Player('Player 1', 1, false, game, {})), 1)
        assert.strictEqual(game.players.length, 1)
        assert.strictEqual(game.joinPlayer(new Player('Player 2', 2, false, game, {})), 2)
        assert.strictEqual(game.players.length, 2)
    })
    it('should not allow more than 8 players in', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        assert.strictEqual(game.players.length, 0)
        for (let i = 1; i < 9; i++) {
            assert.strictEqual(game.joinPlayer(new Player('Player '+i, i, false, game, {})), i)
            assert.strictEqual(game.players.length, i)
        }
        assert.throws(() => {game.joinPlayer(new Player('Player 9', 9, false, game, {}))}, Error, 'There are 8 players in this game already.')
        assert.strictEqual(game.players.length, 8)
    })
    it('should not allow same player in twice', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        assert.strictEqual(game.players.length, 0)
        assert.strictEqual(game.joinPlayer(new Player('Player 1', 1, false, game, {})), 1)
        assert.strictEqual(game.players.length, 1)
        assert.throws(() => {game.joinPlayer(new Player('Player 1', 1, false, game, {}))}, Error, 'A player cannot join the game twice.')
        assert.strictEqual(game.players.length, 1)
    })
    it('should not start with less than 4 players', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        game.joinPlayer(new Player('Player 1', 1, false, game, {}))
        game.joinPlayer(new Player('Player 2', 2, false, game, {}))
        game.joinPlayer(new Player('Player 3', 3, false, game, {}))
        assert.throws(() => {game.start()}, Error, 'Cannot start a game with less than 4 players.')
        game.joinPlayer(new Player('Player 4', 4, false, game, {}))
        assert.doesNotThrow(() => {game.start()}, Error)
    })
    it('should start only if status is GAME_SETUP or GAME_OVER', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        game.status = STATUS.COLLECT_ANSWERS
        assert.throws(() => {game.start()}, Error)
        game.status = STATUS.ROUND_END
        assert.throws(() => {game.start()}, Error)
        game.status = STATUS.ROUND_START
        assert.throws(() => {game.start()}, Error)
        game.status = STATUS.VOTING
        assert.throws(() => {game.start()}, Error)
        game.status = STATUS.SHOW_QUESTION
        assert.throws(() => {game.start()}, Error)
    })
    it('should reject incoming players when status is not GAME_SETUP', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        game.status = STATUS.COLLECT_ANSWERS
        assert.throws(() => {game.joinPlayer(new Player('Player 1', 1, false, game, {}))}, Error)
        game.status = STATUS.ROUND_END
        assert.throws(() => {game.joinPlayer(new Player('Player 2', 2, false, game, {}))}, Error)
        game.status = STATUS.ROUND_START
        assert.throws(() => {game.joinPlayer(new Player('Player 3', 3, false, game, {}))}, Error)
        game.status = STATUS.VOTING
        assert.throws(() => {game.joinPlayer(new Player('Player 4', 4, false, game, {}))}, Error)
        game.status = STATUS.SHOW_QUESTION
        assert.throws(() => {game.joinPlayer(new Player('Player 5', 5, false, game, {}))}, Error)
    })
    it('should sort players when game starts', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        game.joinPlayer(new Player('Player 1', 1, false, game, {}))
        game.joinPlayer(new Player('Player 2', 2, false, game, {}))
        game.joinPlayer(new Player('Player 3', 3, false, game, {}))
        game.joinPlayer(new Player('Player 4', 4, false, game, {}))
        const playerOrderBeforeSort = game.players.map(player => {return player.id}).join('')
        game.start()
        const playerOrderAfterSort = game.players.map(player => {return player.id}).join('')
        assert.notStrictEqual(playerOrderAfterSort, playerOrderBeforeSort)
    })
    it('should select a czar when a round starts', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        game.joinPlayer(new Player('Player 1', 1, false, game, {}))
        game.joinPlayer(new Player('Player 2', 2, false, game, {}))
        game.joinPlayer(new Player('Player 3', 3, false, game, {}))
        game.joinPlayer(new Player('Player 4', 4, false, game, {}))
        assert.ok(!game.czar)
        game.start()
        assert.ok(game.czar)
    })
    it('should deal 10 answers to each player before first round start ', () => {
        let game = new Game(1, new Deck(1, 'Deck 1', [], generateAnswers(50), 'Deck 1 Description'))
        game.joinPlayer(new Player('Player 1', 1, false, game, {}))
        game.joinPlayer(new Player('Player 2', 2, false, game, {}))
        game.joinPlayer(new Player('Player 3', 3, false, game, {}))
        game.joinPlayer(new Player('Player 4', 4, false, game, {}))
        game.start()
        assert.strictEqual(game.players[0].answers.length, 10)
        assert.strictEqual(game.players[1].answers.length, 10)
        assert.strictEqual(game.players[2].answers.length, 10)
        assert.strictEqual(game.players[3].answers.length, 10)
    })
})
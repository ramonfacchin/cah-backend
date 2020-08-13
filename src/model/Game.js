const STATUS = require('./enumerations/GameStatus')

class Game {

    constructor(id, deck) {
        this.id = id
        this.deck = deck
        this.players = []
        this.czar = null
        this.round = 0
        this.pointsToWin = 7
        this.status = STATUS.GAME_SETUP
    }

    joinPlayer = (player) => {
        if (this.players.length < 8) {
            if (this.players.filter(pl => pl.id === player.id).length > 0) {
                throw new Error('A player cannot join the game twice.')
            }
            return this.players.push(player)
        } else {
            throw new Error('There are 8 players in this game already.')
        }
    }
    
    start = () => {
        if (this.players.length > 3) {
            if (this.status && this.status !== STATUS.GAME_OVER) {
                throw new Error('Game already started.')
            }
            this.startRound()
        } else {
            throw new Error('Cannot start a game with less than 4 players.')
        }
    }

    startRound = () => {
        this.status = STATUS.ROUND_START
        this.round += 1
    }
}

module.exports = Game
const shuffle = require('../util/Shuffler')
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
        this.roundState = {}
    }

    joinPlayer = (player) => {
        if (this.status !== STATUS.GAME_SETUP) {
            throw new Error('Game already started.')
        }
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
            if (this.status && this.status !== STATUS.GAME_OVER && this.status !== STATUS.GAME_SETUP) {
                throw new Error('Game already started.')
            }
            const playerOrder = this.players.map(player => player.id).join('')
            while (playerOrder == this.players.map(player => player.id).join('')) {
                // makes sure that players will never play in the same order that they joined the game
                this.players = shuffle(this.players)
            }
            
            this.players.forEach(player => {
                Array(10).fill().forEach( key => {
                    player.drawAnswer()
                })
            })
            this.startRound()
        } else {
            throw new Error('Cannot start a game with less than 4 players.')
        }
    }

    startRound = () => {
        if (this.status !== STATUS.GAME_OVER && this.status !== STATUS.GAME_SETUP && this.status != STATUS.ROUND_END) {
            throw new Error('Cannot start a new round unless previous one ended or the game just started.')
        }
        this.status = STATUS.ROUND_START
        this.czar = this.players[(this.round % this.players.length)]
        this.round += 1
    }

    showQuestion = () => {
        if (this.status !== STATUS.ROUND_START) {
            throw new Error('Cannot show question before/after round starts.')
        }
        this.status = STATUS.SHOW_QUESTION
        this.roundState = {
            question : this.deck.popQuestion(),
            answers : []
        }
    }

    collectAnswers = () => {
        if ((this.status !== STATUS.SHOW_QUESTION) || !this.roundState.question) {
            throw new Error('Cannot collect answers without a question.')
        }
        this.status = STATUS.COLLECT_ANSWERS
    }

    collectAnswer = (answer, player) => {
        if (this.status !== STATUS.COLLECT_ANSWERS) {
            throw new Error('Not expecting any answers to collect.')
        }
        if (this.roundState.answers
            .filter(chosenAnswer => {
                return chosenAnswer.player.id == player.id && chosenAnswer.answers.length == this.question.expectedAnswers
            })[0]) {
                throw new Error('This player already answered.')
        }
        let chosenAnswer = this.roundState.answers.filter(chosenAnswer => {return chosenAnswer.player.id == player.id})
        if (chosenAnswer) {
            chosenAnswer.answers.push(answer)
        } else {
            this.roundState.answers.push({
                player : player,
                answers : [answer]
            })
        }
    }

    checkAnswerCollectionFinished = () => {
        return this.status === STATUS.COLLECT_ANSWERS &&
            this.roundState.answers &&
            !this.roundState.answers.filter(chosenAnswer => {return chosenAnswer.answers.length !== this.question.expectedAnswers})[0] &&
            this.roundState.answers.length == this.players.length
    }

    vote = () => {
        if (this.status !== STATUS.COLLECT_ANSWERS) {
            throw new Error('Voting is not allowed without collecting answers before.')
        }
        if (!this.checkAnswerCollectionFinished()) {
            throw new Error('There are still answers to be collected before voting.')
        }
        this.status = STATUS.VOTING
    }

    endRound = (bestAnswer) => {
        if (this.status !== STATUS.VOTING) {
            throw new Error('Best answer cannot be chosen when not voting.')
        }
        let winner = bestAnswer.player
        this.players.filter(player => {return player.id == winner.id}).forEach(player => {
            player.points+=1
        })
        this.roundState.answers.forEach(chosenAnswer => {
            player.answers.map(answer => player.answers.indexOf(answer)).forEach(index => {
                let answer = player.answers[index]
                player.answers.splice(index, 1)
                this.deck.discardAnswer(answer)
            })

        })
        this.deck.discardQuestion(this.roundState.question)
        this.roundState = {}
        this.status = STATUS.ROUND_END
    }
}

module.exports = Game
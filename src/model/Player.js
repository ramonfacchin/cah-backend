class Player {
    constructor(name, id, host, game, skin) {
        this.name = name
        this.id = id
        this.answers = []
        this.points = 0
        this.skin = skin
        this.game = game
        this.host = host ? true : false
    }

    drawAnswer = () => {
        let answer = this.game.deck.popAnswer()
        answer ? this.answers.push(answer) : {}
    }
}

module.exports = Player
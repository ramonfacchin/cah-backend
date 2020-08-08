class Player {
    constructor(name, id, game, skin) {
        this.name = name
        this.id = id
        this.answers = []
        this.points = 0
        this.skin = skin
        this.game = game
    }
}

module.exports = Player
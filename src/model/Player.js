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
}

module.exports = Player
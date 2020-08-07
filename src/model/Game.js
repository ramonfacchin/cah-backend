class Game {

    const status = ['GAME_SETUP','ROUND_START','SHOW_QUESTION','COLLECT_ANSWERS','VOTING','ROUND_END','GAME_OVER']

    constructor(id, deck) {
        this.id = id
        this.deck = deck
        this.players = []
        this.czar = null
        this.round = 0
        this.pointsToWin = 7
    }
}
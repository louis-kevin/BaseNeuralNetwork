class Population {
    constructor(quantityOfPlayers) {
        this.quantityOfPlayers = quantityOfPlayers
        this.players = []
    }

    createPopulation() {
        for (let i = 0; i < this.quantityOfPlayers; i++) {
            this.players.push(new Player())
        }
    }

    bestScore() {
        let bestScore = 0
        let bestColor = ''

        this.forEach(player => {
            if(bestScore < player.score){
                bestColor = player.color
                bestScore = player.score
            }
        })

        return {
            score: bestScore,
            color: bestColor
        }
     }

    display() {
        return this.map(player => player.dead ? player : player.display())
    }

    createNextGeneration() {
        let bestPlayer = this.findWinnerPlayer()

        let players = []
        let quantityOfPlayers = this.quantityOfPlayers

        if (bestPlayer) {
            players.push(bestPlayer)
            quantityOfPlayers--
        }

        for (let i = 0; i < quantityOfPlayers; i++) {
            players.push(new Player(this.getParentPlayer()))
        }

        this.players = players

        return this
    }

    findWinnerPlayer() {
        let bestPlayer
        this.forEach(player => {
            if (!bestPlayer && player.score > 0) {
                bestPlayer = player;
                return
            }
            if (!bestPlayer) {
                return
            }
            if (player.score > bestPlayer.score) {
                bestPlayer = player;
            }
        });

        return bestPlayer
    }

    getParentPlayer() {
        let sumOfScores = 0
        this.forEach(player => (sumOfScores += player.score))
        let random = Math.random * sumOfScores
        let runningSum = 0

        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            runningSum += player.score
            if (runningSum > random) {
                return player
            }
        }

        return false
    }

    allPlayersDead() {
        return this.players.filter(player => !player.dead).length <= 0
    }

    train(nextBall) {
        return this.map(player => player.dead ? player : player.calculateByBall(nextBall))
    }

    map(func) {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i] = func(this.players[i])
        }
        return this;
    }

    forEach(func) {
        for (let i = 0; i < this.players.length; i++) {
            func(this.players[i])
        }
        return this;
    }
}
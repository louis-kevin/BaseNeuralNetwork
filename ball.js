let velocity = 5

class Ball {
    constructor() {
        this.height = 10
        this.width = 10
        this.velocity = velocity
        this.y = 0
        this.x = Math.floor(Math.random() * height)
        this.dead = false
        this.hit = false
    }

    display() {
        this.y += this.velocity
        fill(255)
        ellipse(this.x, this.y, this.height, this.width);
    }

    reachToTheEnd() {
       return this.y >= height
    }

    collision(player) {
        let beginWidthPlayer = player.x
        let endWidthPlayer = player.x + player.width
        let beginHeightPlayer = player.y

        let beginWidthBall = this.x - (this.width / 2)
        let endWidthBall = this.x + (this.width / 2)
        let endHeightBall = this.y + (this.height / 2)

        let isInWidth = beginWidthBall >= beginWidthPlayer && endWidthBall <= endWidthPlayer
        let isInHeight = endHeightBall >= beginHeightPlayer

        return isInWidth && isInHeight
    }

    interactWithPlayers(population) {
        if(this.y <= height - 40) return population

        this.dead = true

        let hit = false

        population = population.map(player => {
            if (player.dead) return player

            let colission = this.collision(player)

            if(!colission){
                player.dead = true
                this.dead = true

                return player
            }

            player.addScore()

            if(velocity < 5 && !hit){
                velocity += 0.08 
                hit = true
            }

            return player
        })

        if(population.allPlayersDead()){
            velocity = 5
        }

        return population
    }
}
class Ball {
    constructor(){
        this.height = 10
        this.width = 10
        this.velocity = 5
        this.y = 0
        this.x = Math.floor(Math.random() * height)
    }

    display(){
        this.y += this.velocity
        ellipse(this.x, this.y, this.height, this.width);
    }

    reachToTheEnd(){
        return this.y >= height
    }

    collision(player){
        let beginWidthPlayer = player.x
        let endWidthPlayer = player.x + player.width
        let beginHeightPlayer = player.y

        let beginWidthBall = this.x - (this.width/2)
        let endWidthBall = this.x + (this.width/2)
        let endHeightBall = this.y + (this.height/2)

        let isInWidth = beginWidthBall >= beginWidthPlayer && endWidthBall <= endWidthPlayer 
        let isInHeight = endHeightBall >= beginHeightPlayer

        return isInWidth && isInHeight
    }
}
class Ball {
    constructor(x){
        this.height = 10
        this.width = 10
        this.velocity = 6
        this.y = 0
        this.x = x
    }

    display(){
        this.y += this.velocity
        fill(255)
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
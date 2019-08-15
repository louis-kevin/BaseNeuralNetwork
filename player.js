function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


class Player {
    constructor(parentPlayer) {
        this.width = 130
        this.height = 20

        this.velocity = 5

        this.x = width / 2 - this.width / 2
        this.y = height - 40

        this.color = getRandomColor()

        this.neural = new RedeNeural(4, 8, 2, parentPlayer ? parentPlayer.neural : null)
        this.score = 0

        this.dead = false
    }

    display() {
        if (this.dead) return this
        fill(this.color)
        rect(this.x, this.y, this.width, this.height);
        return this
    }

    moveToRight() {
        if (this.x + this.width + this.velocity <= width) {
            this.x += this.velocity
            return
        }

        this.x = width - this.width
        return this
    }

    moveToLeft() {
        if (this.x <= 0) {
            return
        }
        
        this.x -= this.velocity
        return this
    }

    addScore(point = 1) {
        this.velocity += 0.02
        this.score += point
        return this
    }

    removeScore(point = 1) {
        this.score -= point
        return this
    }

    calculateByBall(ball) {
        const result = this.neural.predict([this.x - this.width / 2, this.x + this.width / 2, ball.x, ball.y])

        if (result[0] >= 0.75) {
            this.moveToLeft()
        }

        if (result[1] >= 0.75) {
            this.moveToRight()
        }

        return this
    }
}
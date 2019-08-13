function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

class Player {
    constructor() {
        this.width = 130
        this.height = 20

        this.velocity = 5

        this.x = width/2 - this.width /2
        this.y = height - 40

        this.randomColor = getRandomColor()

        this.neural = new RedeNeural(4, 8, 2)


    }

    moveToRight() {
        if(this.x + this.width + this.velocity <= width){
            this.x += this.velocity
            return
        }
        
        this.x = width - this.width
    }

    moveToLeft() {
        if(this.x <= 0){
            return
        }
        this.x -= this.velocity
    }

    display() {
        fill(this.randomColor)
        rect(this.x, this.y, this.width, this.height);
    }

    train(ball){
        const result = this.neural.predict([this.x, this.y, ball.x, ball.y])

        if(result[0] >= 0.70){
            this.moveToLeft()
        }
    
        if(result[1] >= 0.70){
            this.moveToRight()
        }
    }
}
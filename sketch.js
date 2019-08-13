let train = true
let dataset
let neural
let players = []
const quantityOfPlayers = 1000
let balls = []
let games = []
let timeToCreateBall = 3000
let timeOfLastBall = 0
let frameRateNumber = 60
let score = 0


function setup(){
    createCanvas(700, 500);
    frameRate(frameRateNumber);

    scoreElem = createDiv('Score = 0');
    scoreElem.position(20, 20);
    scoreElem.id = 'score';
    scoreElem.style('color', 'white');


    for(let i = 0; i <= quantityOfPlayers; i++){
        games.push({
            player: new Player,
            balls: []
        })
    }
}

function draw(){ 
    background(0);
    noStroke()
    handleBalls()
    handlePlayer()
    trainNeural()
}

function handleBalls(balls){
    if(frameCount % frameRateNumber == 0){
        timeOfLastBall -= 1000
    }
    if(timeOfLastBall <= 0){
        timeOfLastBall = timeToCreateBall
        const ball = new Ball()
        games.forEach(game => game.balls.push(ball))
    }

   games = games.map(game => {
    game.balls = game.balls.filter(ball => {
        ball.display()
        if(ball.collision(game.player)){
           
            return false
        }

        return !ball.reachToTheEnd()
    })
    return game
   })
}

function handlePlayer(){
    games.forEach(game => game.player.display())
}

function trainNeural(){
    
    games.forEach(game => {
        if(game.balls.length <= 0){
            return
        }
        let nextBall = game.balls[0]
        game.player.train(nextBall)
    })
}
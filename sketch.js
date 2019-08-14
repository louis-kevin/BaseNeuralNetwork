const quantityOfPlayers = 10
let players = []
let deadPlayers = []
let timeToCreateBall = 2000
let timeOfLastBall = 0
let frameRateNumber = 60
let winnerPlayer
let balls = []


function setup(){
    createCanvas(700, 500)
    frameRate(frameRateNumber)

    addPlayers()
}

function draw(){ 
    background(0)
    noStroke()
    handleBalls()
    handlePlayer()
    trainNeural()
}

function addPlayers(){
    if(winnerPlayer) players.push(winnerPlayer)

    for(let i = 0; i <= quantityOfPlayers; i++){
        players.push(new Player(getParent()))
    }

    deadPlayers = []
}

function getParent(){
    if(!deadPlayers.length || !winnerPlayer) return null

    let rand = Math.floor(Math.random * winnerPlayer.score);
    let runningSum = 0

    for (let i = 0; i< deadPlayers.length; i++) {
      runningSum+= deadPlayers[i].score;
      if (runningSum > rand) {
        return deadPlayers[i]
      }
    }
}

function handleBalls(){
    if(frameCount % 30 == 0){
        timeOfLastBall -= 1000
    }

    if(timeOfLastBall <= 0){
        timeOfLastBall = timeToCreateBall
        let ballPosition = Math.floor(Math.random() * height)
        balls.push(new Ball(ballPosition)) 
    }

    balls.map(ball => ball.display())


    if(balls.length <= 0){
        return
    }

    let ballDead = false

    let nextBall = balls[0]

    for(let i = 0; i < players.length; i++){
        if(players[i].dead){
            continue
        }

        if(nextBall.collision(players[i])){
            players[i].addScore()
            ballDead = true
            continue
        }
    }

    if(ballDead || nextBall.reachToTheEnd()){
        for(let i = 0; i < players.length; i++){
            if(players[i].dead){
                continue
            }
           players[i].dead = !nextBall.collision(players[i])
        }
        balls.splice(0, 1)
    }

    if(allPlayersDead()){
        findWinnerPlayer()
        balls = []
        timeOfLastBall = timeToCreateBall
        deadPlayers = players
        players = []
        addPlayers()
    }
}

function findWinnerPlayer(){
    players.forEach(player => {
        if(!winnerPlayer && player.score > 0){
            winnerPlayer = player
            return
        }
        if(!winnerPlayer){
            return
        }
        if(player.score > winnerPlayer.score){
            winnerPlayer = player
        }
    })
}

function printScores(){
    players.forEach(player => {
       console.log(player.score)
    })
}

function allPlayersDead(){
    return players.filter(player => !player.dead).length <= 0
}

function handlePlayer(){
    for(let i = 0; i < players.length; i++){
        players[i].display()
    }
}

function trainNeural(){
    if(balls.length <= 0){
        return
    }

    let nextBall = balls[0]

    for(let i = 0; i < players.length; i++){
        players[i].calculateByBall(nextBall)
    }
}

function iteratePlayers(func){
    let total = players.length
    for(let i = 0; i < total; i++){
        func(i)
    }
}
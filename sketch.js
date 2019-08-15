const quantityOfPlayers = 700
let population
const timeToCreateBall = 2000
let timeOfLastBall = 0
const frameRateNumber = 60
let balls = []
let scoreElem
let generationCountElem
let generation = 1


function setup() {
    createCanvas(700, 500)
    frameRate(frameRateNumber)

    scoreElem = createDiv('Best Score: 0');
    scoreElem.position(20, 50);
    scoreElem.id = 'score';
    scoreElem.style('color', 'white');

    generationCountElem = createDiv('Generation: 1');
    generationCountElem.position(20, 20);
    generationCountElem.id = 'generationCount';
    generationCountElem.style('color', 'white');

    population = new Population(quantityOfPlayers)
    population.createPopulation()
}

function draw() {
    background(0)
    noStroke()
    handleBalls()
    if (population.allPlayersDead()) {
        balls = []
        timeOfLastBall = timeToCreateBall
        population.createNextGeneration()
        generationCountElem.html('Generation: ' + generation++)
    }
    population.display()
    showScore()
}

function handleCreationOfBalls() {
    if (frameCount % frameRateNumber == 0) {
        timeOfLastBall -= 1000
    }

    if (timeOfLastBall <= 0) {
        timeOfLastBall = timeToCreateBall
        balls.push(new Ball())
    }
}

function displayBalls() {
    balls.map(ball => ball.display())
}

function handleBalls() {
    handleCreationOfBalls()
    displayBalls()

    const nextBall = balls[0]

    if (!nextBall) return

    population.train(nextBall)

    population = nextBall.interactWithPlayers(population)

    if (nextBall.dead) {
        balls.splice(0, 1)
    }
}

function showScore(){
    const best = population.bestScore()

    scoreElem.html('Best Score: ' + best.score)
    scoreElem.style('color', best.color)
}
let train = true
let dataset
let neural

function setup(){
    createCanvas(500, 500);
    background(0);

    neural = new RedeNeural(2, 3, 1)

    dataset = {
        inputs: [
            [1, 1],
            [1, 0],
            [0, 1],
            [0, 0]
        ],
        outputs: [
            [0],
            [1],
            [1],
            [0]
        ]
    }
    
}

function draw(){ 
    if(train){
        for(let i = 0; i < 10000; i++) {
            let index = floor(random(4))
            neural.train(dataset.inputs[index], dataset.outputs[index])
        }

        if(neural.predict([0, 0])[0] < 0.04 && neural.predict([1, 0])[0] > 0.98){
            train = false
            console.log('terminou')
        }
    }
}
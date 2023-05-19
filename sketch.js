let quantityOfElements = 100;

let perceptron;
let points = new Array(quantityOfElements);
let trainningIndex = 0;

let positionsControlP1 = {x: 0, y: 0};
let positionsControlP2 = {x: 0, y: 0};

let sum = 0;
let DoNewTest = true;
let debug = true;

function setup() {
    createCanvas(550,550);

    perceptron = new Perceptron(3);
    
    for (let i = 0; i < points.length; i++) {
        points[i] = new Point(random(1,-1), random(1,-1));
    }
}

function draw(){
    background(255);

    points.forEach((pt) =>{
        pt.show();
    })

    noStroke();

    points.forEach((pt) =>{
        const guess = perceptron.guess([pt.x, pt.y, pt.bias]);

        if(guess ==  pt.label){
            fill(0,255,0);
        } else{
            fill(255,0,0);
        }

        ellipse(pt.getPixelX(), pt.getPixelY(), 15, 15);
    })
    
    if(drawLine()){
        trainSinglePoint();
    }
    else{
        if(sum == quantityOfElements + 1 && DoNewTest){
            DoNewTest = false;
            newTest();
        }
    }
}

function drawLine(){
    stroke(0);
    const p1 = new Point(-1, f(-1));
    const p2 = new Point(1, f(1));
    line(p1.getPixelX(), p1.getPixelY(), p2.getPixelX(), p2.getPixelY());

    stroke(0, 0, 255);
    const guessP1 = new Point(-1, perceptron.guessY(-1));
    const guessP2 = new Point(1, perceptron.guessY(1));
    line(guessP1.getPixelX(), guessP1.getPixelY(), guessP2.getPixelX(), guessP2.getPixelY());

    if(positionsControlP1.x === guessP1.getPixelX() && positionsControlP1.y === guessP1.getPixelY() && positionsControlP2.x === guessP2.getPixelX() && positionsControlP2.y === guessP2.getPixelY()){
        sum++;

        if(sum > quantityOfElements){
            return false;
        }
        else{
            return true;
        }
    }
    else{
        sum = 0;
        
        positionsControlP1.x = guessP1.getPixelX();
        positionsControlP1.y = guessP1.getPixelY();
        positionsControlP2.x = guessP2.getPixelX();
        positionsControlP2.y = guessP2.getPixelY();

        if(debug){
            console.log("Training...");
            
            p1.debug();
            p2.debug();
        
            guessP1.debug();
            guessP2.debug();
        }

        return true;
    }
}

function trainSinglePoint(){
    const point = points[trainningIndex];
    const inputs = [point.x, point.y, point.bias];
    const target = point.label;

    perceptron.train(inputs, target);

    trainningIndex++;

    if(trainningIndex == points.length){
        trainningIndex = 0;
    }
}

function newTest(){
    let points2 = new Array(quantityOfElements * 2);

    for (let i = 0; i < points2.length; i++) {
        points2[i] = new Point(random(1,-1), random(1,-1));
    }

    let hits = 0;
    let mistakes = 0;

    points2.forEach(pt2 =>{
        const inputs = [pt2.x, pt2.y, pt2.bias];
        const target = pt2.label;
    
        if(perceptron.testTrain(inputs, target)){
            hits++;
        }
        else{
            mistakes++;
        }
    })

    console.log(`Total of new attempts: ${quantityOfElements * 2} | Hits: ${hits} ${(hits / (quantityOfElements * 2)) * 100}% | Mistakes: ${mistakes} ${(mistakes / (quantityOfElements * 2)) * 100}%`)

    debug = false;
}


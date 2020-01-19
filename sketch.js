let mobilenet;
let classifier;
let video;
let label = '';
let ukeButton;
let whistleButton;
let trainButton;
let saveButton;

function modelReady() {
    console.log('Model is ready!!!');
    classifier.load('./model (1).json', customModelReady);
    //mobilenet.predict(gotResults);
}

function customModelReady() {
    console.log('Custom Model is ready!!!');
}

function videoReady() {
    console.log('Video is ready!!!');
    //mobilenet.predict(gotResults);
}


function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        //label = results[0].label;
        label = result[0].label;
        //let prob = results[0].confidence;

        classifier.classify(gotResults);
    }

}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Training Complete');
        classifier.classify(gotResults);
    } else {
        console.log(loss);
    }
}

function setup() {
    createCanvas(640, 550);
    //puffin = createImg('images/puffin.jpg', imageReady);
    video = createCapture(VIDEO);
    video.hide();
    background(0);

    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    ukeButton = createButton('HAPPY');
    ukeButton.mousePressed(function() {
        classifier.addImage('HAPPY');
    });

    whistleButton = createButton('SAD');
    whistleButton.mousePressed(function() {
        classifier.addImage('SAD');
    });

    saveButton = createButton('Save');
    saveButton.mousePressed(function() {
        classifier.save();
    });

    trainButton = createButton('Train');
    trainButton.mousePressed(function() {
        classifier.train(whileTraining);
    });

}

function draw() {
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}
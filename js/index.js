let simplex;
let numFrames = 75;
let radius = 1.5;
let canvas;

function setup() {
    createCanvas(600,300);

    frameRate(30);

    simplex = new SimplexNoise();
}

function draw() {
    let t = frameCount/numFrames;

    let scale = 0.02;
    background(0);

    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            const ns = simplex.noise4D(x*scale, y*scale,radius*cos(TWO_PI*t),radius*sin(TWO_PI*t));

            let value = map(ns, -1, 1, 0, 255);

            let pixelColor;
            if (value < 50) {
                pixelColor = color(0);
            } else if (value < 100) {
                pixelColor = color(50);
            } else if (value < 150) {
                pixelColor = color(100);
            } else if (value < 200) {
                pixelColor = color(150);
            } else {
                pixelColor = color(200);
            }

            set(x, y, pixelColor);
        }
    }
    updatePixels();
}

let grayColorNoiseSketch = new p5(( sketch ) => {
    let simplex;
    let numFrames = 75;
    let radius = 1.5;

    sketch.setup = () => {
        sketch.createCanvas(600,300);

        sketch.frameRate(30);

        simplex = new SimplexNoise();
    };

    sketch.draw = () => {
        let t = sketch.frameCount/numFrames;

        let scale = 0.02;
        sketch.background(0);

        sketch.loadPixels();
        for (let x = 0; x < sketch.width; x++) {
            for (let y = 0; y < sketch.height; y++) {

                const ns = simplex.noise4D(x*scale, y*scale,radius*sketch.cos(sketch.TWO_PI*t),radius*sketch.sin(sketch.TWO_PI*t));

                let value = sketch.map(ns, -1, 1, 0, 255);

                let pixelColor;
                if (value < 50) {
                    pixelColor = sketch.color(0);
                } else if (value < 100) {
                    pixelColor = sketch.color(50);
                } else if (value < 150) {
                    pixelColor = sketch.color(100);
                } else if (value < 200) {
                    pixelColor = sketch.color(150);
                } else {
                    pixelColor = sketch.color(200);
                }

                sketch.set(x, y, pixelColor);
            }
        }
        sketch.updatePixels();
    }
}, "grayColorNoiseSketch");


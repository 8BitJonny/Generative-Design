new p5(( sketch ) => {
    sketch.setup = () => {
        sketch.createCanvas(300,150);
        sketch.noLoop();
    };

    sketch.draw = () => {
        if (sketch.frameCount > 1 && (sketch.mouseX <= 0 || sketch.mouseX > sketch.width
            || sketch.mouseY <= 0 || sketch.mouseY > sketch.height)) return;

        sketch.background(0);
        sketch.stroke(255);

        sketch.translate(sketch.width / 2, sketch.height -10);
        sketch.line(0,0,0,-20);
    }
}, "lS_1");


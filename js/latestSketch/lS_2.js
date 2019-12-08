new p5(( sketch ) => {
    sketch.setup = () => {
        sketch.createCanvas(300,150);
        sketch.angleMode(sketch.DEGREES);
        sketch.noLoop();
    };

    sketch.draw = () => {
        if (sketch.frameCount > 1 && (sketch.mouseX <= 0 || sketch.mouseX > sketch.width
            || sketch.mouseY <= 0 || sketch.mouseY > sketch.height)) return;

        sketch.background(0);
        sketch.stroke(255);

        sketch.translate(sketch.width / 2, sketch.height -10);
        sketch.rotate(180);
        drawNext(sketch,20);
    };

    function drawNext(sketch, length) {
        sketch.line(0,0,0,length);

        let nextLength = 0.9 * length;
        if (nextLength < 1) return;
        sketch.push();
        sketch.translate(0, length);
        sketch.rotate(20);

        drawNext(sketch, nextLength);
        sketch.pop();
    }
}, "lS_2");

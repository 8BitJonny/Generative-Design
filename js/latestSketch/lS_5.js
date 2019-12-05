new p5(( sketch ) => {
    let length = 0;
    let maxLength = 30;
    let angle = 0;
    let maxAngle = 90;

    sketch.setup = () => {
        sketch.createCanvas(300,300);
        sketch.angleMode(sketch.DEGREES);
    };

    sketch.draw = () => {
        if (sketch.frameCount > 1 && (sketch.mouseX <= 0 || sketch.mouseX > sketch.width
            || sketch.mouseY <= 0 || sketch.mouseY > sketch.height)) return;

        sketch.background(0);
        sketch.stroke(255);

        sketch.translate(sketch.width / 2, sketch.height / 2);
        sketch.rotate(180);

        let xOffset = Math.abs(sketch.mouseX - sketch.width / 2);
        let yOffset = Math.abs(sketch.mouseY - sketch.height / 2);

        if (sketch.mouseX !== 0 && sketch.mouseY !== 0) {
            length = sketch.map(yOffset, 0, sketch.height / 2, 0, maxLength);
            angle = sketch.map(xOffset, 0, sketch.width / 2, 0, maxAngle);
        }

        drawNext(sketch, length, angle);
        drawNext(sketch, length, -angle);
    };

    function drawNext(sketch, length, angle) {
        sketch.line(0,0,0,length);

        let nextLength = 0.9 * length;
        if (nextLength < 10) return;

        sketch.push();
        sketch.translate(0, length);
        sketch.rotate(angle);

        drawNext(sketch, nextLength, angle);
        drawNext(sketch, nextLength, -angle);
        sketch.pop();
    }
}, "lS_5");

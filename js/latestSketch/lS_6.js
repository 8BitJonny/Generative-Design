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

        let halfWidth = sketch.width / 2;
        let halfHeight = sketch.height / 2;

        sketch.background(0);
        sketch.stroke(255);

        sketch.translate(sketch.width / 2, sketch.height / 2);
        sketch.rotate(180);

        let xOffset = sketch.mouseX - halfWidth;
        let yOffset = sketch.mouseY - halfHeight;

        if (sketch.mouseX !== 0 && sketch.mouseY !== 0) {
            length = sketch.map(yOffset, -halfWidth, halfWidth, -maxLength, maxLength);
            angle = sketch.map(xOffset, -halfHeight, halfHeight, -maxAngle, maxAngle);
        }

        drawNext(sketch, length, angle);
        drawNext(sketch, length, -angle);
    };

    function drawNext(sketch, length, angle) {
        sketch.line(0,0,0,length);

        let nextLength = 0.9 * length;
        if (Math.abs(nextLength) < 10) return;

        sketch.push();
        sketch.translate(0, length);
        sketch.rotate(angle);

        drawNext(sketch, nextLength, angle);
        drawNext(sketch, nextLength, -angle);
        sketch.pop();
    }
}, "lS_6");

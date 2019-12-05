new p5(( sketch ) => {
    let length = 0;
    let maxLength = 30;
    let angle = 0;
    let maxAngle = 90;

    let objects = [];

    let mouseStartPos = undefined;

    sketch.setup = () => {
        sketch.createCanvas(300,300);
        sketch.angleMode(sketch.DEGREES);

        sketch.background(0);

        sketch.stroke(255);
        sketch.noLoop();
    };

    sketch.mouseDragged = () => {
        if (mouseStartPos === undefined) {
            mouseStartPos = { x: sketch.mouseX, y: sketch.mouseY };
        }
        sketch.background(0);
        sketch.push();

        let halfWidth = sketch.width / 2;
        let halfHeight = sketch.height / 2;

        sketch.translate(mouseStartPos.x, mouseStartPos.y);
        sketch.rotate(180);

        let xOffset = sketch.mouseX - mouseStartPos.x;
        let yOffset = sketch.mouseY - mouseStartPos.y;

        if (sketch.mouseX !== 0 && sketch.mouseY !== 0) {
            length = sketch.map(yOffset, -halfWidth, halfWidth, -maxLength, maxLength);
            angle = sketch.map(xOffset, -halfHeight, halfHeight, -maxAngle, maxAngle);
        }

        drawNext(sketch, length, angle);
        drawNext(sketch, length, -angle);
        drawNext(sketch, -length, angle);
        drawNext(sketch, -length, -angle);

        sketch.rotate(90);

        drawNext(sketch, length, angle);
        drawNext(sketch, length, -angle);
        drawNext(sketch, -length, angle);
        drawNext(sketch, -length, -angle);

        sketch.pop();
        sketch.redraw();
    };

    sketch.mouseReleased = () => {
        objects.push({length: length, angle: angle, posX: mouseStartPos.x, posY: mouseStartPos.y });

        mouseStartPos = undefined
    };

    sketch.draw = () => {
        objects.map(object => {
            sketch.push();
            sketch.translate(object.posX, object.posY);

            drawNext(sketch, object.length, object.angle);
            drawNext(sketch, object.length, -object.angle);
            drawNext(sketch, -object.length, object.angle);
            drawNext(sketch, -object.length, -object.angle);

            sketch.rotate(90);

            drawNext(sketch, object.length, object.angle);
            drawNext(sketch, object.length, -object.angle);
            drawNext(sketch, -object.length, object.angle);
            drawNext(sketch, -object.length, -object.angle);
            sketch.pop()
        })
    };

    function drawNext(sketch, length, angle) {
        sketch.line(0,0,0,length);

        let nextLength = 0.9 * length;
        if (Math.abs(nextLength) < 13) return;

        sketch.push();
        sketch.translate(0, length);
        sketch.rotate(angle);

        drawNext(sketch, nextLength, angle);
        drawNext(sketch, nextLength, -angle);
        sketch.pop();
    }
}, "lS_9");

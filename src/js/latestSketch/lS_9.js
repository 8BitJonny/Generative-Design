new p5(( sketch ) => {
    const RenderModeType = {"horizontal":1, "vertical":2, "horizontal-mirrored":3, "vertical-mirrored": 4, "double-mirrored": 5};
    Object.freeze(RenderModeType);
    let selectedRenderMode = RenderModeType.horizontal;

    let length = 0;
    let maxLength = 30;
    let angle = 0;
    let maxAngle = 90;

    let objects = [];

    let mouseStartPos = undefined;
    let selectElement = undefined;

    function setupSelectElement() {
        selectElement = sketch.createSelect();

        for (let property in RenderModeType) {
            if (RenderModeType.hasOwnProperty(property)) {
                selectElement.option(property, RenderModeType[property]);
            }
        }
        selectElement.changed(handleSelectChange);
    }

    function handleSelectChange() {
        selectedRenderMode = parseInt(selectElement.value());
    }

    sketch.setup = () => {
        sketch.createCanvas(600,300);
        sketch.angleMode(sketch.DEGREES);

        setupSelectElement();

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

        let xOffset = sketch.mouseX - mouseStartPos.x;
        let yOffset = sketch.mouseY - mouseStartPos.y;

        if (sketch.mouseX !== 0 && sketch.mouseY !== 0) {
            length = sketch.map(yOffset, -halfWidth, halfWidth, -maxLength, maxLength);
            angle = sketch.map(xOffset, -halfHeight, halfHeight, -maxAngle, maxAngle);
        }

        drawFigure(selectedRenderMode, length, angle);

        sketch.pop();
        sketch.redraw();
    };

    sketch.mouseReleased = () => {
        if (mouseStartPos === undefined) return;

        objects.push({length: length, angle: angle, renderMode: selectedRenderMode, posX: mouseStartPos.x, posY: mouseStartPos.y });

        mouseStartPos = undefined
    };

    sketch.draw = () => {
        objects.map(object => {
            sketch.push();
            sketch.translate(object.posX, object.posY);

            drawFigure(object.renderMode, object.length, object.angle);

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

    function drawFigure(renderMode, length, angle) {
        if (renderMode === RenderModeType.vertical || renderMode === RenderModeType["vertical-mirrored"]) {
            sketch.rotate(90);
        }

        drawNext(sketch, length, angle);
        drawNext(sketch, length, -angle);

        if (renderMode === RenderModeType["horizontal-mirrored"] ||
            renderMode === RenderModeType["vertical-mirrored"] ||
            renderMode === RenderModeType["double-mirrored"]) {
            drawNext(sketch, -length, angle);
            drawNext(sketch, -length, -angle);
        }

        if (renderMode === RenderModeType["double-mirrored"]) {
            sketch.rotate(90);

            drawNext(sketch, length, angle);
            drawNext(sketch, length, -angle);
            drawNext(sketch, -length, angle);
            drawNext(sketch, -length, -angle);
        }
    }
}, "lS_9");

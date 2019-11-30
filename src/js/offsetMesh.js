let offsetMesh = new p5(( sketch ) => {
    const renderModeType = {"white":1, "color":2};
    Object.freeze(renderModeType);
    let whiteIndexes = [ 115070, 115080, 115090, 115100, 115110, 115120, 115280, 120070, 120120, 125070, 125120, 125130, 125160, 125180, 125190, 125220, 125230, 125250, 125280, 125320, 125330, 125350, 125360, 125390, 125410, 125420, 125430, 130070, 130120, 130130, 130150, 130190, 130220, 130280, 130320, 130360, 130390, 130400, 130430, 135070, 135120, 135130, 135150, 135160, 135170, 135180, 135190, 135220, 135230, 135280, 135310, 135360, 135390, 135430, 140070, 140120, 140150, 140240, 140250, 140280, 140310, 140360, 140390, 140430, 145070, 145120, 145150, 145160, 145250, 145280, 145320, 145350, 145360, 145390, 145430, 150070, 150080, 150090, 150100, 150110, 150160, 150170, 150180, 150190, 150220, 150230, 150240, 150250, 150280, 150320, 150330, 150340, 150360, 150390, 150430, 155360, 160350, 165330, 165340 ];
    let whiteIndexIndex = 0;
    let simplex;
    let currentFrame = 1;
    let numFrames = 75;
    let radius = 1.5;
    let paused = true;
    let renderMode = renderModeType.white;

    let whiteCheckbox;
    let colorCheckbox;


    sketch.setup = () => {
        sketch.createCanvas(600,600);

        sketch.frameRate(30);

        whiteCheckbox = sketch.createCheckbox('white', renderMode === renderModeType.white);
        colorCheckbox = sketch.createCheckbox('color', renderMode === renderModeType.color);
        whiteCheckbox.changed(checkedWhite);
        colorCheckbox.changed(checkedColor);

        simplex = new OpenSimplexNoise();
    };

    sketch.mouseReleased = () => {
        if (sketch.mouseX >= 0 && sketch.mouseX <= sketch.width
            && sketch.mouseY >= 0 && sketch.mouseY <= sketch.height) {
            paused = !paused;
        }
    };

    function checkedWhite() {
        if (this.checked()) {
            colorCheckbox.elt.children[0].checked = false;
            renderMode = renderModeType.white;
        } else {
            whiteCheckbox.elt.children[0].checked = true;
        }
    }

    function checkedColor() {
        if (this.checked()) {
            whiteCheckbox.elt.children[0].checked = false;
            renderMode = renderModeType.color;
        } else {
            colorCheckbox.elt.children[0].checked = true;
        }
    }

    function drawPauseScreen () {
        sketch.textSize(30);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.fill('#2DD881');
        sketch.rect(200, 275, 200, 50, 10);
        sketch.fill('white');
        sketch.text('Click to play', 300, 300);
    }

    function calculateNoiseBasedOffset(x,y,t) {
        const nsX = simplex.noise4D(x, y,radius*sketch.cos(sketch.TWO_PI*t),radius*sketch.sin(sketch.TWO_PI*t));
        return sketch.map(nsX,-1,1,-30,30);
    }

    function colorWhite() {
        sketch.stroke(255);
    }

    function colorColorful() {
        sketch.stroke(sketch.color(sketch.random(0,255),sketch.random(0,255),sketch.random(0,255)));
    }

    function printText(x,y) {
        if (whiteIndexIndex < whiteIndexes.length && whiteIndexes[whiteIndexIndex] === y*width+x) {
            whiteIndexIndex ++;
            sketch.stroke(255);
        } else {
            sketch.stroke(100);
        }
    }

    sketch.draw = () => {
        if (currentFrame > 500) {
            paused = true;
            currentFrame = 0;
        }

        if (paused && sketch.frameCount > 1) {
            drawPauseScreen();
            return;
        }

        let t = currentFrame/numFrames;

        let scale = 0.015;
        sketch.background(0);

        sketch.loadPixels();
        for (let y = 10; y < sketch.height - 10; y+=10) {
            for (let x = 10; x < sketch.width - 10; x+=10) {

                const offsetX = calculateNoiseBasedOffset(scale*x,scale*y,t);
                const offsetY = calculateNoiseBasedOffset(scale*x+1000,scale*y+1000,t);

                // These are the 3 ways of coloring the Grid. Uncomment one of these lines to use this coloring
                if (renderMode === renderModeType.white) {
                    colorWhite()
                } else {
                    colorColorful()
                }

                sketch.strokeWeight(1);
                sketch.point(x + offsetX,y + offsetY);
            }
        }
        currentFrame ++;
    }
}, "offsetMesh");

let offsetMesh = new p5(( sketch ) => {
    const renderModeType = {"white":1, "color":2, "text":3};
    Object.freeze(renderModeType);
    let whiteIndexes = [144070,144080,144090,144100,144110,144120,144130,144350,144360,150070,150120,150130,150140,150350,150360,156070,156140,156150,162070,162140,162150,162200,162210,162220,162230,162280,162290,162300,162310,162350,162360,162400,162410,162420,162440,162470,162480,162500,162510,162520,168070,168150,168190,168230,168240,168270,168280,168310,168320,168350,168360,168390,168400,168430,168440,168470,168480,168490,168520,168530,174070,174150,174180,174190,174240,174270,174320,174350,174360,174380,174390,174440,174470,174480,174530,180070,180150,180180,180240,180270,180280,180290,180350,180360,180380,180390,180440,180470,180480,180530,186070,186140,186150,186180,186190,186200,186210,186220,186230,186240,186280,186290,186300,186310,186320,186350,186360,186380,186390,186440,186470,186480,186530,192070,192140,192150,192180,192320,192350,192360,192380,192390,192440,192470,192480,192530,198070,198130,198140,198180,198190,198230,198240,198270,198320,198350,198360,198380,198390,198430,198440,198470,198480,198530,204070,204080,204090,204100,204110,204120,204130,204140,204190,204200,204220,204230,204240,204270,204280,204310,204320,204350,204360,204390,204400,204410,204420,204430,204440,204470,204480,204530,210070,210080,210090,210100,210110,210200,210210,210220,210280,210290,210300,210310,210350,210360,210400,210410,210420,210440,210470,210480,210530,216440,222390,222430,222440,228390,228400,228410,228420,228430];
    let whiteIndexIndex = 0;
    let simplex;
    let currentFrame = 1;
    let numFrames = 75;
    let radius = 1.5;
    let paused = true;
    let renderMode = renderModeType.white;

    let whiteCheckbox;
    let colorCheckbox;
    let textCheckbox;


    sketch.setup = () => {
        let canvas = sketch.createCanvas(600,600);
        canvas.elt.className = "canvas";

        sketch.frameRate(30);

        sketch.createSpan("Display options: ");

        whiteCheckbox = sketch.createCheckbox('white', renderMode === renderModeType.white);
        whiteCheckbox.elt.className = "option";
        colorCheckbox = sketch.createCheckbox('color', renderMode === renderModeType.color);
        colorCheckbox.elt.className = "option";
        textCheckbox = sketch.createCheckbox('text', renderMode === renderModeType.text);
        textCheckbox.elt.className = "option";
        whiteCheckbox.changed(checkedWhite);
        colorCheckbox.changed(checkedColor);
        textCheckbox.changed(checkedText);

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
            textCheckbox.elt.children[0].checked = false;
            colorCheckbox.elt.children[0].checked = false;
            renderMode = renderModeType.white;
        } else {
            whiteCheckbox.elt.children[0].checked = true;
        }
    }

    function checkedColor() {
        if (this.checked()) {
            textCheckbox.elt.children[0].checked = false;
            whiteCheckbox.elt.children[0].checked = false;
            renderMode = renderModeType.color;
        } else {
            colorCheckbox.elt.children[0].checked = true;
        }
    }

    function checkedText() {
        if (this.checked()) {
            whiteCheckbox.elt.children[0].checked = false;
            colorCheckbox.elt.children[0].checked = false;
            renderMode = renderModeType.text;
            console.log(renderMode)
        } else {
            textCheckbox.elt.children[0].checked = true;
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
        if (whiteIndexIndex < whiteIndexes.length && whiteIndexes[whiteIndexIndex] === y*sketch.width+x) {
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
                } else if (renderMode === renderModeType.text) {
                    printText(x,y)
                } else {
                    colorColorful()
                }

                sketch.strokeWeight(1);
                sketch.point(x + offsetX,y + offsetY);
            }
        }
        whiteIndexIndex = 0;
        currentFrame ++;
    }
}, "offsetMesh");

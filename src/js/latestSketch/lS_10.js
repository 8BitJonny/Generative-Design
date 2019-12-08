new p5(( sketch ) => {
    let length = 0;
    let maxLength = 70;
    let angle = 0;
    let maxAngle = 40;
    let targetRadius = 20;

    let targets = [{x: 25.71831625342142, y: 105.89825887705393},
        {x: 73.51218292083684, y: -297.11842444197185},
        {x: -177.89379832880792, y: -278.1496849059675},
        {x: -251.04065773216337, y: 265.05725065410644},
        {x: 33.18064952097939, y: 233.77016938897214},
        {x: -227.80218679413795, y: -265.60801590961324},
        {x: -5.98415939186017, y: 173.09052338242887},
        {x: -102.6630884872521, y: 219.4641735036801},
        {x: 154.56855556152783, y: 318.0096561388051},
        {x: -171.70884558127455, y: 70.9684898424506},
        {x: 99.93885044223947, y: -21.186109518845505},
        {x: 192.6401080385251, y: -103.87260612633408},
        {x: -219.86920670538845, y: -213.09489403287017},
        {x: -195.03798187371459, y: -227.87879241765788},
        {x: 71.0984005331153, y: 305.54221775514605},
        {x: -7.656525216426517, y: 91.0131410704409},
        {x: -241.85932982896114, y: 297.0139139470424},
        {x: -241.43919141018094, y: 91.26517224570816},
        {x: -222.98636018781406, y: -68.86807466499546},
        {x: 176.95227285451602, y: -59.81907861252892}];
    let reachedTargets = 0;

    let gameStarted = false;
    let startTime = undefined;
    let gameTime = undefined;

    sketch.setup = () => {
        sketch.createCanvas(800,800);
        sketch.angleMode(sketch.DEGREES);
        sketch.stroke(255);
        sketch.fill('white');
    };

    sketch.mouseClicked = () => {
        if (sketch.mouseX <= 0 || sketch.mouseX > sketch.width || sketch.mouseY <= 0 || sketch.mouseY > sketch.height) return;

        if (gameStarted === false) {
          gameStarted = true;
          startTime = new Date().getTime();
          gameTime = undefined;
          reachedTargets = 0;
          targets = shuffle(targets);
        }
    };

    sketch.draw = () => {
        sketch.background(0);

        if (gameStarted === false) {
            drawStartScreen();
        } else {
            drawTimer();

            drawGameObjects();
        }
    };

    function drawStartScreen() {
        sketch.textSize(30);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Goal of the Game is to touch all 20 targets as fast as you can.", sketch.width / 2 - 200, sketch.height / 2 - 200, 400, 400);
        sketch.text("Click to start", sketch.width / 2 - 200, sketch.height / 2, 400, 200);

        if (gameTime !== undefined) {
            sketch.textAlign(sketch.LEFT);
            sketch.textSize(20);
            sketch.text("Last Score: " + gameTime + " seconds", 50, 50)
        }
    };

    function drawTimer() {
        let nowTime = new Date().getTime();
        gameTime = (nowTime - startTime)/1000;
        sketch.textAlign(sketch.LEFT);
        sketch.textSize(20);
        sketch.text("Time: " + gameTime, 50, 50)
    };

    function drawGameObjects() {
        let halfWidth = sketch.width / 2;
        let halfHeight = sketch.height / 2;

        sketch.translate(sketch.width / 2, sketch.height / 2);
        sketch.rotate(180);

        let xOffset = sketch.mouseX - halfWidth;
        let yOffset = sketch.mouseY - halfHeight;

        if (sketch.mouseX > 0 && sketch.mouseX < sketch.width && sketch.mouseY > 0 && sketch.mouseY < sketch.height) {
            length = sketch.map(yOffset, -halfWidth, halfWidth, -maxLength, maxLength);
            angle = sketch.map(xOffset, -halfHeight, halfHeight, -maxAngle, maxAngle);
        }

        let currentTarget = sketch.createVector(targets[reachedTargets].x, targets[reachedTargets].y);
        sketch.circle(currentTarget.x,currentTarget.y,targetRadius);

        if ((xOffset > 0 && yOffset > 0) || (xOffset < 0 && yOffset > 0)) {
            drawLine(sketch, length, -angle, currentTarget);
        } else {
            drawLine(sketch, length, angle, currentTarget);
        }
    }

    function drawLine(sketch, length, angle, target) {
        sketch.line(0,0,0,length);

        let nextLength = 0.9 * length;
        if (Math.abs(nextLength) < 25) {
            if (touchesTarget(length, target)) {
                reachedTargets ++;
                if (reachedTargets >= targets.length) {
                    gameStarted = false;
                }
            };
            return
        }

        // apply the translations to the canvas AND the target, so that we can later make hit detection without knowing how deep we are in push() and pop()
        sketch.push();
        sketch.translate(0, length);
        sketch.rotate(angle);
        let targetCopy = target.copy();
        let translatedVector =  targetCopy.sub(0,length).rotate(360 - angle);

        drawLine(sketch, nextLength, angle, translatedVector);
        sketch.pop();
    }

    function touchesTarget(length, target) {
        let distanceVector = sketch.createVector(0,length).sub(target);
        let distance = distanceVector.mag();
        return  distance <= targetRadius;
    }

    function shuffle(arra1) {
        // taken from https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
        let ctr = arra1.length;
        let temp;
        let index;

        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }
}, "lS_10");

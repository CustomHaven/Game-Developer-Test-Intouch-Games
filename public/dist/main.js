import VictoryTickets from "./VictoryTickets.js";
import GridImages from "./GridImages.js";
import ImageMaker from "./ImageMaker.js";
import HelperGrid from "./HelperGrid.js";
class BusterSafe {
    // So now Enjoy the code
    constructor() {
        this.backgroundImage = new Image();
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.backgroundImage.src = "graphics/background_safe_minigame.png";
        this.backgroundImage.onload = this.update.bind(this);
        this.initialBet = Math.floor(Math.random() * 10) + 1;
        this.ticketsObj = [new VictoryTickets()];
        this.helper = new HelperGrid();
        this.gridClose = new GridImages("./graphics/safe_minigame.png", 150, 150);
        this.gridOpen = new GridImages("./graphics/safe_open_minigame.png", 150, 150);
        this.spinWheel = new ImageMaker("./graphics/SpinDial1.png", 600, 300, 282, 300);
        this.spinWheelResult = new ImageMaker("./graphics/safe_dial_minigame.png", 600, 300, 282, 300);
        this.spinA = new ImageMaker("./graphics/SpinA.png", 705, 415);
        this.redDial = new ImageMaker("./graphics/support_safe_dial_minigame.png", 592, 278);
        this.greenDial = new ImageMaker("./graphics/support_safe_dial_minigame2.png", 592, 278);
        this.redScreenMiniGame = new ImageMaker("./graphics/screen_safe_minigame.png", 575, 175);
        this.greenScreenMiniGame = new ImageMaker("./graphics/screen_safe_win.png", 575, 175);
        this.ledSafeDial1 = new ImageMaker("./graphics/leds_safe_dial_minigame.png", 0, 0, 120, 70);
        this.ledSafeDial2 = new ImageMaker("./graphics/leds_safe_dial_minigame.png", 0, 0, 120, 70);
        this.spark = new ImageMaker("./graphics/spark_safe.png", 600, 300);
        this.iRotate = 1;
        this.frames;
        this.ledFrames = 0;
        this.maxFrames = 0; // falsy
        // this.spinnerArray = [ 398, 359, 319, 279, 238, 198, 518, 478, 438 ]; // a bit longer game at least a full spin
        this.spinnerArray = [398, 359, 319, 279, 238, 198, 157, 118, 438]; // shorter and faster game
        this.idxRandom = [];
        this.removeIdxRandomDuplicates = [];
        this.toggleSpinning = true;
        this.turnsArray = ["-", "-", "-", "-"];
        this.numberOfSpins = 0;
        this.twoOfAKind = [];
        this.mostOccurance = "";
        this.win = false;
        this.infiniteFrames = 1;
        this.toggleRed = true;
    }
    // We find the mostOccurance of example x17 in the array game
    mostInside() {
        let mf = 1; //default maximum frequency
        let m = 0; //counter
        let item; //to store item with maximum frequency
        for (let i = 0; i < this.twoOfAKind.length; i++) { //select element (current element)
            for (let j = i; j < this.twoOfAKind.length; j++) //loop through next elements in array to compare calculate frequency of current element
             {
                if (this.twoOfAKind[i].str == this.twoOfAKind[j].str) //see if element occurs again in the array
                    m++; //increment counter if it does
                if (mf < m) //compare current items frequency with maximum frequency
                 {
                    mf = m; //if m>mf store m in mf for upcoming elements
                    item = this.twoOfAKind[i].str; // store the current element.
                }
            }
            m = 0; // make counter 0 for next element.
        }
        this.mostOccurance = item;
    }
    getXY(event) {
        this.rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - this.rect.left,
            y: event.clientY - this.rect.top
        };
    }
    resize() {
        window.addEventListener("resize", () => {
            this.update();
        });
    }
    spinnerClicked() {
        this.canvas.addEventListener("click", (e) => {
            const pos = this.getXY(e);
            // we have given the coordinates for the spin image in this if statement!
            if (pos.x >= 680 && pos.x <= 800 && pos.y >= 390 && pos.y <= 510) {
                if (this.win) { // if victory we reset all the values so the game can be played again!
                    this.initialBet = Math.floor(Math.random() * 10) + 1;
                    this.idxRandom = [];
                    this.removeIdxRandomDuplicates = [];
                    this.ticketsObj.pop();
                    this.ticketsObj[0] = new VictoryTickets();
                    this.numberOfSpins = 0;
                    this.turnsArray = ["-", "-", "-", "-"];
                    this.twoOfAKind = [];
                    this.mostOccurance = "";
                    this.win = false;
                    if (this.gridClose === undefined) {
                        this.gridClose = new GridImages("./graphics/safe_minigame.png", 150, 150);
                    }
                }
                setTimeout(() => {
                    this.randomInt = Math.floor(Math.random() * 9);
                    this.twoOfAKind.push({ idxNum: this.randomInt + 1, str: this.ticketsObj[0].ticketArray[this.randomInt].str });
                    // if randomInt makes the same number twice we monitor it with the if statement then delete the randomInt if false
                    if (this.twoOfAKind.filter(val => val.idxNum === this.randomInt + 1).length < 2) { // if true we start the GAME!
                        this.removeIdxRandomDuplicates.push(this.randomInt + 1);
                        this.maxFrames = 0;
                        this.frames = 0;
                        this.iRotate = 1;
                        this.mostInside();
                        this.maxFrames = this.spinnerArray[this.randomInt];
                    }
                    else { // here we delete the duplicate randomInt from the twoOfAKind array so the player has to spin again!
                        this.twoOfAKind.pop();
                        console.log("OOPS the random number that was generated came up again");
                        console.log("We'll just remove that for you.");
                        console.log("There you can press spin again!");
                    }
                }, 0);
            }
        });
        // }
    }
    // Main Game Loop
    update() {
        // // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the background image
        this.context.drawImage(this.backgroundImage, 0, 0);
        // Draw the closed safes as a grid of 3X3 so array of [ [], [], [] ]
        if (this.gridClose) {
            this.gridClose.gridArray.forEach(arrs => {
                arrs.forEach(ar => {
                    if (!this.idxRandom.includes(ar.idx)) { // we remove each one respectively when player starts to find any of the number 1 to 9
                        ar.img.draw(this.context);
                        this.context.font = "bold 60px Dimbo";
                        this.context.fillStyle = "white";
                        this.context.fillText(`${ar.idx}`, ar.x + 75 - 10, ar.y + (170 / 2) + 20);
                    }
                });
            });
        }
        // Draw the open safes as a grid of 3X3 so array of [ [], [], [] ]
        this.gridOpen.gridArray.forEach((arrs) => {
            arrs.forEach((ar, i) => {
                if (this.idxRandom.includes(ar.idx)) { // we start placing them into the canvas when the player starts finding them 1 by 1
                    ar.img.draw(this.context);
                    this.ticketsObj[0].ticketArray[ar.idx - 1].img.complexDraw(this.context, 0, 0, 200, 164, { x: ar.x + 15, y: ar.y });
                    this.context.font = "bold 60px Dimbo";
                    this.context.strokeStyle = "black";
                    this.context.fillStyle = "white";
                    this.context.strokeText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170 / 2) + 20);
                    this.context.fillText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170 / 2) + 20);
                }
                // we monitor win condtions and make the bouncing effect
                if (this.win === true && this.twoOfAKind.filter(v => v.str === this.mostOccurance).length >= 2) {
                    // garbage collection we delete the class instance completely so not to make our app laggy.
                    delete this.gridClose;
                    ar.img.draw(this.context);
                    if (this.idxRandom.includes(ar.idx)) {
                        this.ticketsObj[0].ticketArray[ar.idx - 1].img.complexDraw(this.context, 0, 0, 200, 164, { x: ar.x + 15, y: ar.y });
                    }
                    this.context.font = "bold 60px Dimbo";
                    this.context.strokeStyle = "black";
                    this.context.fillStyle = "white";
                    this.context.strokeText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170 / 2) + 20);
                    this.context.fillText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170 / 2) + 20);
                }
                if (this.win === true && this.twoOfAKind.filter(v => v.str === this.mostOccurance).length >= 2 &&
                    this.idxRandom.includes(ar.idx) && this.ticketsObj[0].ticketArray[ar.idx - 1].str === this.mostOccurance) {
                    if (this.infiniteFrames % 100 === 0) {
                        this.ticketsObj[0].ticketArray[ar.idx - 1].img.complexDraw(this.context, 1, //               2 sx
                        0, //               3 sy
                        200, //           4 sWidth
                        164, //           5 sHeight
                        { x: ar.x + 15,
                            y: ar.y }, //       7 dy
                        180, //           8 dWidth
                        180 //               9 dHeight
                        );
                        this.context.font = "bold 60px Dimbo";
                        this.context.strokeStyle = "black";
                        this.context.fillStyle = "white";
                        this.context.strokeText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170 / 2) + 20);
                        this.context.fillText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170 / 2) + 20);
                    }
                    else if (this.infiniteFrames % 50 === 0) {
                        this.ticketsObj[0].ticketArray[ar.idx - 1].img.complexDraw(this.context, 1, //                   2 sx
                        0, //                   3 sy
                        200, //                 4 sWidth
                        164, //                 5 sHeight
                        { x: ar.x - 20,
                            y: ar.y - 20 }, //       7 dy           
                        200, //                  8 dWidth
                        200 //                   9 dHeight
                        );
                        this.context.font = "bold 60px Dimbo";
                        this.context.strokeStyle = "black";
                        this.context.fillStyle = "white";
                        this.context.strokeText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 50, ar.y + (170 / 2) - 20);
                        this.context.fillText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 50, ar.y + (170 / 2) - 20);
                    }
                }
            });
        });
        // draw in the redDial
        this.redDial.draw(this.context);
        // the spinWheel rotates based on this.iRotate as it is being incremented ++;
        this.spinWheel.rotateLoop(this.context, this.iRotate);
        // when the spin lands on a number either if we win or not we change the spinWheel to the red or green spinWheel
        if (this.frames === this.maxFrames && this.win === false && this.toggleRed === true) {
            this.spinWheelResult.complexRotateLoop(this.context, // context
            this.frames, // deg
            1, //            2 sx
            0, //            3 sy
            275, //          4 sWidth
            275, //          5 sHeight
            { x: 600,
                y: 300 }, //      7 dy
            300, //          8 dWidth
            300 //           9 dHeight
            );
        }
        else if (this.frames === this.maxFrames && this.win === true) {
            this.greenDial.draw(this.context);
            this.spinWheelResult.complexRotateLoop(this.context, // context
            this.frames, // deg
            2, //           2 sx 
            0, //           3 sy
            275, //         4 sWidth
            275, //         5 sHeight
            { x: 600,
                y: 300 }, //     7 dy
            300, //         8 dWidth
            300 //          9 dHeight
            );
        }
        // red screen displays information of turns left and what numbers the player got for their turns
        if (this.win === false) {
            this.redScreenMiniGame.draw(this.context);
            this.context.font = "bold 75px TitanOne";
            this.context.fillStyle = "white";
            this.context.fillText(`${this.turnsArray[0]} ${this.turnsArray[1]} ${this.turnsArray[2]} ${this.turnsArray[3]}`, 620, 240);
        }
        // if they won then the red screen changes to green screens and tells them they WON!
        if (this.win && this.frames === this.maxFrames) {
            this.greenScreenMiniGame.draw(this.context);
            this.context.font = "bold 75px TitanOne";
            this.context.fillStyle = "white";
            this.context.fillText(`WIN`, 640, 245);
        }
        // draw the spinA
        this.spinA.draw(this.context);
        // the LED lights
        this.ledSafeDial1.complexDraw(this.context, 0, 0, 118, 44, { x: 590, y: 250 });
        this.ledSafeDial2.complexDraw(this.context, 0, 0, 118, 44, { x: 760, y: 250 });
        // start of the game information text
        if (this.frames === undefined) {
            this.context.font = "29px TitanOne";
            this.context.fillStyle = "black";
            this.context.fillText("Match a pair of symbols for a safe busting mutliplier", 50, 50);
            this.context.fillText("TOUCH THE DIAL TO SPIN YOUR 4 DIGIT COMBINATION", 50, 100);
        }
        // during the game when number of spin is 4 or less
        if (this.numberOfSpins < 5) {
            if (this.frames !== undefined) { // as the game is spinning
                if (this.frames < this.maxFrames) {
                    this.frames++;
                    this.iRotate++;
                    if (this.toggleSpinning) { // the toggle effect blinking effect for "Spinning!" to be displayed
                        this.context.font = "bold 60px Dimbo";
                        this.context.fillStyle = "black";
                        this.context.fillText("SPINNING!", this.canvas.width / 3, 88);
                    }
                }
                // We tell them what safe they opened
                if (this.frames === this.maxFrames && !(this.twoOfAKind.filter(v => v.str === this.mostOccurance).length >= 2)) {
                    this.context.font = "bold 60px Dimbo";
                    this.context.fillStyle = "black";
                    this.context.fillText(`SAFE ${this.randomInt + 1}`, this.canvas.width / 3, 88);
                }
                else { // blinking effect for the LED lights
                    this.ledSafeDial1.complexDraw(this.context, this.ledFrames, 0, 118, 44, { x: 590, y: 250 });
                    this.ledSafeDial2.complexDraw(this.context, this.ledFrames, 0, 118, 44, { x: 760, y: 250 });
                }
                if (this.iRotate % 20 === 0) { // this helps with the blinking effect for the LED lights as we measure the modulo -> remainder
                    this.ledFrames++;
                }
                if (this.ledFrames > 2) { // we reset the lights when they reach 2
                    this.ledFrames = 0;
                }
            }
            // Game won displayed and it shows how much they won!
            if (this.twoOfAKind.filter(v => v.str === this.mostOccurance).length >= 2 && this.frames === this.maxFrames) {
                this.win = true;
                this.context.font = "bold 70px Dimbo";
                this.context.fillStyle = "black";
                this.context.fillText(`YOU WIN €${(this.initialBet * parseInt(this.mostOccurance.replace(/\w/, ""))).toFixed(2)}!`, this.canvas.width / 4, 88);
            }
            else if (this.numberOfSpins === 4 && this.frames === this.maxFrames) {
                this.win = true;
                this.context.font = "bold 70px Dimbo";
                this.context.fillStyle = "black";
                this.context.fillText(`TRY AGAIN!`, this.canvas.width / 3, 88);
            }
        }
        if (this.frames !== undefined) {
            if (this.frames % 25 === 0) {
                setTimeout(() => {
                    this.toggleSpinning = !this.toggleSpinning; // toggle boolean for true or false to make the blinking effect on "SPINNIG!"
                }, 0);
            }
        }
        // at this point where push we open another safe which they have won and we add to their turn.
        // as frames gets incremented forever until we reset it with spinnerClicked() method
        // we monitor this condition when the maxFrames - 3 is equal to frames we only thus do this once as we want it only to be done once
        if (this.frames === this.maxFrames - 3) {
            this.idxRandom.push(this.removeIdxRandomDuplicates[this.removeIdxRandomDuplicates.length - 1]);
            this.turnsArray[this.numberOfSpins] = this.removeIdxRandomDuplicates[this.removeIdxRandomDuplicates.length - 1];
            this.numberOfSpins++;
        }
        // toggle for the red spinner animation
        if (this.infiniteFrames % 50 === 0) {
            this.toggleRed = !this.toggleRed;
        }
        // draw the sparks at the start when frames is still undefined
        if (this.frames === undefined) {
            this.spark.drawSparks(this.context, 282, 300);
        }
        // the helper grid not needed in production. just for development use
        // this.helper.drawGrid(this.canvas.width, this.canvas.height, this.context);
        this.infiniteFrames++;
        window.requestAnimationFrame(this.update.bind(this));
    }
}
const busterSafe = new BusterSafe();
busterSafe.resize();
busterSafe.spinnerClicked();
//# sourceMappingURL=main.js.map
import VictoryTickets from "./VictoryTickets.js";
import GridImages from "./GridImages.js";
import ImageMaker from "./ImageMaker.js";
import HelperGrid from "./HelperGrid.js";

class ITGTechTask
{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public previousUpdateTime: number = 0;

    private backgroundImage: HTMLImageElement = new Image();

    public initialBet: number;

    // this helper is a grid we laidout for the entire canvas so that it helps us to draw and place our images 
    public helper: HelperGrid;

    // Grid images will make a grid array of [[3x]] so 9x9 to place the x17 etc
    public gridClose: GridImages;
    public gridOpen: GridImages;
    // As we need a lot of images it makes sense to make a class for them so we can create them fast and efficent class ImageMaker
    public spinWheel: ImageMaker;
    public spinWheelResult: ImageMaker;
    public spinA: ImageMaker;
    public redDial: ImageMaker;
    public greenDial: ImageMaker;
    public redScreenMiniGame: ImageMaker;
    public greenScreenMiniGame: ImageMaker;
    public ledSafeDial1: ImageMaker;
    public ledSafeDial2: ImageMaker;
    public spark: ImageMaker;

    // randomInt gives the random spin number then we push randomInt into many other variables that will use it thought the app! 
    // idxRandom stores the randomInt then based on the numbers we have it opens/closes the gridOpen and gridClose
    // removeIdxRandomDuplicates helps to remove duplicates that randomInt might make because it is using Math.random()
    public randomInt: number;
    public idxRandom: number[];
    public removeIdxRandomDuplicates: number[];

    // this class we store the x17 x18 etc at random so they are 3X3 to be fitted in the array inside GridImage class 
    // and it stores as well the images for notes, ring, coins and diamond 
    public ticketsObj: VictoryTickets[];

    // iRotate rotates the spinner and frames and ledFrames all are being iterated inside update method.
    // ledFrames helps to flick led lights on/off
    // frames keeps going until we hit maxFrames then we stop all of these iteration so the player can spin again or they win
    public iRotate: number;
    public frames: number | undefined;
    public ledFrames: number;
    public maxFrames: number;

    // helps to switch over the spinner at start we have normal spinner before win but after a spin is complete we have the red spinner
    // and when we win we have the green spinner
    public toggleRed: boolean;


    // stores the iteration needed for the spinner to reach the number 1 to 9.
    // so based on the randomInt generated we give maxFrames the index of spinnerArray[randomInt] the index is randomInt
    // so frames will run until it reaches maxFrames then the spin turn finishes!
    public spinnerArray: number[];
    // infiniteFrames being incremented in the update method and we use it in terms of a modulo value to create blink effect etc
    public infiniteFrames: number;
    // the boolean conditioning for the blink effect for Spinning!
    public toggleSpinning: boolean;
    // turnsArray is keeps either str/num and we show case that they have a max off 4 turns!
    public turnsArray: (string|number)[];
    // numberOfSpins is the logic where we strongly type in the code to allow a max off 4 turns!
    public numberOfSpins: number;

    // mostOccurance with the help of the mostInside() method it helps to monitors how many x18 we have in the array of twoOfAKind
    public mostOccurance: (undefined|string);


    // the win condition twoOfAKind when we have two similar example x19 x19 we win the game and we use it stop the game!
    public twoOfAKind: {idxNum: number, str: string}[];
    public win: boolean;

    // So now Enjoy the code

    constructor()
    {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");

        this.backgroundImage.src = "graphics/background_safe_minigame.png";
        this.backgroundImage.onload = this.update.bind( this );

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
        this.spinnerArray = [ 758, 1079, 1039, 999, 958, 918, 877, 838, 798 ];
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

        // never used this
        this.previousUpdateTime = new Date().getSeconds();
        // this.spinnerClicked.bind(this);
        // this.mostInside.bind(this);
    }

    // We find the mostOccurance of example x17 in the array game
    mostInside(): void {
        let mf:number = 1; //default maximum frequency
        let m:number = 0;  //counter
        let item: string;  //to store item with maximum frequency
        for (let i:number = 0; i < this.twoOfAKind.length; i++) {   //select element (current element)
            for (let j=i; j<this.twoOfAKind.length; j++)   //loop through next elements in array to compare calculate frequency of current element
                {
                        if (this.twoOfAKind[i].str == this.twoOfAKind[j].str)    //see if element occurs again in the array
                         m++;   //increment counter if it does
                        if (mf<m)   //compare current items frequency with maximum frequency
                        {
                          mf=m;      //if m>mf store m in mf for upcoming elements
                          item = this.twoOfAKind[i].str;   // store the current element.
                        }
                }
                m=0;   // make counter 0 for next element.
        }
        this.mostOccurance = item;
    }

    // this method is our eventListener listening for clicks on the spin image 
    spinnerClicked():void {

            this.canvas.addEventListener("click", (e) => {
                // we have given the coordinates for the spin image in this if statement!
                if (e.clientX >= 700 && e.clientX <= 800 && e.clientY >= 300 && e.clientY <= 470) {
                    // console.log("clicked!!")
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
                        this.twoOfAKind.push({idxNum: this.randomInt + 1, str: this.ticketsObj[0].ticketArray[this.randomInt].str });
                        
                        // if randomInt makes the same number twice we monitor it with the if statement then delete the randomInt if false
                        if (this.twoOfAKind.filter(val => val.idxNum === this.randomInt + 1).length < 2) { // if true we start the GAME!
                            this.removeIdxRandomDuplicates.push(this.randomInt + 1);
                            this.maxFrames = 0;
                            this.frames = 0;
                            this.iRotate = 1;
                            
                            this.mostInside();
                            
                            this.maxFrames = this.spinnerArray[this.randomInt];
                            
                        } else { // here we delete the duplicate randomInt from the twoOfAKind array so the player has to spin again!
                            this.twoOfAKind.pop();
                            console.log("OOPS the random number that was generated came up again");
                            console.log("We'll just remove that for you.");
                            console.log("There you can press spin again!");
                        }
                    }, 0);
                }
            })
        // }
    }

    // Main Game Loop
    public update( currentTime: number = 0 ): void // not used the currentTime param
    {
        // const deltaTime: number = currentTime - this.previousUpdateTime;
        // this.previousUpdateTime = currentTime;

        // this.previousUpdateTime = now;
        // // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background image
        this.context.drawImage( this.backgroundImage, 0, 0 );

        // Draw the closed safes as a grid of 3X3 so array of [ [], [], [] ]
        if (this.gridClose) {
            this.gridClose.gridArray.forEach(arrs => {
                arrs.forEach(ar => {
                    if (!this.idxRandom.includes(ar.idx)) { // we remove each one respectively when player starts to find any of the number 1 to 9
                        ar.img.draw(this.context);
                        this.context.font = "bold 60px Dimbo";
                        this.context.fillStyle = "white";
                        this.context.fillText(`${ar.idx}`, ar.x + 75 - 10, ar.y + (170/2) + 20);
                    }
                })
            })
        }


        // Draw the open safes as a grid of 3X3 so array of [ [], [], [] ]
        this.gridOpen.gridArray.forEach((arrs) => {
            arrs.forEach((ar, i) => {
                if (this.idxRandom.includes(ar.idx)) { // we start placing them into the canvas when the player starts finding them 1 by 1
                    ar.img.draw(this.context);
                    this.ticketsObj[0].ticketArray[ar.idx -1].img.complexDraw(this.context, 0, 0, 200, 164, {x: ar.x + 15, y: ar.y});
                    this.context.font = "bold 60px Dimbo";
                    this.context.strokeStyle = "black";
                    this.context.fillStyle = "white";
                    this.context.strokeText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170/2) + 20);
                    this.context.fillText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170/2) + 20);

                }

                // we monitor win condtions and make the bouncing effect

                if (this.win === true && this.twoOfAKind.filter(v => v.str === this.mostOccurance).length >= 2) {
                    // garbage collection we delete the class instance completely so not to make our app laggy.
                    delete this.gridClose;
                    ar.img.draw(this.context);
                    if (this.idxRandom.includes(ar.idx)) {
                        this.ticketsObj[0].ticketArray[ar.idx -1].img.complexDraw(this.context, 0, 0, 200, 164, {x: ar.x + 15, y: ar.y});
                    }
                    
                    this.context.font = "bold 60px Dimbo";
                    this.context.strokeStyle = "black";
                    this.context.fillStyle = "white";
                    this.context.strokeText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170/2) + 20);
                    this.context.fillText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170/2) + 20);
                }

                if (this.win === true && this.twoOfAKind.filter(v => v.str === this.mostOccurance).length >= 2 &&
                this.idxRandom.includes(ar.idx) && this.ticketsObj[0].ticketArray[ar.idx -1].str === this.mostOccurance) {

                    if (this.infiniteFrames % 100 === 0) {
                        this.ticketsObj[0].ticketArray[ar.idx -1].img.complexDraw(
                            this.context, 
                            1, //               2 sx
                            0, //               3 sy
                            200,   //           4 sWidth
                            164,   //           5 sHeight
                            { x: ar.x + 15,//   6 dx
                            y: ar.y }, //       7 dy
                            180,   //           8 dWidth
                            180//               9 dHeight
                        );

                        this.context.font = "bold 60px Dimbo";
                        this.context.strokeStyle = "black";
                        this.context.fillStyle = "white";
                        this.context.strokeText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170/2) + 20);
                        this.context.fillText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 10, ar.y + (170/2) + 20);
                    } else if (this.infiniteFrames % 50 === 0) {
                        this.ticketsObj[0].ticketArray[ar.idx -1].img.complexDraw(
                            this.context, 
                            1, //                   2 sx
                            0, //                   3 sy
                            200, //                 4 sWidth
                            164, //                 5 sHeight
                            { x: ar.x - 20, //      6 dx           
                            y: ar.y - 20 },//       7 dy           
                            200,//                  8 dWidth
                            200//                   9 dHeight
                        );

                        this.context.font = "bold 60px Dimbo";
                        this.context.strokeStyle = "black";
                        this.context.fillStyle = "white";
                        this.context.strokeText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 50, ar.y + (170/2) - 20);
                        this.context.fillText(`${this.ticketsObj[0].ticketArray[ar.idx - 1].str}`, ar.x + 75 - 50, ar.y + (170/2) - 20);
                    }

                }
            })
        });

        // draw in the redDial
        this.redDial.draw(this.context);
        

        // the spinWheel rotates based on this.iRotate as it is being incremented ++;
        this.spinWheel.rotateLoop(this.context, this.iRotate);

        // when the spin lands on a number either if we win or not we change the spinWheel to the red or green spinWheel
        if (this.frames === this.maxFrames && this.win === false && this.toggleRed === true) {
            this.spinWheelResult.complexRotateLoop(
                this.context, // context
                this.frames, // deg
                1,//            2 sx
                0,//            3 sy
                275,//          4 sWidth
                275,//          5 sHeight
                {x: 600,//      6 dx
                y: 300},//      7 dy
                300,//          8 dWidth
                300//           9 dHeight
            );        
            // this.spinA.draw(this.context);
        } else if (this.frames === this.maxFrames && this.win === true) {
            this.greenDial.draw(this.context);
            this.spinWheelResult.complexRotateLoop(
                this.context, // context
                this.frames, // deg
                2, //           2 sx 
                0, //           3 sy
                275, //         4 sWidth
                275, //         5 sHeight
                {x: 600, //     6 dx
                y: 300}, //     7 dy
                300, //         8 dWidth
                300 //          9 dHeight
            );
            // this.spinA.draw(this.context);
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
        this.ledSafeDial1.complexDraw(this.context, 0, 0, 118, 44, {x: 590, y: 250});
        this.ledSafeDial2.complexDraw(this.context, 0, 0, 118, 44, {x: 760, y: 250});


        // start of the game information text
        if (this.frames === undefined) {
            this.context.font= "29px TitanOne";
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
                if(this.frames === this.maxFrames && !(this.twoOfAKind.filter(v => v.str === this.mostOccurance).length >= 2)) {
                    this.context.font = "bold 60px Dimbo";
                    this.context.fillStyle = "black";
                    this.context.fillText(`SAFE ${this.randomInt + 1}`, this.canvas.width / 3, 88);
                } else { // blinking effect for the LED lights
                    this.ledSafeDial1.complexDraw(this.context, this.ledFrames, 0, 118, 44, {x: 590, y: 250});
                    this.ledSafeDial2.complexDraw(this.context, this.ledFrames, 0, 118, 44, {x: 760, y: 250});
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
            } else if (this.numberOfSpins === 4 && this.frames === this.maxFrames) {
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
        window.requestAnimationFrame( this.update.bind( this ) );
    }
}


const itg = new ITGTechTask();
itg.spinnerClicked();
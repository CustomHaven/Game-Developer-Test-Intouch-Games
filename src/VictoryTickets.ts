import ImageMaker from "./ImageMaker.js";

class VictoryTickets {

    public threeTicketArray: string[];
    public prizeSrc: string[];
    public ticketArray: {img: ImageMaker, str: string}[];

    constructor() {
        const prizeSrcs:string[] = ["./graphics/notes.png", "./graphics/ring.png", "./graphics/coins.png", "./graphics/diamond.png"];
        const victoryMultipliers:string[] = ["x15", "x16", "x17", "x18", "x19", "x20"];
        const rand:number = Math.floor(Math.random() * 4);
        prizeSrcs.splice(rand, 1);
        this.prizeSrc = prizeSrcs;


        const threeOfThem = [];
        let arr:string[] = []
        let randStr:string = "";
        for (let i = 0; i < 3; i++) {
            threeOfThem[i] = victoryMultipliers[Math.floor(Math.random() * victoryMultipliers.length)]
            randStr = threeOfThem[i]
            //console.log(randStr)
        
            arr = threeOfThem.filter(val => val === randStr)
        
            if (arr.length >= 2) {
                threeOfThem.pop();
                i--;
            }
            
        }
        this.threeTicketArray = threeOfThem;
        /// So above we have an array of example ["x20", "x50", "x30"]
        
        // so below is where we have some problem
        
        
        let randInt:number;
        let tempStr:string = "";
        let tempImg: string = "";
        const tempArray: { img: ImageMaker, str: string}[] = [];
        for (let i:number = 0; i < 10; i++) { // i want to make an array.length of 9
            randInt = Math.floor( Math.random() * 3 );
            tempStr = this.threeTicketArray[randInt]; // to find the "x30" or whichever i stored
            tempImg = this.prizeSrc[randInt];
        
            // this.notes = new ImageMaker("./graphics/notes.png", 100, 100, 160, 160);

            tempArray.push({
                img: new ImageMaker(tempImg, 0, 0, 160, 160),
                str: tempStr
            })

          let len = tempArray.filter(val => val.str === tempStr) // we filter to bring out the once for this loops iteration
            if ( len.length > 3 ) { // if I have 4 of example "x30"
                tempArray.pop(); 
                // this should solve the infinit loop issue. 
                // as it seems that randInt is generating dublicated.
                if (tempArray.length < 9) {
                    i--;
                }
            }
        }

        this.ticketArray = tempArray;
    }
}

export default VictoryTickets;
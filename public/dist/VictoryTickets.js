import ImageMaker from "./ImageMaker.js";
class VictoryTickets {
    constructor() {
        const prizeSrcs = ["./graphics/notes.png", "./graphics/ring.png", "./graphics/coins.png", "./graphics/diamond.png"];
        const victoryMultipliers = ["x15", "x16", "x17", "x18", "x19", "x20"];
        const rand = Math.floor(Math.random() * 4);
        prizeSrcs.splice(rand, 1);
        this.prizeSrc = prizeSrcs;
        const threeOfThem = [];
        let arr = [];
        let randStr = "";
        for (let i = 0; i < 3; i++) {
            threeOfThem[i] = victoryMultipliers[Math.floor(Math.random() * victoryMultipliers.length)];
            randStr = threeOfThem[i];
            arr = threeOfThem.filter(val => val === randStr);
            if (arr.length >= 2) {
                threeOfThem.pop();
                i--;
            }
        }
        this.threeTicketArray = threeOfThem;
        /// So above we have an array of example ["x18", "x19", "x19"]
        let randInt;
        let tempStr = "";
        let tempImg = "";
        const tempArray = [];
        for (let i = 0; i < 10; i++) { // we make the array of length of 9
            randInt = Math.floor(Math.random() * 3);
            tempStr = this.threeTicketArray[randInt]; // to find the "x18" or whichever i stored
            tempImg = this.prizeSrc[randInt];
            tempArray.push({
                img: new ImageMaker(tempImg, 0, 0, 160, 160),
                str: tempStr
            });
            let len = tempArray.filter(val => val.str === tempStr); // we filter to bring out the once for this loops iteration
            if (len.length > 3) { // if I have 4 of example "x19"
                tempArray.pop(); // then we remove the last element as it safe to just pop it as it is the last that was added to the array
                // if the array less than 9 we can subtract i-- otherwise we get a small wrong size array
                // and if we dont wrap the i-- in an if statement we will get an infinite loop!
                if (tempArray.length < 9) {
                    i--;
                }
            }
        }
        this.ticketArray = tempArray;
    }
}
export default VictoryTickets;
//# sourceMappingURL=VictoryTickets.js.map
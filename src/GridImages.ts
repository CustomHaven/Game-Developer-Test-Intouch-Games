import ImageMaker from "./ImageMaker.js";

class GridImages {
    // grid images is an array of array of object so its nested like this [[{}], [{}], [{}]]
    // and the values x,y,img,idx is placed inside the object thus we make the grid shape of 3x3 as can be seen in the game
    // covers for both the closed case and open case images
    public gridArray: {x: number, y: number, img: ImageMaker, idx:number}[][];

    constructor(src: string, width?: number, height?: number) {
        const gridArray = [...Array(3)].map(e => []);
        const tempArr = [];
        const cols: number = 450;
        const rows: number = 400;
        let idx:number = 1

        // Row-major 2d array
        for (let y: number = 170; y <= cols; y+=140) {
            for (let x:number = 50; x <= rows; x+= 175) {
                const xAxis:number = x === 50 ? x : x === 225 ? x : x === 400 && x;

                if (y === 170) {
                    // y = 170;
                    tempArr.push({
                        x: x,
                        y: y,
                        img: new ImageMaker(src, xAxis, y, width, height),
                        idx: idx
                    })
                } else if (y === 310) {
                    // y = 310;
                    tempArr.push({
                        x: x,
                        y: y,
                        img: new ImageMaker(src, xAxis, y, width, height),
                        idx: idx
                    })
                } else if (y > 310) {
                    tempArr.push({
                        x: x,
                        y: y,
                        img: new ImageMaker(src, xAxis, y, width, height),
                        idx: idx
                    })
                }

                switch (y) {
                    case 170:
                        gridArray[0].push(tempArr[tempArr.length - 1])
                        break;
                    case 310:
                        gridArray[1].push(tempArr[tempArr.length - 1])
                        break;
                    case 450:
                        gridArray[2].push(tempArr[tempArr.length - 1])
                        break;
                }
            idx++;
            }
        }

        this.gridArray = gridArray;
    }
}

export default GridImages;
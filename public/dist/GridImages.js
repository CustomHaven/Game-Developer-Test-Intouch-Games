import ImageMaker from "./ImageMaker.js";
class GridImages {
    constructor(src, width, height) {
        const gridArray = [...Array(3)].map(e => []);
        const tempArr = [];
        const cols = 450;
        const rows = 400;
        let idx = 1;
        // Row-major 2d array
        for (let y = 170; y <= cols; y += 140) {
            for (let x = 50; x <= rows; x += 175) {
                const xAxis = x === 50 ? x : x === 225 ? x : x === 400 && x;
                if (y === 170) {
                    // y = 170;
                    tempArr.push({
                        x: x,
                        y: y,
                        img: new ImageMaker(src, xAxis, y, width, height),
                        idx: idx
                    });
                }
                else if (y === 310) {
                    // y = 310;
                    tempArr.push({
                        x: x,
                        y: y,
                        img: new ImageMaker(src, xAxis, y, width, height),
                        idx: idx
                    });
                }
                else if (y > 310) {
                    tempArr.push({
                        x: x,
                        y: y,
                        img: new ImageMaker(src, xAxis, y, width, height),
                        idx: idx
                    });
                }
                switch (y) {
                    case 170:
                        gridArray[0].push(tempArr[tempArr.length - 1]);
                        break;
                    case 310:
                        gridArray[1].push(tempArr[tempArr.length - 1]);
                        break;
                    case 450:
                        gridArray[2].push(tempArr[tempArr.length - 1]);
                        break;
                }
                idx++;
            }
        }
        this.gridArray = gridArray;
    }
}
export default GridImages;
//# sourceMappingURL=GridImages.js.map
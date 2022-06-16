class HelperGrid {
    // this is not part off the project but it help us the developers to visualize where every components should placed on the canvas
    // so we will draw a grid on the canvas then we can count how and where to place different objects/images
    drawGrid(w, h, ctx) {
        const gridXAxis = [];
        const gridYAxis = [];
        for (let x = 0; x < w; x += 25) { // changing between 25 and 50 to read positions
            gridXAxis.push(x);
            for (let y = 0; y < h; y += 25) { // changing between 25 and 50 to read positions
                ctx.strokeStyle = "green";
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
                if (!gridYAxis.includes(y)) {
                    gridYAxis.push(y);
                }
            }
        }
        gridXAxis.push(w);
        gridYAxis.push(h);
        return [{
                xAxis: gridXAxis,
                yAxis: gridYAxis
            }];
    }
}
export default HelperGrid;
//# sourceMappingURL=HelperGrid.js.map
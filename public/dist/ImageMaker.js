class ImageMaker {
    constructor(source, x, y, width, height) {
        this.position = {
            x: x,
            y: y
        };
        const image = new Image();
        image.src = source;
        this.image = image;
        if (width && height) {
            image.onload = () => {
                image.width = width;
                image.height = height;
                // this.image = image;
                this.width = image.width;
                this.height = image.height;
                // maybe remove the position ??
                this.position = {
                    x: x,
                    y: y
                };
            };
        }
        else {
            image.onload = () => {
                this.image = image;
                this.position = {
                    x: x,
                    y: y
                };
            };
        }
    }
    drawSparks(ctx, spinsWidth, spinsHeight) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.position.x + spinsWidth / 2, this.position.y + spinsHeight / 2, 140, 0, Math.PI * 2, true); // 741 , 450  
        ctx.clip();
        ctx.fillStyle = ctx.createPattern(this.image, "repeat");
        ctx.fillRect(0, 0, this.image.width / 2, this.image.height / 2);
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    complexDraw(ctx, iniX, iniY, cropX, cropY, position, width, height) {
        if (width && height) {
            this.width = width;
            this.height = height;
        }
        this.position = {
            x: position.x,
            y: position.y
        };
        ctx.drawImage(this.image, cropX * iniX, iniY, cropX, cropY, this.position.x, this.position.y, this.width, this.height);
    }
    draw(ctx, x, y) {
        if (x && y) { }
        if (this.width && this.height) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
        else {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }
    rotateLoop(ctx, i) {
        this.drawRotation(ctx, i);
    }
    drawRotation(ctx, deg) {
        const rad = deg * Math.PI / 180;
        ctx.save();
        ctx.translate(this.position.x + this.image.width / 2, this.position.y + this.image.height / 2);
        ctx.rotate(rad);
        ////////////// img 1             2 work at dx                3 work at dy                    4                  5
        ctx.drawImage(this.image, this.image.width / 2 * (-1), this.image.height / 2 * (-1), this.image.width, this.image.height);
        ctx.rotate(rad * (-1));
        ctx.translate((this.position.x + this.image.width / 2) * (-1), (this.position.y + this.image.height / 2) * (-1));
        ctx.restore;
    }
    complexRotateLoop(ctx, i, iniX, iniY, cropX, cropY, position, width, height) {
        this.complexDrawRotation(ctx, i, iniX, iniY, cropX, cropY, position, width, height);
    }
    complexDrawRotation(ctx, deg, iniX, iniY, cropX, cropY, position, width, height) {
        const rad = deg * Math.PI / 180;
        this.position = {
            x: position.x,
            y: position.y
        };
        if (width && height) {
            this.width = width;
            this.height = height;
        }
        ctx.save();
        ctx.translate(this.position.x + this.image.width / 2, this.position.y + this.image.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(this.image, //                  1 img
        cropX * iniX, //                2 sx
        iniY, //                        3 sy
        cropX, //                       4 sWidth
        cropY, //                       5 sHeight
        this.width / 2 * (-1), //       6 dx
        this.height / 2 * (-1), //      7 dy
        this.width, //                  8 dWidth
        this.height);
        ctx.rotate(rad * (-1));
        ctx.translate((this.position.x + this.image.width / 2) * (-1), (this.position.y + this.image.height / 2) * (-1));
        ctx.restore;
    }
}
export default ImageMaker;
//# sourceMappingURL=ImageMaker.js.map
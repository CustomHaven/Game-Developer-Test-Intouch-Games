class ImageMaker {
    public image: HTMLImageElement;
    public position: { x: number, y: number };
    public width: number;
    public height: number;

    constructor(source: string, x: number, y: number, width?: number, height?: number) {
        this.position = {
            x: x,
            y: y
        }

        const image:HTMLImageElement = new Image();
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
                }
            }
        } else {
            image.onload = () => {
                this.image = image;
                this.position = {
                    x: x,
                    y: y
                }
            }
        }
    }

    drawSparks(ctx: CanvasRenderingContext2D, spinsWidth: number, spinsHeight: number) {

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

    complexDraw(ctx: CanvasRenderingContext2D, iniX: number, iniY: number, cropX: number, cropY: number, position: { x:number, y:number }, width?: number, height?: number) {
        if (width && height) {
            this.width = width;
            this.height = height;
        }

        this.position = {
            x: position.x,
            y: position.y
        }
        ctx.drawImage(
            this.image,
            cropX * iniX,
            iniY,
            cropX,
            cropY,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
    }

    draw(ctx: CanvasRenderingContext2D, x?:number, y?:number) {
        if (x && y) {}
        if (this.width && this.height) {
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        } else {
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y
            )
        }
    }
    rotateLoop(ctx: CanvasRenderingContext2D, i:number) {
        this.drawRotation(ctx, i);
    }

    drawRotation(ctx: CanvasRenderingContext2D, deg: number) {
        const rad: number = deg * Math.PI/180;
        ctx.save();
        ctx.translate(this.position.x + this.image.width / 2, this.position.y + this.image.height / 2);
        ctx.rotate(rad);
        ////////////// img 1             2 work at dx                3 work at dy                    4                  5
        ctx.drawImage(this.image, this.image.width / 2 * (-1), this.image.height / 2 * (-1), this.image.width, this.image.height);
        ctx.rotate(rad * (-1));
        ctx.translate((this.position.x + this.image.width / 2) * (-1), (this.position.y + this.image.height / 2) * (-1));
        ctx.restore;
    }

    complexRotateLoop(
        ctx: CanvasRenderingContext2D, 
        i: number, 
        iniX:number, 
        iniY:number,
        cropX: number,
        cropY:number,
        position:{x:number, y:number}, 
        width?:number,
        height?:number
    ) {
        this.complexDrawRotation(ctx, i, iniX, iniY, cropX, cropY, position, width, height);
    }

    complexDrawRotation(
        ctx: CanvasRenderingContext2D, 
        deg: number, 
        iniX:number, 
        iniY:number,
        cropX: number,
        cropY:number,
        position:{x:number, y:number}, 
        width?:number,
        height?:number
    ) {
        const rad: number = deg * Math.PI/180;
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

        ctx.drawImage(
            this.image, //                  1 img
            cropX * iniX, //                2 sx
            iniY, //                        3 sy
            cropX, //                       4 sWidth
            cropY, //                       5 sHeight
            this.width / 2 * (-1), //       6 dx
            this.height / 2 * (-1), //      7 dy
            this.width, //                  8 dWidth
            this.height, //                 9 dHeight
        );
        ctx.rotate(rad * (-1));
        ctx.translate((this.position.x + this.image.width / 2) * (-1), (this.position.y + this.image.height / 2) * (-1));
        ctx.restore;
    }
}

export default ImageMaker;
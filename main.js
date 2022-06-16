var ITGTechTask = /** @class */ (function () {
    function ITGTechTask() {
        this.previousUpdateTime = 0;
        this.backgroundImage = new Image();
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.backgroundImage.src = "graphics/background_safe_minigame.png";
        this.backgroundImage.onload = this.update.bind(this);
    }
    // Main Game Loop
    ITGTechTask.prototype.update = function (currentTime) {
        var deltaTime = currentTime - this.previousUpdateTime;
        this.previousUpdateTime = currentTime;
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the background image
        this.context.drawImage(this.backgroundImage, 0, 0);
        // Draw some text - REMOVE THIS LATER!
        this.context.font = "30px Arial";
        this.context.fillText("ITG Technical Task", Math.floor(Math.random() * (this.canvas.width)) + 1, Math.floor(Math.random() * this.canvas.height) + 1);
        window.requestAnimationFrame(this.update.bind(this));
    };
    return ITGTechTask;
}());
new ITGTechTask();
//# sourceMappingURL=main.js.map
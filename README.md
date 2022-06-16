# Intouch Games - Game Development Test

--------------

## Table of Content

- [How to Clone the Project](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#How-to-clone-the-project)
- [General Information](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#general-information)
- [Technologies](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#technologies)
- [Mission](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#Mission)
- [HTML5 Canvas](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#HTML5-canvas)
- [JavaScript](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#Javascript)
- [Typescript](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#Typescript)
- [Status](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#Status)
- [Contact Me](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games#Contact-me)

### How to Clone the Project
---
First have [Node.js installed](https://nodejs.org/en/download/)
This will install **npm** as well.

Afterwards install Typescript globally or you can install it just to the project you are working on.

> npm install -g typescript

This will install typescript globally in your machine.

You can read more at [typescriptlang.org](https://www.typescriptlang.org/) on how to use typescript especially their doc tab.

Next install http-server globally in your machine

> npm install -g http-server

This will install http-server globally in your machine.

This is very important as it makes you run your local server thus you by pass any cors error that will come up as the browsers are not allowed to read or fetch ``file``. But instead are allowed to fetch and read ``http`` or ``https``.


From the terminal navigate to the directory were your files live and run ``http-server`` spin up a server.


If you dont want to install http-server and use VSCode Live Server you can just add the extention in your VSCode and Go Live

> Install it here [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### General Information
---
This is the main repository for the Game Development challenge test.

Visit https://aback-ship.surge.sh/ to play the game.

Visit [main.ts](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/blob/master/src/main.ts) to see the code for the game.


### Technologies
---
- HTML5 Canvas - Placed inside [public directory](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/tree/master/public)
- JavaScript - (not used but its bundled from tsconfig.json)
- Typescript - All files places inside [src directory](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/tree/master/src)


### Mission
---
The game must be written using strongly-typed Typescript and displayed using HTML5 Canvas. Make full use of OOP principles and do not use the DOM instead draw directly inside the Canvas.

### HTML5 - Canvas
---
We have a Canvas element where we draw into it and make our game. So we do not have access to the DOM anymore when working inside the canvas from our Typescript file.


[The HTML file index.html](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/blob/master/public/index.html)

### Javascript
---
We did not write the Javascript as it is bundled and created by [tsconfig.json](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/blob/master/tsconfig.json).
But all compiled generated Javascript files from the tsconfig.json can be found here [./public/dist directory](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/tree/master/public/dist) is needed to be referenced inside the source tag of the HTML file.

As at the end of the day Typescript is still just Javascript but more powerful and has type checking implicitly and we can write the type explicitly which makes it better and less prone to errors. 


### Typescript
---

Typescript is a superset of Javascript. It enables us to add types to regular Javascript. And also checks for syntax error before runtime. It also has tooltips that shows why some code might throw an error, which helps in reducing valuable time in debugging and finding the error/bug.

We utilized our use of Object Oriented Programming (OOP) where we made several classes. And this is great because it saves us from having to repeat ourselves in building the same object over and over again.

As we have several classes and with the help of Typescript strongly typed explicit types we have no errors in the code.

We built our game inside the Canvas element. When working inside the canvas element, you do not have access to the DOM anymore and the work gets a bit more trickier as it will involve some Mathematics in order to achieve what we want.

All Typescript files found inside the [src directory](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/tree/master/src):

- [main.ts](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/blob/master/src/main.ts)
- [GridImages.ts](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/blob/master/src/GridImages.ts)
- [ImageMaker.ts](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/blob/master/src/ImageMaker.ts)
- [VictoryTickets.ts](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/blob/master/src/VictoryTickets.ts)
- [HelperGrid.ts](https://github.com/CustomHaven/Game-Developer-Test-Intouch-Games/blob/master/src/HelperGrid.ts)


### Status
---

**Project completed** Canvas is in the center of the page and is playable at [visit](https://charming-mooncake-727192.netlify.app/public/index.html). Hope you enjoy the game!


### Contact Me
---
Created by [@CustomHaven](https://github.com/CustomHaven) feel free to contact me for work or collaboration work.
;
//instead of predefined values calculate the position of bricks in relation to the canvas width/height
//thanks to that the whole game and objects' positions will be responsive
function getLevelData(canvas, brick, index) {
    const brickAttribs1 = [];
    const verticalHelper = canvas.width / 60;
    const horizontalHelper = canvas.height / 12;
    const levelOne = {
        dx: 2,
        dy: -2,
        brickAttribs: brickAttribs,
    }, levelTwo = { dx: 3, dy: -1.75, brickAttribs: brickAttribs }, levelThree = { dx: -2, dy: -2.75, brickAttribs: brickAttribs }, levelFour = { dx: 3, dy: -1.75, brickAttribs: brickAttribs }, levelFive = { dx: 3, dy: -2, brickAttribs: brickAttribs };
    //vertically 7
    for (let i = 1; i < 7; i++) {
        //horizontally 11
        for (let j = 0; j < 11; j++) {
            brickAttribs1.push({
                x: verticalHelper + j * brick.width,
                y: horizontalHelper * i,
                color: "yellow",
            });
        }
    }
    //instead of ifs everywhere here, try to create an array and itarate through it like
    let levelConfig;
    let vectorX = [2, 3, -2, 3, 3];
    let vectorY = [-2, -1.75, -2.75, -1.75, -2];
    let brickAttribs = [[brickAttribs1], [], [], [], []];
    let levelColors = ["yellow", "black", "blue"];
    levelColors.forEach(function (i) {
        levelConfig = {
            dx: vectorX[i],
            dy: vectorY[i],
            brickAttribs: brickAttribs[i],
        };
    });
    return levelConfig;
    if (this.index === 1)
        return levelOne;
    else if (this.index === 2)
        return levelTwo;
    // this.dx,
    // this.dy,
    // ball.xPosition,
    // ball.yPosition,
    // player.xPosition,
    // player.width,
    // player.color,
    // brickAttribs
}
export { getLevelData };

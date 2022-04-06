function getLevelData(canvas, brick, index) {
    const brickAttribs1 = [];
    const brickAttribs2 = [];
    const verticalHelper = canvas.width / 60;
    const horizontalHelper = canvas.height / 12;
    //vertically 7
    for (let i = 1; i < 7; i++) {
        //horizontally 11
        for (let j = 0; j < 11; j++) {
            brickAttribs1.push({
                x: verticalHelper + j * brick.width,
                y: horizontalHelper * i,
            });
        }
    }
    //vertically 7
    for (let i = 1; i < 4; i++) {
        //horizontally 11
        for (let j = 0; j < 11; j++) {
            brickAttribs2.push({
                x: verticalHelper + j * brick.width,
                y: horizontalHelper * i,
            });
        }
    }
    //instead of ifs everywhere here, try to create an array and itarate through it like
    let levelConfig;
    let vectorX = [2, 3, -2, 3, 3];
    let vectorY = [-2, -1.75, -2.75, -1.75, -2];
    // let levelColors = ["yellow", "black", "blue"];
    let brickAttribs = [
        brickAttribs1,
        brickAttribs2,
        brickAttribs1,
        brickAttribs1,
        brickAttribs1,
    ];
    vectorX.forEach(function (dx, i) {
        if (index - 1 === i) {
            levelConfig = {
                dx: vectorX[i],
                dy: vectorY[i],
                brickAttribs: brickAttribs[i],
            };
            return levelConfig;
        }
    });
    return levelConfig;
}
export { getLevelData };

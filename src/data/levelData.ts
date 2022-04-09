import Brick from "../classes/Brick";
import {
  bricksInterface,
  levelConfigInterface,
} from "../interfaces/dataInterfaces";

function getLevelData(
  canvas: HTMLCanvasElement,
  brick: Brick,
  index: number
): levelConfigInterface {
  const brickAttribs1: bricksInterface[] = [];
  const brickAttribs2: bricksInterface[] = [];
  const brickAttribs3: bricksInterface[] = [];
  const brickAttribs4: bricksInterface[] = [];
  const verticalHelper = canvas.width / 60;
  const horizontalHelper = canvas.height / 12;
  const colorArray = [
    ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"],
    ["#EDEBE6", "#D6E1C7", "#94C7B6", "#403B33", "#D3643B"],
    ["#FDF1CC", "#C6D6B8", "#987F69", "#E3AD40", "#FCD036"],
    ["#AAB3AB", "#C4CBB7", "#EBEFC9", "#EEE0B7", "#E8CAAF"],
    ["#CC0C39", "#E6781E", "#C8CF02", "#F8FCC1", "#1693A7"],
  ];

  //vertically 7
  for (let i = 1; i < 7; i++) {
    //horizontally 11
    for (let j = 0; j < 21; j++) {
      brickAttribs1.push({
        x: verticalHelper + j * brick.width,
        y: horizontalHelper * i,
        color: colorArray[0][Math.floor(Math.random() * colorArray.length)],
      });
    }
  }

  let x: number = 1;
  let specialCounter: number = 1;
  //vertically 7
  for (let i = 1; i < 7; i++) {
    //horizontally 11
    specialCounter = i * 3;
    for (let j = 0; j < 21; j++) {
      if (specialCounter === 0) x = undefined;
      brickAttribs2.push({
        x: (verticalHelper + j * brick.width) * x,
        y: horizontalHelper * i,
        color: colorArray[1][Math.floor(Math.random() * colorArray.length)],
      });

      specialCounter -= 1;
    }
    x = 1;
  }

  const horizontalHelper3 = canvas.height / 15;
  //vertically 17
  for (let i = 1; i < 17; i++) {
    //horizontally 11
    for (let j = 0; j < 21; j++) {
      brickAttribs3.push({
        x: (verticalHelper + j * brick.width) * 2,
        y: (horizontalHelper3 * i) / 2,
        color: colorArray[2][Math.floor(Math.random() * colorArray.length)],
      });
    }
  }

  let everySecond: number = 1;
  //vertically 7
  for (let i = 1; i < 12; i++) {
    //horizontally 11
    for (let j = 0; j < 21; j++) {
      brickAttribs4.push({
        x: (verticalHelper + j * brick.width) * everySecond,
        y: ((horizontalHelper * i) / 2.1) * everySecond,
        color: colorArray[3][Math.floor(Math.random() * colorArray.length)],
      });
      if (everySecond === 1) everySecond = undefined;
      else if (everySecond === undefined) everySecond = 1;
    }
  }

  //instead of ifs everywhere here, try to create an array and itarate through it like
  let levelConfig: levelConfigInterface;
  let vectorX = [2, 3, -2, 3, 3];
  let vectorY = [-2, -1.75, -2.75, -1.75, -2];
  // let levelColors = ["yellow", "black", "blue"];
  let brickAttribs: bricksInterface[][] = [
    brickAttribs1,
    brickAttribs2,
    brickAttribs3,
    brickAttribs4,
    brickAttribs1,
  ];
  vectorX.forEach(function (dx, i) {
    if (index - 1 === i) {
      levelConfig = {
        dx: vectorX[i],
        dy: vectorY[i],
        brickAttribs: brickAttribs[i],
        playerColor:
          colorArray[i][Math.floor(Math.random() * colorArray.length)],
      };
      return levelConfig;
    }
  });

  return levelConfig;
}

export { getLevelData };

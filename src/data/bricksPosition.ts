import Brick from "../classes/Brick";

interface positionsInterface {
  x: number;
  y: number;
}

//instead of predefined values calculate the position of bricks in relation to the canvas width/height
//thanks to that the whole game and objects' positions will be responsive
function getPositions(canvas: HTMLCanvasElement, brick: Brick) {
  const positions: positionsInterface[] = [];
  const verticalHelper = canvas.width / 60;
  const horizontalHelper = canvas.height / 12;

  //vertically 7
  for (let i = 1; i < 7; i++) {
    //horizontally 11
    for (let j = 0; j < 11; j++) {
      positions.push({
        x: verticalHelper + j * brick.width,
        y: horizontalHelper * i,
      });
    }
  }

  return positions;
}

export { getPositions };

export interface bricksInterface {
  x: number;
  y: number;
  color?: string;
}

export interface levelConfigInterface {
  dx: number;
  dy: number;
  brickAttribs: bricksInterface[];
}

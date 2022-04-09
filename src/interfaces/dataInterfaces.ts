export interface bricksInterface {
  x: number;
  y: number;
  color?: string;
  isBoss?: boolean;
}

export interface levelConfigInterface {
  dx: number;
  dy: number;
  brickAttribs: bricksInterface[];
  playerColor: string;
}

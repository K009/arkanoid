export enum BallType {
  SMS = 1,
  EMAIL = 2,
}

export interface BrickInterface {
  x: number;
  y: number;
  color?: string;
  isBoss?: boolean;
}

export interface LevelConfigInterface {
    dx: number;
    dy: number;
    brickAttribs: BrickInterface[];
    playerColor: string;
  }
  
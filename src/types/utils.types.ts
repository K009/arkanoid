import Ball from "../classes/Ball";
import Bar from "../classes/Bar";
import Brick from "../classes/Brick";
import Player from "../classes/Player";
import SuperPowers from "../classes/SuperPowers";

export enum BallType {
  PAP = 1,
  RAP = 2,
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

export interface LevelElements {
    player: Player,
    balls: Ball[],
    removedBalls: Ball[],
    bricks: Brick[],
    removedBricks: Brick[],
    superPowers: SuperPowers[],
    bar: Bar
}

export interface LevelController {
    canvas: HTMLCanvasElement,
    keyLeftPressed: boolean,
    keyRightPressed: boolean
}

export interface AllLevelElements {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    keyLeftPressed: boolean,
    keyRightPressed: boolean,
    dx: number,
    dy: number,
    bar: Bar,
    player: Player,
    balls: Ball[],
    ball?: Ball,
    removedBalls: Ball[],
    bricks: Brick[],
    removedBricks: Brick[],
    superPowers: SuperPowers[],
    score: number
}

// export interface BrickCollisionElements {
//     bricks: Brick[],
//     ball: Ball
//     dx: number,
//     dy: number,
//     ctx: CanvasRenderingContext2D,
//     superPowers: SuperPowers,
//     score: number
// }

// export interface BorderCollisionElements {
//     canvas: HTMLCanvasElement,
//     ball: Ball,
//     player: Player,
//     superPowers: SuperPowers[],
//     removedBricks: Brick[],
//     bricks: Brick[],
//     dx: number,
//     dy: number,
//     isOver: number
// }
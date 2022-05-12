/* eslint-disable camelcase */
export interface OCRResult {
  level: number;
  page_num: number;
  block_num: number;
  par_num: number;
  line_num: number;
  word_num: number;
  left: number;
  top: number;
  width: number;
  height: number;
  confidence: number;
  text: string;
}

export interface OCRCoordinates {
  top: number;
  left: number;
  width: number;
  height: number;
}

export type Bounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export enum HashType {
  Average,
  Difference,
  Perception,
}

export interface OcrEvent {
  old: TextAndBounds;
  new: TextAndBounds;
}

export interface TextAndBounds {
  bounds: Rectangle;
  text: string;
}

export type Rectangle = {
  Max: Point;
  Min: Point;
};

export type Point = {
  X: number;
  Y: number;
};

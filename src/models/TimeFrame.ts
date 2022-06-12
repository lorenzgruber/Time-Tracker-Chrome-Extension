import { v4 } from "uuid";

export interface ITimeframe {
  start: number;
  end: number;
  id: string;
}

export class Timeframe implements ITimeframe {
  start: number;
  end: number;
  id: string;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.id = v4();
  }
}

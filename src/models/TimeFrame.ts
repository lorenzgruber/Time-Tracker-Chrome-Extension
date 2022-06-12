export interface ITimeframe {
  start: number;
  end: number;
}

export class Timeframe implements ITimeframe {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}

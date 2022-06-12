import { ITimeframe } from "./Timeframe";

export interface IDay {
  date: Date;
  timeframes: ITimeframe[];
}

export class Day implements IDay {
  date: Date;
  timeframes: ITimeframe[];

  constructor(date: Date) {
    this.date = date;
    this.timeframes = [];
  }
}

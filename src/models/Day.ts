import { ITimeFrame } from "./TimeFrame";

export interface IDay {
  date: Date;
  timeFrames: ITimeFrame[];
}

export class Day implements IDay {
  date: Date;
  timeFrames: ITimeFrame[];

  constructor(date: Date) {
    this.date = date;
    this.timeFrames = [];
  }
}

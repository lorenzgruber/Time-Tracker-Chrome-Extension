export interface ITimeFrame {
  start: Date;
  end: Date;
}

export class TimeFrame implements ITimeFrame {
  start: Date;
  end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }
}

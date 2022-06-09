import { ITimeFrame } from "./TimeFrame";

export interface IDay {
  date: Date;
  timeFrames: ITimeFrame[];

  getWeekDay(): string;
  getDateString(): string;
}

export class Day implements IDay {
  date: Date;
  timeFrames: ITimeFrame[];

  constructor(date: Date) {
    this.date = date;
    this.timeFrames = [];
  }

  getWeekDay(): string {
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return weekdays[this.date.getDay() - 1];
  }

  getDateString(): string {
    const yy = this.date.getFullYear().toString().slice(-2);
    const mm = this.date.getMonth().toString().padStart(2, "0");
    const dd = this.date.getDate().toString().padStart(2, "0");
    return `${dd}.${mm}.${yy}`;
  }
}

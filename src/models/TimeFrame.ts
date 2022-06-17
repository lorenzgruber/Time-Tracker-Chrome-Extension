import { v4 } from "uuid";
import { getTotalMinutes } from "../util/date-utils";

export interface ITimeframe {
  start: number;
  end: number;
  id: string;
}

export class Timeframe implements ITimeframe {
  start: number;
  end: number;
  id: string;

  constructor(start?: number, end?: number, id?: string) {
    this.start = start ? start : getTotalMinutes(new Date());
    this.end = end ? end : getTotalMinutes(new Date());
    this.id = id ? id : v4();
  }
}

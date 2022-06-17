import { v4 } from "uuid";
import { getTotalMinutes } from "../util/date-utils";

export interface ITimeframe {
  start: number;
  end: number;
  id: string;
  tracking: boolean | undefined;
}

export class Timeframe implements ITimeframe {
  start: number;
  end: number;
  id: string;
  tracking: boolean | undefined;

  constructor(start?: number, end?: number, id?: string, tracking?: boolean) {
    this.start = start ? start : getTotalMinutes(new Date());
    this.end = end ? end : getTotalMinutes(new Date());
    this.id = id ? id : v4();
    this.tracking = tracking;
  }
}

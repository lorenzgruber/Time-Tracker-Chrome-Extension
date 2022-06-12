import { IDays } from "../App";
import { Day, IDay } from "../models/Day";

export function getWeekDay(date: Date): string {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[date.getDay()];
}

export function getDateString(date: Date): string {
  const yy = date.getFullYear().toString().slice(-2);
  const mm = date.getMonth().toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  return `${dd}.${mm}.${yy}`;
}

export function getTotalTimeDay(day: IDay): number {
  let time = 0;
  day.timeframes.forEach((timeframe) => {
    time += timeframe.end - timeframe.start;
  });
  return time;
}

export function getTotalTimeWeek(days: IDay[]): number {
  let time = 0;
  days.forEach((day) => {
    time += getTotalTimeDay(day);
  });
  return time;
}

export function getTotalMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function getTotalSeconds(date: Date): number {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

export function minutesToHoursAndMinutes(
  mins: number,
  seperator?: string
): string {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (seperator) {
    return `${hours.toString().padStart(2, "0")}${seperator}${minutes
      .toString()
      .padStart(2, "0")}`;
  }
  return `${hours}h ${minutes}m`;
}

export function hoursAndMinutesToMinutes(
  hoursAndMinutes: string,
  seperator: string
): number {
  const hours = Number.parseInt(hoursAndMinutes.split(seperator)[0]);
  const minutes = Number.parseInt(hoursAndMinutes.split(seperator)[1]);
  return hours * 60 + minutes;
}

export function parseDaysFromLocalStorage(
  daysString: string | null
): IDays | null {
  if (!daysString) {
    return null;
  }
  const days: IDays = JSON.parse(daysString);
  let parsedDays: IDays = {};
  Object.entries(days).map(([key, value]) => {
    parsedDays[key] = new Day(new Date(value.date));
    parsedDays[key].timeframes = value.timeframes;
  });
  return parsedDays;
}

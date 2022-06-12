import { IDay } from "../models/Day";

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
  day.timeFrames.forEach((timeFrame) => {
    time += ((timeFrame.end.getTime() - timeFrame.start.getTime()) / 1000) * 60;
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

export function minutesToHoursAndMinutes(mins: number): string {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}min`;
}

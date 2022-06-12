import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Day, IDay } from "./models/Day";
import DayPage from "./pages/DayPage";
import WeekPage from "./pages/WeekPage";
import { getDateString, getTotalMinutes } from "./util/date-utils";

export default function App() {
  const [days, setDays] = useState<{ [date: string]: IDay }>({});
  const [currentDay, setCurrentDay] = useState<IDay>(new Day(new Date()));
  const [isToday, setIsToday] = useState<boolean>(true);
  const [displayDay, setDisplayDay] = useState<boolean>(true);
  const [tracking, setTracking] = useState<boolean>(false);
  // const [tracking, setTracking] = useState<boolean>(
  //   JSON.parse(localStorage.getItem("tracking") || "null") || false
  // );

  // useEffect(() => {
  //   localStorage.setItem("tracking", JSON.stringify(tracking));
  // }, [tracking]);

  useEffect(() => {
    setCurrentDay((prevCurrentDay) => ({
      ...prevCurrentDay,
      timeframes: [
        {
          start: getTotalMinutes(new Date(Date.parse("12, Jun 2022 08:00:00"))),
          end: getTotalMinutes(new Date(Date.parse("12, Jun 2022 12:00:00"))),
        },
        {
          start: getTotalMinutes(new Date(Date.parse("12, Jun 2022 12:45:00"))),
          end: getTotalMinutes(new Date(Date.parse("12, Jun 2022 16:00:00"))),
        },
      ],
    }));
  }, []);

  useEffect(() => {
    if (currentDay.timeframes.length > 0) {
      setDays((prevDays) => ({
        ...prevDays,
        [getDateString(currentDay.date)]: currentDay,
      }));
    }
    setIsToday(currentDay.date.getDate() === new Date().getDate());
  }, [currentDay]);

  function toggleDisplayName() {
    setDisplayDay((prevDisplayDay) => !prevDisplayDay);
  }

  function flipDay(direction: number) {
    setCurrentDay((prevCurrentDay) => {
      const newDate = new Date(prevCurrentDay.date);
      newDate.setDate(newDate.getDate() + direction);
      if (getDateString(newDate) in days) {
        return days[getDateString(newDate)];
      }
      return new Day(newDate);
    });
  }

  function toggleTracking() {
    setTracking((prevTracking) => !prevTracking);
  }

  return (
    <>
      <Header displayDay={displayDay} handleClick={toggleDisplayName} />
      <main className="mt-3">
        {displayDay ? (
          <DayPage
            day={currentDay}
            isToday={isToday}
            flipDay={flipDay}
            tracking={tracking}
            toggleTracking={toggleTracking}
          />
        ) : (
          <WeekPage />
        )}
      </main>
    </>
  );
}

import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Day, IDay } from "./models/Day";
import DayPage from "./pages/DayPage";
import WeekPage from "./pages/WeekPage";

export default function App() {
  const [days, setDays] = useState({});
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
    setIsToday(currentDay.date.getDate() === new Date().getDate());
  }, [currentDay]);

  function toggleDisplayName() {
    setDisplayDay((prevDisplayDay) => !prevDisplayDay);
  }

  function flipDay(direction: number) {
    setCurrentDay((prevCurrentDay) => {
      const newDate = new Date(prevCurrentDay.date);
      newDate.setDate(newDate.getDate() + direction);
      return new Day(newDate);
    });
  }

  function toggleTracking() {
    setTracking((prevTracking) => !prevTracking);
  }

  return (
    <>
      <Header displayDay={displayDay} handleClick={toggleDisplayName} />
      <main className="mt-2">
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

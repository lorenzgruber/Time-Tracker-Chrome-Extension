import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Day, IDay } from "./models/Day";
import DayPage from "./pages/DayPage";
import WeekPage from "./pages/WeekPage";

export default function App() {
  const [days, setDays] = useState<IDay[]>([]);
  const [currentDay, setCurrentDay] = useState<IDay>();
  const [displayDay, setDisplayDay] = useState<boolean>(true);
  const [tracking, setTracking] = useState<boolean>(false);

  useEffect(() => {
    getCurrentDay();
  }, []);

  function getCurrentDay() {
    const day = new Day(new Date());
    setDays((prevDays) => [...prevDays, day]);
    setCurrentDay(day);
  }

  function toggleDisplayName() {
    setDisplayDay((prevDisplayDay) => !prevDisplayDay);
  }

  function flipDay(direction: number) {
    console.log("flip day " + direction);
  }

  function toggleTracking() {
    setTracking((prevTracking) => !prevTracking);
    console.log(tracking);
  }

  return (
    <>
      <Header displayDay={displayDay} handleClick={toggleDisplayName} />
      <main className="mt-5">
        {displayDay ? (
          <DayPage
            day={currentDay}
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

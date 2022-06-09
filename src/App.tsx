import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Day, IDay } from "./models/Day";
import DayPage from "./pages/DayPage";

export default function App() {
  const [days, setDays] = useState<IDay[]>([]);
  const [currentDay, setCurrentDay] = useState<IDay>();
  const [displayDay, setDisplayDay] = useState<boolean>(true);

  useEffect(() => {
    getCurrentDay();
  }, []);

  function getCurrentDay() {
    const day = new Day(new Date());
    setDays((prevDays) => [...prevDays, day]);
    setCurrentDay(day);
  }

  function toggleDisplay() {
    setDisplayDay((prevDisplayDay) => !prevDisplayDay);
  }

  function flipDay(direction: number) {
    console.log("flip day " + direction);
  }

  return (
    <>
      <Header displayDay={displayDay} handleClick={toggleDisplay} />
      <main className="mt-5">
        {displayDay && <DayPage day={currentDay} flipDay={flipDay} />}
      </main>
    </>
  );
}

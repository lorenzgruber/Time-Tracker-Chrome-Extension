import { useEffect, useState } from "react";
import { IDay } from "./models/Day";
import DayPage from "./pages/DayPage";

export default function App() {
  const [days, setDays] = useState<IDay[]>([]);
  const [currentDay, setCurrentDay] = useState<IDay>();
  const [displayDay, setDisplayDay] = useState<boolean>(true);

  return <>{displayDay && <DayPage />}</>;
}

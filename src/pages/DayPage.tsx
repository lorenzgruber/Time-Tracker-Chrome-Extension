import { useState } from "react";
import { IDay } from "../models/Day";

export default function DayPage() {
  const [day, setDay] = useState<IDay>();

  return <p>Day</p>;
}

import { useEffect, useState } from "react";

interface IProps {
  className?: string;
}

export default function Clock({ className }: IProps) {
  const [time, setTime] = useState<string>(getCurrentTimeString());

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  function getCurrentTimeString() {
    const date = new Date();
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    //const ss = date.getSeconds().toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }

  return <div className={`clock ${className}`}>{time}</div>;
}

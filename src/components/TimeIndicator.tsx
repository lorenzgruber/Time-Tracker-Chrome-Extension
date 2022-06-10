import { useEffect, useState } from "react";
import { map } from "../util/math-utils";

interface IProps {
  rangeStart: number;
  rangeEnd: number;
}

export default function TimeIndicator({ rangeStart, rangeEnd }: IProps) {
  const [progress, setProgress] = useState<number>(getProgress());

  useEffect(() => {
    const interval = setInterval(
      () => setProgress(getProgress()),
      15 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, []);

  function getProgress(): number {
    const now = new Date();
    return (now.getHours() * 60 + now.getMinutes()) / 60;
  }

  function calculatePosition(): number {
    console.log(
      map(progress, rangeStart, rangeEnd, 0, 1),
      progress,
      rangeStart,
      rangeEnd
    );

    return map(progress, rangeStart, rangeEnd, 0, 1) * 100;
  }

  return (
    <div className="relative w-full h-full z-10">
      <div
        className=" absolute bottom-0 outline outline-1 outline-slate-700 w-0 h-full"
        style={{
          left: `${calculatePosition()}%`,
        }}
      ></div>
    </div>
  );
}

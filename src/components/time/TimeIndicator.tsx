import { useEffect, useState } from "react";
import { map } from "../../util/math-utils";

interface IProps {
  rangeStart: number;
  rangeEnd: number;
}

export default function TimeIndicator({ rangeStart, rangeEnd }: IProps) {
  const [progress, setProgress] = useState<number>(getProgress());

  useEffect(() => {
    const interval = setInterval(() => setProgress(getProgress()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  function getProgress(): number {
    const now = new Date();
    return (now.getHours() * 60 + now.getMinutes()) / 60;
  }

  function calculatePosition(): number {
    return map(progress, rangeStart, rangeEnd, 0, 1) * 100;
  }

  return (
    <div className="relative w-full h-full z-10 pointer-events-none">
      <div
        className=" absolute bottom-0 bg-blue-400 h-full rounded-full"
        style={{
          left: `${calculatePosition()}%`,
          width: "2px",
        }}
      >
        <div
          className="rounded-full bg-blue-400 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          style={{ width: "6px", height: "6px" }}
        ></div>
      </div>
    </div>
  );
}

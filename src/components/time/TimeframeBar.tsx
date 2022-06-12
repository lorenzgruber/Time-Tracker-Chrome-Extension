import { MouseEventHandler } from "react";
import { ITimeframe } from "../../models/Timeframe";
import { map } from "../../util/math-utils";

interface IProps {
  timeframe: ITimeframe;
  rangeStart: number;
  rangeEnd: number;
  handleClick: MouseEventHandler;
}

export default function TimeframeBar({
  timeframe,
  rangeStart,
  rangeEnd,
  handleClick,
}: IProps) {
  function getPercentage(minutes: number): number {
    return map(minutes / 60, rangeStart, rangeEnd, 0, 1) * 100;
  }

  return (
    <div
      onClick={handleClick}
      className="absolute h-3 bg-slate-800 rounded-full z-10 hover:bg-slate-500 cursor-pointer transition-colors"
      style={{
        left: getPercentage(timeframe.start) + "%",
        width: `${getPercentage(
          rangeStart * 60 + (timeframe.end - timeframe.start)
        )}%`,
      }}
    ></div>
  );
}

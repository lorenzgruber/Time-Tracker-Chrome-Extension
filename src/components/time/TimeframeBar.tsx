import { time } from "console";
import { MouseEventHandler, useState } from "react";
import { ITimeframe } from "../../models/Timeframe";
import { minutesToHoursAndMinutes } from "../../util/date-utils";
import { map } from "../../util/math-utils";
import Popup from "../Popup";

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
  const [popup, setPopup] = useState<boolean>(false);

  function getPercentage(minutes: number): number {
    return map(minutes, rangeStart, rangeEnd, 0, 1) * 100;
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setPopup(true)}
      onMouseLeave={() => setPopup(false)}
      className="absolute h-3 bg-slate-800 rounded-full z-10 hover:bg-slate-500 cursor-pointer transition-colors min-w-[1px]"
      style={{
        left: getPercentage(timeframe.start) + "%",
        width: `${getPercentage(
          rangeStart + (timeframe.end - timeframe.start)
        )}%`,
      }}
    >
      <Popup
        visible={popup}
        text={`${minutesToHoursAndMinutes(
          timeframe.start,
          ":"
        )} - ${minutesToHoursAndMinutes(
          timeframe.end,
          ":"
        )}, ${minutesToHoursAndMinutes(timeframe.end - timeframe.start)}`}
      />
    </div>
  );
}

import Clock from "../components/time/Clock";
import { IDay } from "../models/Day";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import TrackingButton from "../components/TrackingButton";
import {
  getDateString,
  getTotalTimeDay,
  getWeekDay,
  hoursAndMinutesToMinutes,
  minutesToHoursAndMinutes,
} from "../util/date-utils";
import { useState } from "react";
import TimeframeBar from "../components/time/TimeframeBar";
import Timeline from "../components/time/Timeline";
import TimeIndicator from "../components/time/TimeIndicator";
import TimeframeDialog, {
  ITimeframeDialogOptions,
  ITimeframeDialogSubmitOptions,
} from "../components/dialog/TimeframeDialog";
import { ITimeframe, Timeframe } from "../models/Timeframe";

interface IProps {
  day: IDay;
  isToday: boolean;
  flipDay: Function;
  tracking: boolean;
  toggleTracking: Function;
  updateTimeframes: Function;
  range: ITimeframe;
}

export default function DayPage({
  day,
  isToday,
  flipDay,
  tracking,
  toggleTracking,
  updateTimeframes,
  range,
}: IProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<ITimeframeDialogOptions>(
    {}
  );

  const timeframeElements = day?.timeframes.map((timeframe) => {
    return (
      <TimeframeBar
        key={timeframe.id}
        timeframe={timeframe}
        rangeStart={range.start}
        rangeEnd={range.end}
        handleClick={() =>
          openDialog({
            edit: true,
            start: minutesToHoursAndMinutes(timeframe.start, ":"),
            end: minutesToHoursAndMinutes(timeframe.end, ":"),
            id: timeframe.id,
          })
        }
      />
    );
  });

  function openDialog(options: ITimeframeDialogOptions) {
    setDialogOptions(options);
    setDialogOpen(true);
  }

  function submitDialog(options?: ITimeframeDialogSubmitOptions) {
    setDialogOpen(false);

    let newDay: IDay;

    if (options?.delete) {
      newDay = {
        ...day,
        timeframes:
          day?.timeframes.filter((timeframe) => timeframe.id !== options.id) ||
          [],
      };
    } else if (options?.start && options.end) {
      if (options.id) {
        newDay = {
          ...day,
          timeframes: day.timeframes.map((timeframe) => {
            return timeframe.id === options.id
              ? new Timeframe(
                  hoursAndMinutesToMinutes(options.start || "", ":"),
                  hoursAndMinutesToMinutes(options.end || "", ":")
                )
              : timeframe;
          }),
        };
      } else {
        newDay = {
          ...day,
          timeframes: [
            ...day.timeframes,
            new Timeframe(
              hoursAndMinutesToMinutes(options.start, ":"),
              hoursAndMinutesToMinutes(options.end, ":")
            ),
          ],
        };
      }
    }

    if (newDay!) {
      updateTimeframes(newDay);
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div
          className={`w-2 h-2 rounded-full mb-3 ${
            isToday ? "bg-blue-400" : "bg-transparent"
          }`}
        ></div>
        <h3 className="-my-2 font-thin text-lg tracking-wider">
          {day && getDateString(day?.date)}
        </h3>
        <div className="w-full px-10 flex flex-row justify-between items-center">
          <FontAwesomeIcon
            className="clickable"
            onClick={() => flipDay(-1)}
            icon={faArrowLeftLong}
            size={"2x"}
          />
          <h1 className="my-0 font-bold text-3xl uppercase tracking-widest">
            {day && getWeekDay(day?.date)}
          </h1>
          <FontAwesomeIcon
            className="clickable"
            onClick={() => flipDay(1)}
            icon={faArrowRightLong}
            size={"2x"}
          />
        </div>
        {isToday && <Clock className="my-0 font-thin text-2xl" />}
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        {isToday && (
          <TrackingButton tracking={tracking} toggleTracking={toggleTracking} />
        )}
      </div>
      <h3
        className="flex justify-center w-full items-center mt-auto text-2xl font-bold tracking-wider bottom-0 absolute"
        style={{ marginBottom: "5.5rem" }}
      >
        {day &&
          day.timeframes.length !== 0 &&
          minutesToHoursAndMinutes(getTotalTimeDay(day))}
      </h3>
      <div className="absolute w-full bottom-16">{timeframeElements}</div>
      <div className="absolute w-full bottom-8 h-9">
        <div
          className="w-full h-full bg-transparent hover:bg-slate-100 cursor-pointer absolute bottom-0 transition-colors"
          onClick={() => openDialog({})}
        ></div>
        <Timeline rangeStart={range.start} rangeEnd={range.end} />
        {isToday && (
          <TimeIndicator rangeStart={range.start} rangeEnd={range.end} />
        )}
      </div>
      {dialogOpen && (
        <TimeframeDialog
          open={dialogOpen}
          onClose={submitDialog}
          edit={dialogOptions.edit}
          start={dialogOptions.start}
          end={dialogOptions.end}
          id={dialogOptions.id}
        />
      )}
    </div>
  );
}

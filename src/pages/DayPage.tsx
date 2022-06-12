import Clock from "../components/Clock";
import { IDay } from "../models/Day";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import TrackingButton from "../components/TrackingButton";
import TimeIndicator from "../components/TimeIndicator";
import { getDateString, getWeekDay } from "../util/date-utils";

interface IProps {
  day?: IDay;
  isToday: boolean;
  flipDay: Function;
  tracking: boolean;
  toggleTracking: Function;
}

export default function DayPage({
  day,
  isToday,
  flipDay,
  tracking,
  toggleTracking,
}: IProps) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div
          className={`w-2 h-2 rounded-full mb-2 ${
            isToday ? "bg-blue-300" : "bg-transparent"
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
      {isToday && (
        <div className="flex justify-center items-center mt-5">
          <TrackingButton tracking={tracking} toggleTracking={toggleTracking} />
        </div>
      )}
      {isToday && (
        <div className="absolute w-full h-2/6 bottom-0">
          <TimeIndicator rangeStart={0} rangeEnd={24} />
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import Clock from "../components/Clock";
import { IDay } from "../models/Day";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  day?: IDay;
  flipDay: Function;
}

export default function DayPage({ day, flipDay }: IProps) {
  return (
    <div className="flex flex-row items-center justify-around px-10">
      <FontAwesomeIcon
        className="cursor-pointer"
        onClick={() => flipDay(-1)}
        icon={faArrowLeftLong}
        size={"2x"}
      />
      <div className="flex flex-col justify-center items-center">
        <h3 className="-my-2 font-thin text-lg tracking-wider">
          {day?.getDateString()}
        </h3>
        <h1 className="my-0 font-bold text-3xl uppercase tracking-widest">
          {day?.getWeekDay()}
        </h1>
        <Clock className="my-0 font-thin text-2xl" />
      </div>
      <FontAwesomeIcon
        className="cursor-pointer"
        onClick={() => flipDay(1)}
        icon={faArrowRightLong}
        size={"2x"}
      />
    </div>
  );
}

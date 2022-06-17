import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Day, IDay } from "./models/Day";
import { ITimeframe, Timeframe } from "./models/Timeframe";
import DayPage from "./pages/DayPage";
import WeekPage from "./pages/WeekPage";
import {
  getDateString,
  getTotalMinutes,
  parseDaysFromLocalStorage,
} from "./util/date-utils";

export interface IDays {
  [date: string]: IDay;
}

export default function App() {
  const [days, setDays] = useState<IDays>(
    parseDaysFromLocalStorage(localStorage.getItem("days")) || {}
  );
  const [currentDay, setCurrentDay] = useState<IDay>(getCurrentDay());
  const [isToday, setIsToday] = useState<boolean>(true);
  const [displayDay, setDisplayDay] = useState<boolean>(true);
  const [tracking, setTracking] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string | undefined>();
  const [range, setRange] = useState<ITimeframe>(
    new Timeframe(6 * 60, 19 * 60)
  );
  // const [tracking, setTracking] = useState<boolean>(
  //   JSON.parse(localStorage.getItem("tracking") || "null") || false
  // );

  useEffect(() => {
    localStorage.setItem("tracking", JSON.stringify(tracking));
  }, [tracking]);

  useEffect(() => {
    if (currentDay.timeframes.length > 0) {
      setDays((prevDays) => ({
        ...prevDays,
        [getDateString(currentDay.date)]: currentDay,
      }));
    } else {
      setDays((prevDays) => {
        const newDays: IDays = {};
        Object.entries(prevDays).map(([key, value]) => {
          if (key !== getDateString(currentDay.date)) {
            newDays[key] = value;
          }
        });
        return newDays;
      });
    }
    setIsToday(currentDay.date.getDate() === new Date().getDate());
  }, [currentDay]);

  useEffect(() => {
    localStorage.setItem("days", JSON.stringify(days));
  }, [days]);

  useEffect(() => {
    if (tracking) {
      const newTimeframe = new Timeframe();
      newTimeframe.tracking = true;
      setCurrentDay((prevCurrentDay) => ({
        ...prevCurrentDay,
        timeframes: [...prevCurrentDay.timeframes, newTimeframe],
      }));
      setTrackingId(newTimeframe.id);
    } else {
      setTrackingId(undefined);
      setCurrentDay((prevCurrentDay) => {
        const timeframes = prevCurrentDay.timeframes.map((timeframe) => {
          if (timeframe.id === trackingId) {
            const newTimeframe = new Timeframe(
              timeframe.start,
              timeframe.end,
              timeframe.id
            );
            return newTimeframe;
          }
          return timeframe;
        });
        return {
          ...prevCurrentDay,
          timeframes,
        };
      });
    }
  }, [tracking]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (trackingId) {
      interval = setInterval(() => {
        setCurrentDay((prevCurrentDay) => {
          const timeframes = prevCurrentDay.timeframes.map((timeframe) => {
            if (timeframe.id === trackingId) {
              const newTimeframe = new Timeframe(
                timeframe.start,
                undefined,
                timeframe.id,
                timeframe.tracking
              );
              return newTimeframe;
            }
            return timeframe;
          });
          return {
            ...prevCurrentDay,
            timeframes,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [trackingId]);

  function getCurrentDay(): IDay {
    const date = new Date();
    if (getDateString(date) in days) {
      return days[getDateString(date)];
    }
    return new Day(date);
  }

  function toggleDisplayName() {
    setDisplayDay((prevDisplayDay) => !prevDisplayDay);
  }

  function flipDay(direction: number) {
    setCurrentDay((prevCurrentDay) => {
      const newDate = new Date(prevCurrentDay.date);
      newDate.setDate(newDate.getDate() + direction);
      if (getDateString(newDate) in days) {
        return days[getDateString(newDate)];
      }
      return new Day(newDate);
    });
  }

  function toggleTracking() {
    setTracking((prevTracking) => !prevTracking);
  }

  function updateTimeframes(day: IDay) {
    setCurrentDay(day);
  }

  function updateRange(range: ITimeframe) {
    setRange(range);
  }

  return (
    <>
      <Header
        displayDay={displayDay}
        handleClick={toggleDisplayName}
        range={range}
        updateRange={updateRange}
      />
      <main className="mt-3">
        {displayDay ? (
          <DayPage
            day={currentDay}
            isToday={isToday}
            flipDay={flipDay}
            tracking={tracking}
            toggleTracking={toggleTracking}
            updateTimeframes={updateTimeframes}
            range={range}
          />
        ) : (
          <WeekPage />
        )}
      </main>
    </>
  );
}

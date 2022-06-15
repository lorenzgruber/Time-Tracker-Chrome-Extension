import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ITimeframe } from "../models/Timeframe";
import ConfigDialog from "./dialog/ConfigDialog";

interface IProps {
  displayDay: boolean;
  handleClick: Function;
  range: ITimeframe;
  updateRange: Function;
}

export default function Header({
  displayDay,
  handleClick,
  range,
  updateRange,
}: IProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  function submitDialog(range?: ITimeframe) {
    setDialogOpen(false);
    if (range) {
      updateRange(range);
    }
  }

  return (
    <header className="px-5">
      <h3
        className="mx-auto text-center uppercase mb-1 mt-2 tracking-widest font-bold clickable"
        onClick={() => handleClick()}
      >
        {displayDay ? "Day" : "Week"}
      </h3>
      <hr className="border-slate-300"></hr>
      <FontAwesomeIcon
        className="absolute top-2 right-2 clickable hover:rotate-45 hover:scale-125"
        onClick={() => setDialogOpen(true)}
        icon={faGear}
      />
      <ConfigDialog
        open={dialogOpen}
        onClose={submitDialog}
        rangeStart={range.start}
        rangeEnd={range.end}
      />
    </header>
  );
}

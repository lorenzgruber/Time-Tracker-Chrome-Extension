import { ChangeEvent, useState } from "react";
import { Timeframe } from "../../models/Timeframe";
import BaseDialog from "./BaseDialog";
import "./dialog.css";

interface IProps {
  open: boolean;
  onClose: Function;
  rangeStart: number;
  rangeEnd: number;
}

export default function CondigDialog({
  open,
  onClose,
  rangeStart,
  rangeEnd,
}: IProps) {
  const [formData, setFormDate] = useState<{
    startTime: string;
    endTime: string;
  }>({
    startTime: (rangeStart / 60).toString(),
    endTime: (rangeEnd / 60).toString(),
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (errorMessage) {
      setErrorMessage("");
    }
    const { name, value } = event.target;
    setFormDate((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function submit() {
    if (
      Number.parseInt(formData.startTime) > 24 ||
      Number.parseInt(formData.startTime) < 0 ||
      Number.parseInt(formData.endTime) > 24 ||
      Number.parseInt(formData.endTime) < 0
    ) {
      setErrorMessage("Please select valid Time!");
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setErrorMessage("Please fill out both fields!");
      return;
    }
    if (
      Number.parseInt(formData.startTime) >= Number.parseInt(formData.endTime)
    ) {
      setErrorMessage("Start must be bevore end!");
      return;
    }
    onClose(
      new Timeframe(
        Number.parseInt(formData.startTime) * 60,
        Number.parseInt(formData.endTime) * 60
      )
    );
  }

  function cancel() {
    onClose();
  }

  return (
    <BaseDialog open={open} onClose={onClose}>
      <h3 className="font-bold uppercase tracking-wider text-lg">
        Timeline Config
      </h3>
      <div className="grid grid-cols-2 gap-2 w-full">
        <label className="dialog-label" htmlFor="start">
          Start
        </label>
        <label className="dialog-label" htmlFor="end">
          End
        </label>
        <input
          className="dialog-input-time"
          type="number"
          name="startTime"
          min={0}
          max={24}
          onChange={(event) => handleChange(event)}
          value={formData.startTime}
        />
        <input
          className="dialog-input-time"
          type="number"
          name="endTime"
          min={0}
          max={24}
          onChange={(event) => handleChange(event)}
          value={formData.endTime}
        />
      </div>
      <div className="text-xs text-red-400 font-bold h-4">{errorMessage}</div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <button className="dialog-button" onClick={submit}>
          Save
        </button>
        <button className="dialog-button cancel" onClick={cancel}>
          Cancel
        </button>
      </div>
    </BaseDialog>
  );
}

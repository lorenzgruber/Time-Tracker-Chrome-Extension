import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type } from "os";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { convertCompilerOptionsFromJson } from "typescript";
import BaseDialog from "./BaseDialog";
import "./dialog.css";

interface IProps {
  open: boolean;
  onClose: Function;
  edit?: boolean;
  start?: string;
  end?: string;
  id?: string;
}

export interface ITimeframeDialogOptions {
  start?: string;
  end?: string;
  edit?: boolean;
  id?: string;
}

export interface ITimeframeDialogSubmitOptions {
  start?: string;
  end?: string;
  delete?: boolean;
  id?: string;
}

export default function TimeframeDialog({
  open,
  onClose,
  edit,
  start,
  end,
  id,
}: IProps) {
  const [formData, setFormDate] = useState<{
    startTime: string;
    endTime: string;
  }>({
    startTime: start || "",
    endTime: end || "",
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
    if (!formData.startTime || !formData.endTime) {
      setErrorMessage("Please fill out both fields!");
      return;
    }
    if (formData.startTime >= formData.endTime) {
      setErrorMessage("Start must be bevore end!");
      return;
    }
    onClose({ start: formData.startTime, end: formData.endTime, id });
  }

  function cancel() {
    onClose({});
  }

  function remove() {
    onClose({ delete: true, id });
  }

  function copyToClipBoard(value: string): void {
    if (value) navigator.clipboard.writeText(value);
  }

  return (
    <BaseDialog open={open} onClose={onClose}>
      <div className="flex flex-row">
        <h3 className="font-bold uppercase tracking-wider text-lg">
          {edit ? "Edit" : "Add"} Timeframe
        </h3>
        {edit && (
          <button className="absolute right-3">
            <FontAwesomeIcon
              onClick={remove}
              icon={faTrash}
              className="text-slate-800 hover:scale-110 transition-transform"
            />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <label className="dialog-label" htmlFor="start">
          Start
        </label>
        <label className="dialog-label" htmlFor="end">
          End
        </label>
        <input
          className="dialog-input-time"
          type="time"
          name="startTime"
          onChange={(event) => handleChange(event)}
          value={formData.startTime}
        />
        <input
          className="dialog-input-time"
          type="time"
          name="endTime"
          onChange={(event) => handleChange(event)}
          value={formData.endTime}
        />
        <span
          className={`dialog-copy-message${
            formData.startTime ? " cursor-pointer" : ""
          }`}
          onClick={() => copyToClipBoard(formData.startTime)}
        >
          {formData.startTime && "Copy to clipboard"}
        </span>
        <span
          className={`dialog-copy-message${
            formData.endTime ? " cursor-pointer" : ""
          }`}
          onClick={() => copyToClipBoard(formData.endTime)}
        >
          {formData.endTime && "Copy to clipboard"}
        </span>
      </div>
      <div className="text-xs text-red-400 font-bold h-4">{errorMessage}</div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <button className="dialog-button" onClick={submit}>
          {edit ? "Edit" : "Add"}
        </button>
        <button className="dialog-button cancel" onClick={cancel}>
          Cancel
        </button>
      </div>
    </BaseDialog>
  );
}

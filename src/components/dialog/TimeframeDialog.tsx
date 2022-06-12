import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type } from "os";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { convertCompilerOptionsFromJson } from "typescript";
import "./timeframeDialog.css";

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

export default function Dialog({
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
    onClose();
  }

  function remove() {
    onClose({ delete: true, id });
  }

  return (
    <>
      {open && (
        <div className="absolute top-0 w-full h-full z-20 bg-opacity-50 bg-black flex justify-center items-center">
          <div className="relative p-3 w-3/4 h-1/2 bg-white rounded shadow-lg flex flex-col justify-between items-center">
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
            </div>
            <div className="text-xs text-red-400 font-bold h-4">
              {errorMessage}
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <button className="dialog-button" onClick={submit}>
                {edit ? "Edit" : "Add"}
              </button>
              <button className="dialog-button cancel" onClick={cancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

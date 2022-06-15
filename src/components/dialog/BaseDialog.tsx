import { ReactNode } from "react";

interface IProps {
  open: boolean;
  onClose: Function;
  children?: ReactNode;
}

export default function BaseDialog({ open, onClose, children }: IProps) {
  return (
    <>
      {open && (
        <div className="absolute left-0 top-0 w-full h-full z-20 bg-opacity-50 bg-black flex justify-center items-center">
          <div className="relative z-30 p-3 w-3/4 h-1/2 bg-white rounded shadow-lg flex flex-col justify-between items-center">
            {children}
          </div>
          <div
            className="absolute left-0 top-0 w-full h-full opacity-0"
            onClick={() => onClose()}
          ></div>
        </div>
      )}
    </>
  );
}

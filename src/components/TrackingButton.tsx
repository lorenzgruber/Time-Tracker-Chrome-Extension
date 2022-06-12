import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  tracking: boolean;
  toggleTracking: Function;
}

export default function TrackingButton({ tracking, toggleTracking }: IProps) {
  return (
    <button
      className="bg-slate-800 text-xl text-white flex justify-center items-center w-10 h-10 rounded-full clickable"
      onClick={() => toggleTracking()}
    >
      {tracking ? (
        <FontAwesomeIcon
          icon={faPlay}
          className="trans"
          style={{ transform: "translateX(1px)" }}
        />
      ) : (
        <FontAwesomeIcon icon={faPause} className="" />
      )}
    </button>
  );
}

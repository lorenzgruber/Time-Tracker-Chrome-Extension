interface IProps {
  visible: boolean;
  text: string;
}

export default function Popup({ visible, text }: IProps) {
  return (
    <div
      className={`absolute w-max -translate-y-[120%] -translate-x-1/2 left-1/2 text-xs font-thin bg-slate-800 bg-opacity-70 text-white rounded p-1 transition-all ${
        visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      {text}
    </div>
  );
}

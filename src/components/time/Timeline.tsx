import { map } from "../../util/math-utils";

interface IProps {
  rangeStart: number;
  rangeEnd: number;
}

export default function Timeline({ rangeStart, rangeEnd }: IProps) {
  let hourIndicatorElements = [];
  for (let i = rangeStart / 60 + 1; i <= rangeEnd / 60 - 1; i++) {
    hourIndicatorElements.push(
      <div
        key={i}
        //@ts-ignore
        before={i}
        className="absolute w-px h-2 bg-slate-300 bottom-0
        before:content-[attr(before)] before:text-slate-800 before:absolute before:top-3 before:left-1/2 before:-translate-x-1/2"
        style={{
          left: `${getPercentage(i * 60)}%`,
          fontSize: "10px",
          lineHeight: "8px",
        }}
      ></div>
    );
  }

  function getPercentage(minutes: number): number {
    return map(minutes, rangeStart, rangeEnd, 0, 1) * 100;
  }

  return (
    <div className="pointer-events-none">
      <div className="w-full h-px bg-slate-300 bottom-0 absolute"></div>
      {hourIndicatorElements}
    </div>
  );
}

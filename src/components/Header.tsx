interface IProps {
  displayDay: boolean;
  handleClick: Function;
}

export default function Header({ displayDay, handleClick }: IProps) {
  return (
    <header className="px-5">
      <h3
        className="text-center uppercase mb-1 mt-2 tracking-widest font-bold cursor-pointer"
        onClick={() => handleClick()}
      >
        {displayDay ? "Day" : "Week"}
      </h3>
      <hr></hr>
    </header>
  );
}

import { toMinutesAndSeconds } from "../app";

const Timer = ({
  time,
  setStreak,
}: {
  time: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div
      class={`roboto-medium text-8xl select-none z-10`}
      onDblClick={() => {
        setStreak(0);
      }}
    >
      {toMinutesAndSeconds(time)}
    </div>
  );
};

export default Timer;

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
      class={`roboto-medium text-8xl select-none`}
      onDblClick={() => {
        setStreak(0);
      }}
    >
      {toMinutesAndSeconds(time)}
    </div>
  );
};

export default Timer;

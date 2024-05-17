import { toMinutesAndSeconds } from "../app";

const Timer = ({ time }: { time: number }) => {
  return (
    <div class={`roboto-medium text-8xl`}>{toMinutesAndSeconds(time)}</div>
  );
};

export default Timer;

import { useState, useEffect } from "preact/hooks";
import Control from "./components/Control";
import Timer from "./components/Timer";
import Timers from "./components/Timers";

export const toMinutesAndSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

export function App() {
  const [time, setTime] = useState(1500);
  const timers = {
    focus: 1500,
    shortBreak: 300,
    longBreak: 1800,
  };
  const [currentTimer, setCurrentTimer] = useState(timers.focus);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        document.title = `Time: ${toMinutesAndSeconds(time)}`;
        console.log(time);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running]);

  useEffect(() => {
    pause();
    setTime(currentTimer);
  }, [currentTimer]);

  const start = () => {
    console.log("start");
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
    console.log("stop");
  };

  const reset = () => {
    console.log("reset");
    setTime(currentTimer);
    pause();
  };

  return (
    <main
      className={`w-screen h-screen flex flex-col justify-around items-center bg-red-500 text-white roboto-regular`}
    >
      {/* timers */}
      <Timers
        timers={timers}
        currentTimer={currentTimer}
        setCurrentTimer={setCurrentTimer}
      />

      {/* timer */}
      <Timer time={time} />

      {/* control */}
      <Control start={start} pause={pause} reset={reset} />
    </main>
  );
}

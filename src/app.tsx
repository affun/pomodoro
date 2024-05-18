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
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(1500);
  const timers = {
    focus: 25,
    shortBreak: 5,
    longBreak: 30,
  };
  const [currentTimer, setCurrentTimer] = useState(timers.focus);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          console.log(prevTime);

          if (prevTime > 0) {
            return prevTime - 1;
          }
          if (currentTimer == timers.focus) {
            setStreak((prevStreak) => {
              if ((prevStreak + 1) % 4 == 0) {
                setCurrentTimer(timers.longBreak);
              } else {
                setCurrentTimer(timers.shortBreak);
              }
              return prevStreak + 1;
            });

            // } else if (currentTimer == timers.shortBreak) {
            //   setCurrentTimer(timers.longBreak);
          } else {
            setCurrentTimer(timers.focus);
          }
          pause();
          setTime(currentTimer);
          console.log("streak", streak);
          return prevTime;
        });

        document.title = `${
          currentTimer == timers.focus ? "Focus" : "Break"
        } - ${toMinutesAndSeconds(time)}`;
      }, 100);
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
      className={`w-screen h-screen flex flex-col justify-between py-28 items-center bg-red-500 text-white roboto-regular`}
    >
      {/* timers */}
      <Timers
        timers={timers}
        currentTimer={currentTimer}
        setCurrentTimer={setCurrentTimer}
        setStreak={setStreak}
      />

      {/* timer */}
      <Timer time={time} />

      {/* control */}
      <Control
        start={start}
        pause={pause}
        reset={reset}
        running={running}
        time={time}
        currentTimer={currentTimer}
      />
    </main>
  );
}

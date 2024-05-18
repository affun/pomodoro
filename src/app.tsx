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
  const [accent, setAccent] = useState({
    bg: "bg-red-500",
    text: "text-red-500",
  });

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
              if (prevStreak + 1 == 4) {
                setCurrentTimer(timers.longBreak);
              } else {
                setCurrentTimer(timers.shortBreak);
              }
              // changeTheme(currentTimer);
              return prevStreak >= 4 ? 0 : prevStreak + 1;
            });

            // } else if (currentTimer == timers.shortBreak) {
            //   setCurrentTimer(timers.longBreak);
          } else {
            setStreak((prevStreak) => {
              return prevStreak >= 4 ? 0 : prevStreak;
            });
            setCurrentTimer(timers.focus);
            // changeTheme(currentTimer);
          }
          pause();
          setTime(currentTimer);
          console.log("streak", streak);
          return prevTime;
        });

        document.title = `${
          currentTimer == timers.focus ? "Focus" : "Break"
        } - ${toMinutesAndSeconds(time)}`;
      }, 10);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running]);
  const changeTheme = (paramTimer?: number) => {
    console.log(`changing theme to ${paramTimer ?? currentTimer}`);

    setAccent(() => {
      if (paramTimer ?? currentTimer == timers.shortBreak) {
        return {
          bg: "bg-green-400",
          text: "text-green-400",
        };
      }
      if (paramTimer ?? currentTimer == timers.longBreak) {
        return {
          bg: "bg-teal-500",
          text: "text-teal-500",
        };
      }
      return {
        bg: "bg-red-500",
        text: "text-red-500",
      };
    });
  };

  useEffect(() => {
    pause();
    changeTheme();
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
      className={`w-screen h-screen flex flex-col justify-between py-28 items-center transition-all duration-500 ${accent.bg} text-white roboto-regular`}
    >
      {/* timers */}
      <Timers
        timers={timers}
        currentTimer={currentTimer}
        setCurrentTimer={setCurrentTimer}
        setStreak={setStreak}
        accent={accent}
      />

      {/* timer */}
      <div className={`flex flex-col items-center justify-center`}>
        <Timer time={time} setStreak={setStreak} />
        <div className={`flex items-center justify-center gap-4`}>
          <div
            className={`w-2 h-2 bg-white rounded ${
              streak > 0 ? "opacity-100" : "opacity-25"
            }`}
            onDblClick={() => {
              setStreak(1);
            }}
          ></div>
          <div
            className={`w-2 h-2 bg-white rounded ${
              streak > 1 ? "opacity-100" : "opacity-25"
            }`}
            onDblClick={() => {
              setStreak(2);
            }}
          ></div>
          <div
            className={`w-2 h-2 bg-white rounded ${
              streak > 2 ? "opacity-100" : "opacity-25"
            }`}
            onDblClick={() => {
              setStreak(3);
            }}
          ></div>
          <div
            className={`w-2 h-2 bg-white rounded ${
              streak > 3 ? "opacity-100" : "opacity-25"
            }`}
            onDblClick={() => {
              setStreak(4);
            }}
          ></div>
        </div>
      </div>

      {/* control */}
      <Control
        start={start}
        pause={pause}
        reset={reset}
        running={running}
        time={time}
        currentTimer={currentTimer}
        accent={accent}
      />
    </main>
  );
}

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
    focus: 1500,
    shortBreak: 300,
    longBreak: 1800,
  };
  const [currentTimer, setCurrentTimer] = useState(timers.focus);
  const [running, setRunning] = useState(false);
  const [accent, setAccent] = useState({
    bg: "bg-red-500",
    text: "text-red-500",
  });
  const [sweepAngle, setSweepAngle] = useState(360);

  useEffect(() => {
    let interval: number | null = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          console.log(prevTime);

          if (prevTime > 0) {
            setSweepAngle((prevTime / currentTimer) * 360);

            return prevTime - 1;
          }
          setSweepAngle(0);

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
    setSweepAngle(0);

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

  const calculatePath = (angle: number) => {
    const radius = 50;
    const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));
    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M50,50 L50,0 A50,50 0 ${largeArcFlag},1 ${x},${y} Z`;
  };

  const getColor = () => {
    if (accent.bg === "bg-red-500") return "#ef4444";
    if (accent.bg === "bg-green-400") return "#4ade80";
    if (accent.bg === "bg-teal-500") return "#14b8a6";
    return "#ffffff";
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
      <div
        className={`flex flex-col items-center justify-center overflow-visible`}
      >
        {/* <svg className={`absolute bg-gray-400 max-w-sm aspect-square w-4/5`}>
          <path
            d={`M 50% 50%
           m 0, -50%
           a 50%,50% 0 0,1 ${sweepAngle} 100%`}
            fill="white"
          />
        </svg> */}
        <svg
          className={`absolute max-w-sm aspect-square w-4/5`}
          viewBox="0 0 100 100"
        >
          <path d={calculatePath(sweepAngle)} fill="white" />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill={getColor()}
            className="transition-all duration-500"
          />
        </svg>
        <Timer time={time} setStreak={setStreak} />
        <div className={`flex items-center justify-center gap-4 z-10`}>
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

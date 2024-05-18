import React from "preact/compat";

interface Timers {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

interface Params {
  timers: Timers;
  currentTimer: number;
  setCurrentTimer: React.Dispatch<React.SetStateAction<number>>;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  accent: {
    text: string;
    bg: string;
  };
}

const Timers = ({
  timers,
  currentTimer,
  setCurrentTimer,
  setStreak,
  accent,
}: Params) => {
  console.log(currentTimer);

  const style = {
    timer: {
      default: "font-medium relative px-2 timer-btn",

      active: `font-medium relative px-2 ${accent.text} z-10 timer-btn-active`,
    },
  };

  return (
    <div className={`flex gap-4`}>
      {/* Suggested code may be subject to a license. Learn more: ~LicenseLog:738985320. */}
      <button
        onClick={() => {
          setCurrentTimer(timers.focus);
        }}
        className={
          currentTimer === timers.focus
            ? style.timer.active
            : style.timer.default
        }
      >
        Focus
      </button>
      <button
        onClick={() => {
          setCurrentTimer(timers.shortBreak);
        }}
        className={
          currentTimer === timers.shortBreak
            ? style.timer.active
            : style.timer.default
        }
      >
        Short Break
      </button>
      <button
        onClick={() => {
          setCurrentTimer(timers.longBreak);
          setStreak(0);
        }}
        className={
          currentTimer === timers.longBreak
            ? style.timer.active
            : style.timer.default
        }
      >
        Long Break
      </button>
    </div>
  );
};

export default Timers;

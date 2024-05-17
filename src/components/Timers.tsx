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
}

const Timers = ({ timers, currentTimer, setCurrentTimer }: Params) => {
  console.log(currentTimer);

  return (
    <div>
      {/* Suggested code may be subject to a license. Learn more: ~LicenseLog:738985320. */}
      <button onClick={() => setCurrentTimer(timers.focus)}>Focus</button>
      <button onClick={() => setCurrentTimer(timers.shortBreak)}>
        Short Break
      </button>
      <button onClick={() => setCurrentTimer(timers.longBreak)}>
        Long Break
      </button>
    </div>
  );
};

export default Timers;

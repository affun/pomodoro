import { useEffect } from "preact/hooks";

interface Params {
  start: () => void;
  reset: () => void;
  pause: () => void;
  running: boolean;
  time: number;
  currentTimer: number;
}

const Control = (params: Params) => {
  useEffect(() => {
    console.log("time:", params.time);
  }, [params.time]);

  const style = {
    btn: "uppercase text-lg w-full rounded-md roboto-medium transition-all duration-300 ease-in-out",
  };
  return (
    <div className="flex flex-row items-center justify-between h-16 w-52">
      {/* <div className={`flex justify-between`}> */}
      <button
        onClick={params.reset}
        class={`${style.btn} border-2 border-white text-white ${
          params.running || params.currentTimer == params.time ? "hidden" : ""
        }`}
      >
        reset
      </button>

      <button
        onClick={params.start}
        class={`${
          style.btn
        } border-2 border-white bg-white hover:bg-gray-100 text-red-500 ${
          // Suggested code may be subject to a license. Learn more: ~LicenseLog:660615155.
          params.running ? "hidden" : ""
        }`}
      >
        {params.currentTimer == params.time ? "Start" : "Resume"}
      </button>

      <button
        onClick={params.pause}
        class={`${
          style.btn
        } border-2 border-white bg-white hover:bg-gray-100 text-red-500 ${
          params.running ? "" : "hidden"
        }`}
      >
        Pause
      </button>

      {/* <button
          onClick={params.start}
          class={`${style.btn} bg-green-500 hover:bg-green-400 text-white ${
            params.running || params.currentTimer == params.time ? "hidden" : ""
          }`}
        >
          Resume
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default Control;

interface Params {
  start: () => void;
  reset: () => void;
  pause: () => void;
}

const Control = (control: Params) => {
  const style = {
    btn: "uppercase text-xl py-1 px-4 rounded-md transition-all duration-300 ease-in-out",
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={control.start}
        class={`${style.btn} bg-white hover:bg-gray-100 text-red-500`}
      >
        Start
      </button>
      <div className={`flex justify-between`}>
        <button
          onClick={control.reset}
          class={`${style.btn} border-2 border-white text-white`}
        >
          reset
        </button>
        <button
          onClick={control.pause}
          class={`${style.btn} bg-yellow-500 hover:bg-yellow-400 text-white`}
        >
          Pause
        </button>
        <button
          onClick={control.start}
          class={`${style.btn} bg-green-500 hover:bg-green-400 text-white`}
        >
          Resume
        </button>
      </div>
    </div>
  );
};

export default Control;

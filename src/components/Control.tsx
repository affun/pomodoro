interface Params {
  start: () => void;
  reset: () => void;
  pause: () => void;
}

const Control = (control: Params) => {
  const style = {
    btn: "text-white uppercase text-xl py-1 px-4 rounded-md transition-all duration-300 ease-in-out",
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={control.start}
        class={`${style.btn} bg-white text-red-500 hover:bg-gray-100`}
      >
        Start
      </button>
      <div className={`flex justify-between`}>
        <button
          onClick={control.reset}
          class={`${style.btn} border-2 border-white`}
        >
          reset
        </button>
        <button
          onClick={control.pause}
          class={`${style.btn} bg-yellow-500 hover:bg-yellow-400`}
        >
          Pause
        </button>
        <button
          onClick={control.start}
          class={`${style.btn} bg-green-500 hover:bg-green-400`}
        >
          Resume
        </button>
      </div>
    </div>
  );
};

export default Control;

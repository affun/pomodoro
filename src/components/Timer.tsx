const Timer = ({ time }: { time: number }) => {
  const toMinutesAndSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return <div>{toMinutesAndSeconds(time)}</div>;
};

export default Timer;

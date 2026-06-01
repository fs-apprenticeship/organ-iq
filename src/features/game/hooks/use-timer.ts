import { useEffect, useState } from "react";

export function useTimer(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  function resetTimer() {
    setSeconds(0);
  }

  return { seconds, resetTimer };
}

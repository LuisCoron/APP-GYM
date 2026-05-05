import React, { createContext, useState, useContext, useEffect } from 'react';

type TimerContextType = {
  timeLeft: number;
  isActive: boolean;
  initialTime: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  setPreset: (seconds: number) => void;
  addTime: (seconds: number) => void;
  setTimeLeft: (seconds: number) => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(90);
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(90);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(initialTime);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const setPreset = (seconds: number) => {
    setIsActive(false);
    setInitialTime(seconds);
    setTimeLeft(seconds);
  };

  const addTime = (seconds: number) => {
    setTimeLeft((prev) => prev + seconds);
    setInitialTime((prev) => prev + seconds);
  };

  return (
    <TimerContext.Provider value={{
      timeLeft, isActive, initialTime, toggleTimer, resetTimer, setPreset, addTime, setTimeLeft
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
}

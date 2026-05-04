import React, { createContext, useState, useContext } from 'react';

export type WorkoutSet = {
  id: string;
  weight: string;
  reps: string;
  completed: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  sets: WorkoutSet[];
};

export type WorkoutSession = {
  id: string;
  name: string;
  date: string;
  duration: string;
  volume: string;
  exercises: Exercise[];
};

type WorkoutContextType = {
  history: WorkoutSession[];
  addWorkout: (workout: WorkoutSession) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<WorkoutSession[]>([]);

  const addWorkout = (workout: WorkoutSession) => {
    setHistory([workout, ...history]);
  };

  return (
    <WorkoutContext.Provider value={{ history, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkoutContext must be used within a WorkoutProvider');
  }
  return context;
}

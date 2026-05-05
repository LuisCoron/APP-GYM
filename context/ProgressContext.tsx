import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProgressEntry = {
  id: string;
  date: string; // e.g. "04/05/2026"
  timestamp: number;
  weight: string;
  waist?: string;
  chest?: string;
  hips?: string;
  photoUri?: string;
};

type ProgressContextType = {
  history: ProgressEntry[];
  addEntry: (entry: Omit<ProgressEntry, 'id' | 'timestamp'>) => Promise<void>;
  isLoading: boolean;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = '@progress_history';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue) as ProgressEntry[];
        // Sort by timestamp descending (newest first)
        data.sort((a, b) => b.timestamp - a.timestamp);
        setHistory(data);
      }
    } catch (e) {
      console.error('Failed to load progress history', e);
    } finally {
      setIsLoading(false);
    }
  };

  const addEntry = async (entryData: Omit<ProgressEntry, 'id' | 'timestamp'>) => {
    try {
      const newEntry: ProgressEntry = {
        ...entryData,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      const updatedHistory = [newEntry, ...history];
      updatedHistory.sort((a, b) => b.timestamp - a.timestamp);
      
      setHistory(updatedHistory);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Failed to save progress entry', e);
    }
  };

  return (
    <ProgressContext.Provider value={{ history, addEntry, isLoading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgressContext must be used within a ProgressProvider');
  }
  return context;
}

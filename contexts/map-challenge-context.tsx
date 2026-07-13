import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChallengeContextValue, CompletedStatus } from '../types/map-challenge';

const ChallengeContext = createContext<ChallengeContextValue | undefined>(
  undefined
);

const STORAGE_KEY = 'map-challenge-completions';

interface ChallengeProviderProps {
  children: ReactNode;
}

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [completed, setCompleted] = useState<CompletedStatus>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadCompleted = async (): Promise<void> => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setCompleted(JSON.parse(raw) as CompletedStatus);
        }
      } catch (err) {
        console.warn('Failed to load challenge completions:', err);
      } finally {
        setIsLoaded(true);
      }
    };
    loadCompleted();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(completed)).catch(
      (err: unknown) => console.warn('Failed to save challenge completions:', err)
    );
  }, [completed, isLoaded]);

  const completeChallenge = (id: string): void => {
    setCompleted((prev) => ({ ...prev, [id]: true }));
  };

  const resetChallenge = (id: string): void => {
    setCompleted((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const isCompleted = (id: string): boolean => !!completed[id];

  const value: ChallengeContextValue = {
    completed,
    completeChallenge,
    resetChallenge,
    isCompleted,
    isLoaded,
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenges(): ChallengeContextValue {
  const ctx = useContext(ChallengeContext);
  if (ctx === undefined) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return ctx;
}
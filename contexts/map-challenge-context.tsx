import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChallengeContextValue, CompletedStatus } from '../types/map-challenge';

const ChallengeContext = createContext<ChallengeContextValue | undefined>(
  undefined
);

interface ChallengeProviderProps {
  children: ReactNode;
}

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [completed, setCompleted] = useState<CompletedStatus>({});

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
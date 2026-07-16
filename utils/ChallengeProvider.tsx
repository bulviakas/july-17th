import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChallengeContextValue, CompletedMap, PhotoMap } from '../types/ChallengeContextValue';

const ChallengeContext = createContext<ChallengeContextValue | undefined>(
  undefined
);

const COMPLETED_STORAGE_KEY = 'challenge-completions';
const PHOTOS_STORAGE_KEY = 'challenge-photos';

interface ChallengeProviderProps {
  children: ReactNode;
}

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [completed, setCompleted] = useState<CompletedMap>({});
  const [photos, setPhotos] = useState<PhotoMap>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadSaved = async (): Promise<void> => {
      try {
        const [rawCompleted, rawPhotos] = await Promise.all([
          AsyncStorage.getItem(COMPLETED_STORAGE_KEY),
          AsyncStorage.getItem(PHOTOS_STORAGE_KEY),
        ]);
        if (rawCompleted) {
          setCompleted(JSON.parse(rawCompleted) as CompletedMap);
        }
        if (rawPhotos) {
          setPhotos(JSON.parse(rawPhotos) as PhotoMap);
        }
      } catch (err) {
        console.warn('Failed to load challenge data:', err);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSaved();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(
      COMPLETED_STORAGE_KEY,
      JSON.stringify(completed)
    ).catch((err) => console.warn('Failed to save completions:', err));
  }, [completed, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(photos)).catch(
      (err) => console.warn('Failed to save photos:', err)
    );
  }, [photos, isLoaded]);

  const completeChallenge = (id: string): void => {
    setCompleted((prev) => ({ ...prev, [id]: true }));
  };

  const resetChallenge = (id: string): void => {
    setCompleted((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setPhotos((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const isCompleted = (id: string): boolean => !!completed[id];

  const setChallengePhoto = (id: string, uri: string): void => {
    setPhotos((prev) => ({ ...prev, [id]: uri }));
  };

  const getChallengePhoto = (id: string): string | undefined => photos[id];

  const value: ChallengeContextValue = {
    completed,
    completeChallenge,
    resetChallenge,
    isCompleted,
    photos,
    setChallengePhoto,
    getChallengePhoto,
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
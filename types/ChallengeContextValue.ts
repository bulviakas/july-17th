export type CompletedMap = Record<string, boolean>;
 

export type PhotoMap = Record<string, string>;
 
export interface ChallengeContextValue {
  completed: CompletedMap;
  completeChallenge: (id: string) => void;
  resetChallenge: (id: string) => void;
  isCompleted: (id: string) => boolean;
  photos: PhotoMap;
  setChallengePhoto: (id: string, uri: string) => void;
  getChallengePhoto: (id: string) => string | undefined;
  isLoaded: boolean;
}

export interface MapChallenge {
  id: string;
  title: string;
  description: string;
}

export type CompletedStatus = Record<string, boolean>;

export interface ChallengeContextValue {
  completed: CompletedStatus;
  completeChallenge: (id: string) => void;
  resetChallenge: (id: string) => void;
  isCompleted: (id: string) => boolean;
}
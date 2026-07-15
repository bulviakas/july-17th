import { ImageSourcePropType } from "react-native";

export interface PhotoChallenge {
  id: string;
  title: string;
  exampleImage: ImageSourcePropType;
  creditText: string;
}

export type CompletedStatus = Record<string, boolean>;

export interface ChallengeContextValue {
  completed: CompletedStatus;
  completeChallenge: (id: string) => void;
  resetChallenge: (id: string) => void;
  isCompleted: (id: string) => boolean;
  isLoaded: boolean;
}
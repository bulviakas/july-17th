import { ImageSourcePropType } from "react-native";

export interface MapChallenge {
  id: string;
  title: string;
  placeDescription: string;
  image: ImageSourcePropType;
  quest: string;
}

export type CompletedStatus = Record<string, boolean>;

export interface ChallengeContextValue {
  completed: CompletedStatus;
  completeChallenge: (id: string) => void;
  resetChallenge: (id: string) => void;
  isCompleted: (id: string) => boolean;
  isLoaded: boolean;
}
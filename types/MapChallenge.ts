import { ImageSourcePropType } from "react-native";
import { BaseChallenge } from './BaseChallenge';
 
export interface MapChallenge extends BaseChallenge {
  placeDescription: string;
  image: ImageSourcePropType;
  quest: string;
}

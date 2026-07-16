import { ImageSourcePropType } from 'react-native';
import { BaseChallenge } from './BaseChallenge';
 
export interface PhotoChallenge extends BaseChallenge {
  exampleImage: ImageSourcePropType | string;
  creditText: string;
}

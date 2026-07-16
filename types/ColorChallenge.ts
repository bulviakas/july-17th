import { BaseChallenge } from "./BaseChallenge";

export interface ColorChallenge extends BaseChallenge {
    hex: string;
}

export interface ColorCategory {
    id: string;
    label: string;
}
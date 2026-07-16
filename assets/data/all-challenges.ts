import { COLOR_CATEGORIES } from '@/assets/data/color-categories';
import { COLOR_CHALLENGES } from '@/assets/data/color-challenges';
import { MAP_CHALLENGES } from '@/assets/data/map-challenges';
import { PHOTO_CHALLENGES } from '@/assets/data/photo-challenges';
import { getSlotId } from '@/utils/ColorSlotId';

export const ALL_CHALLENGE_IDS: string[] = [
  ...MAP_CHALLENGES.map((c) => c.id),
  ...PHOTO_CHALLENGES.map((c) => c.id),
  ...COLOR_CHALLENGES.flatMap((colour) =>
    COLOR_CATEGORIES.map((cat) => getSlotId(colour.id, cat.id))
  ),
];

export const TOTAL_CHALLENGE_COUNT = ALL_CHALLENGE_IDS.length;
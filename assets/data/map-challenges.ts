import { MapChallenge } from '../../types/map-challenge';

const TowerImage = require('../images/tower.png');

export const CHALLENGES: MapChallenge[] = [
  {
    id: 'c1',
    title: 'Quest #1',
    placeDescription: 'Bla bla bla',
    image: TowerImage,
    quest: 'Turn around 3 times',
  },
  {
    id: 'c2',
    title: 'Quest #2',
    placeDescription: 'Bish bash bosh',
    image: TowerImage,
    quest: 'Say "Love you!"',
  },
  {
    id: 'c3',
    title: 'Quest #3',
    placeDescription: "Ladadeeda~",
    image: TowerImage,
    quest: 'Idk something',
  },
];
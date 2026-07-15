import { MapChallenge } from '@/types/MapChallenge';

const TowerImage = require('../images/tower.png');
const RiverImage = require('../images/river.png');
const RobotImage = require('../images/lawn_robots.jpg');
const LakesImage = require('../images/lakes.jpg');
const TempImage = require('../images/whoops.png');

export const MAP_CHALLENGES: MapChallenge[] = [
  {
    id: 'c1',
    title: "Ain't That Rocket Science?",
    placeDescription: "One man can do it in an afternoon, two friends will do it in 3 days. And now it's a core part of the cool aunt/uncle lore~",
    image: TowerImage,
    quest: 'Išvardinti bent 7 ir bet kur surasti bent 5 ant raketos nupieštus elementus.',
  },
  {
    id: 'c2',
    title: 'Vilnelės Akmenukai',
    placeDescription: "Kur tikrai auga mūsų pasodinti trešnių medeliai, o prie upelio ilsisi geltonos boružėlės, net Google Maps neparodo tokių shortcut'ų...",
    image: RiverImage,
    quest: 'Sukurti dar vieną mozaiką iš pakelėje pasitaikiusių akmenėlių (papildomi taškai už Vilnelės globotinius).',
  },
  {
    id: 'c3',
    title: 'Arčiausias Azijos Kampelis',
    placeDescription: "Kartais norisi bent šiek tiek priartėti prie vieno iš išsvajotų kelionės tikslų, net jei tai netikėtai pasitaiko šalia dviračių tako ir savo kuprinėje netyčia turi avietinio tortuko. Tiesa, vietos pažiba gali tapti pats kukliausias aplinkos elementas...",
    image: RobotImage,
    quest: 'Apytiksliai apskaičiuoti, kiek laiko užtrunka nupjauti visą pasiekiamą žolės plotą.',
  },
  {
    id: 'c4',
    title: 'Šlapias Kelmas Dviems',
    placeDescription: 'Kur krenta ne tik lietus, bet ir dviračių ratai, po viena striuke vyksta aistringos diskusijos apie geriausius vaisius. Dežutė apelsinų praktiškai dreba iš baimės laukdama savo teismo nuosprendžio.',
    image: TempImage,
    quest: 'Iš sąrašo atspėti kuo daugiau vienas kito mėgstamų/nemėgstamų vaisių.',
  },
  {
    id: 'c5',
    title: 'Tarp Laukinių Gėlių',
    placeDescription: 'Svarbiausia ignoruoti tą šurmulingą gatvę už nugaros. Bet šiaip visai romantiška slapta vietelė norint pagulėti žolytėje ir gal net padainuoti~',
    image: LakesImage,
    quest: 'Išsirinkti ir kartu padainuoti bent 3 pilnas dainas.',
  },
  {
    id: 'c6',
    title: 'Geriausia Pietų Pertrauka',
    placeDescription: 'Kas galėjo pagalvoti, kad eilinė pietų pertrauka po muziejaus darbeliu gali tapti tokia įsimintina. Na bet viskam pirmas kartas ;)',
    image: TempImage,
    quest: 'Doodles! Pripildyti visą knygelės puslapį įvairių aplinkoje pamatytų elementų piešinėliais.',
  },
  {
    id: 'c7',
    title: 'Burbulų Mišrainė',
    placeDescription: 'Ten kalbos pilasi ne paprastos rūšies arbata - saldūs burbuliukai sužvelnina kiekvieną pokalbį. O kiekvienas apkabinimas primena, jog viskas bus gerai.',
    image: TempImage,
    quest: 'Iš aplinkoje randamų raidžių siluetų vienas kitam sudėlioti trumpą palinkėjimą ateinantiems metams kartu.\n\n(Bonus iššūkis: šalia užšokti paimti burbulinės arbatos)',
  },
];

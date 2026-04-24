// SOURCE: Public venue information — Salt Lake City
// Watch party venues are real Salt Lake City establishments.
import { WatchParty } from './types';

export const deltaCenter = {
  name: 'Delta Center',
  address: '301 S Temple, Salt Lake City, UT 84101',
  gatesOpen: 'TBD — check utahmammoth.com for gate times',
  clearBagPolicy: true,
  transit: 'TRAX Blue/Green Line to Arena station',
  preGamePlaza: 'TBD — check official team sources',
};

export const watchParties: WatchParty[] = [
  {
    name: 'The Depot',
    address: '13 N 400 W, Salt Lake City, UT 84101',
    lat: 40.7688,
    lng: -111.9044,
    details: 'Historic live music venue in the Gateway district.',
  },
  {
    name: "Gracie's",
    address: '326 S West Temple, Salt Lake City, UT 84101',
    lat: 40.7628,
    lng: -111.9013,
    details: 'Neighborhood bar near Delta Center.',
  },
  {
    name: 'Lake Effect',
    address: '155 W 200 S, Salt Lake City, UT 84101',
    lat: 40.7644,
    lng: -111.8982,
    details: 'Craft cocktail bar in downtown SLC.',
  },
  {
    name: 'Ice Haus',
    address: 'Delta Center Plaza, Salt Lake City, UT',
    lat: 40.7683,
    lng: -111.9011,
    details: 'Official team bar at Delta Center.',
  },
];

export const chants = [
  { name: 'TUSKS UP!', description: 'The signature rally cry. Arms up, fists clenched.' },
  { name: 'DEFEND THE CLIMB', description: 'Chanted during defensive stands.' },
  { name: 'LET\'S GO MAMMOTH', description: 'Classic three-beat chant.' },
];

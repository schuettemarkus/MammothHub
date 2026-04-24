// SOURCE: NHL Stats API — /api/v1/teams
import { Team } from './types';

export const teams: Record<'UTA' | 'VGK', Team> = {
  UTA: {
    id: 'UTA',
    name: 'Utah Mammoth',
    abbr: 'UTA',
    primary: '#2d6db5',
    secondary: '#0b0e14',
    record: '45-28-9',
    seriesWins: 1,
  },
  VGK: {
    id: 'VGK',
    name: 'Vegas Golden Knights',
    abbr: 'VGK',
    primary: '#b4975a',
    secondary: '#333f48',
    record: '48-25-9',
    seriesWins: 1,
  },
};

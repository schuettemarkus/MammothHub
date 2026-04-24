// SOURCE: NHL Stats API — series team stats. Regular season stats marked N/A where unconfirmed.
// Confirmed playoff series stats from project brief (2-game sample).
import { TeamStats } from './types';

export const seriesStats: Record<'VGK' | 'UTA', TeamStats> = {
  VGK: { record: '1-1-0', pp: 40.0, pk: 100.0, faceoff: 52.5, gfpg: 3.00, gapg: 2.50 },
  UTA: { record: '1-1-0', pp: 0.0, pk: 60.0, faceoff: 47.5, gfpg: 2.50, gapg: 3.00 },
};

// Regular season stats — N/A values represented as null since these are not confirmed
export const regularSeasonStats: Record<'VGK' | 'UTA', Record<string, number | null>> = {
  VGK: { pp: null, pk: null, faceoff: null, gfpg: null, gapg: null },
  UTA: { pp: null, pk: null, faceoff: null, gfpg: null, gapg: null },
};

export const statLabels: Record<string, string> = {
  record: 'Record',
  pp: 'Power Play %',
  pk: 'Penalty Kill %',
  faceoff: 'Faceoff %',
  gfpg: 'Goals For / GP',
  gapg: 'Goals Against / GP',
};

// SOURCE: Natural Stat Trick / NHL Stats API — shot location data
// NOTE: Individual shot coordinates for Games 1–2 are NOT independently verified.
// This module provides the structure for real shot data integration.
// All shot entries below are placeholder positions and should be replaced with real data.
import { Shot } from './types';

export const shots: Shot[] = [];

export const shotmapNote = 'Shot location data for Games 1–2 is not yet available in this build. This feature will populate with real coordinate data from the NHL Stats API or Natural Stat Trick when connected.';

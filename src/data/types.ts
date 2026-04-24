// SOURCE: Shared types for all data layers

export type TeamId = 'UTA' | 'VGK';

export type Team = {
  id: TeamId;
  name: string;
  abbr: string;
  primary: string;
  secondary: string;
  record: string;
  seriesWins: number;
};

export type GameStatus = 'PLAYED' | 'LIVE' | 'SCHEDULED' | 'IF_NECESSARY';

export type Boxscore = {
  shots: { home: number; away: number };
  faceoffs: { home: number; away: number };
  hits: { home: number; away: number };
  blocks: { home: number; away: number };
  pim: { home: number; away: number };
};

export type Game = {
  id: string;
  seriesGame: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  status: GameStatus;
  date: string; // ISO
  venue: string;
  home: TeamId;
  away: TeamId;
  broadcast: string[];
  score?: { home: number; away: number };
  boxscore?: Boxscore;
  storylines: string[];
};

export type TeamStats = {
  record: string;
  pp: number;
  pk: number;
  faceoff: number;
  gfpg: number;
  gapg: number;
};

export type Market = {
  moneyline: { uta: number; vgk: number };
  puckLine: { uta: number; vgk: number; price: number };
  total: { line: number; over: number; under: number };
  impliedProbability: { uta: number; vgk: number };
  bookCount: number;
};

export type EdgeInput = {
  key: string;
  label: string;
  weight: number;
  utaScore: number;
  vgkScore: number;
  contribution: number;
  explanation: string;
};

export type Milestone = {
  date: string;
  title: string;
  body: string;
  tone: 'origin' | 'identity' | 'milestone' | 'history';
};

export type StatLine = {
  gp: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  toi: string;
  cf?: number;
  xg?: number;
};

export type GoalieStatLine = {
  gp: number;
  wins: number;
  losses: number;
  gaa: number;
  svPct: number;
  shutouts: number;
};

export type Player = {
  id: string;
  name: string;
  pos: string;
  number: number;
  season: StatLine | GoalieStatLine;
  playoffs: StatLine | GoalieStatLine;
  heatIndex: number;
};

export type Shot = {
  team: TeamId;
  x: number;
  y: number;
  xG: number;
  result: 'goal' | 'save' | 'miss' | 'block';
  period: number;
  time: string;
  gameId: string;
};

export type InjuryStatus = 'OUT' | 'DTD' | 'GTD';

export type Injury = {
  team: TeamId;
  player: string;
  status: InjuryStatus;
  detail: string;
};

export type WatchParty = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  details: string;
};

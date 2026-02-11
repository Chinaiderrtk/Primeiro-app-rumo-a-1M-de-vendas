
export enum Category {
  FINANCE = 'FINANCE',
  ORGANIZATION = 'ORGANIZATION',
  GROWTH = 'GROWTH',
  HEALTH = 'HEALTH'
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  points: number;
  timeMinutes: number;
  icon: string;
}

export interface UserStats {
  points: number;
  streak: number;
  level: number;
  completedIds: string[];
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  streak: number;
}

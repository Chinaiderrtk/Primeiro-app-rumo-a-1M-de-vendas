
export enum Category {
  FINANCE = 'FINANCE',
  ORGANIZATION = 'ORGANIZATION',
  GROWTH = 'GROWTH',
  HEALTH = 'HEALTH'
}

export type SubscriptionType = 'FREE' | 'ELITE' | 'SUPER';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  points: number;
  timeMinutes: number;
  icon: string;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  xpCost: number;
  cardValue: string; // Valor do Gift Card (ex: R$ 50,00)
  brand: string;
  icon: string;
  category: string;
  logoUrl: string; // URL da logo para o background do card
}

export interface UserStats {
  points: number;
  streak: number;
  level: number;
  completedIds: string[];
  journalEntries: Record<string, string>;
  redeemedItems: string[];
  subscription: SubscriptionType;
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  streak: number;
}

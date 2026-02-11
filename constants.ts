
import { Category, Challenge, LeaderboardEntry } from './types';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'f1',
    title: 'Venda o Inútil',
    description: 'Liste 5 coisas que você não usa mais e pode vender hoje.',
    category: Category.FINANCE,
    points: 150,
    timeMinutes: 20,
    icon: '💰'
  },
  {
    id: 'o1',
    title: 'A Única Gaveta',
    description: 'Escolha exatamente UMA gaveta bagunçada e organize-a completamente.',
    category: Category.ORGANIZATION,
    points: 100,
    timeMinutes: 15,
    icon: '🧹'
  },
  {
    id: 'g1',
    title: 'Explicação Rápida',
    description: 'Grave um vídeo de 1 minuto explicando algo que você aprendeu recentemente (não precisa postar).',
    category: Category.GROWTH,
    points: 200,
    timeMinutes: 10,
    icon: '🧠'
  },
  {
    id: 'f2',
    title: 'Renegociação Ativa',
    description: 'Ligue para uma operadora ou banco e tente renegociar uma tarifa ou plano.',
    category: Category.FINANCE,
    points: 300,
    timeMinutes: 25,
    icon: '📞'
  },
  {
    id: 'o2',
    title: 'Limpeza Digital',
    description: 'Delete 100 fotos inúteis ou capturas de tela da sua galeria.',
    category: Category.ORGANIZATION,
    points: 120,
    timeMinutes: 15,
    icon: '📱'
  },
  {
    id: 'g2',
    title: 'Conexão Humana',
    description: 'Inicie uma conversa curta com um desconhecido (no café, elevador ou mercado).',
    category: Category.GROWTH,
    points: 250,
    timeMinutes: 5,
    icon: '🤝'
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { name: 'Lucas S.', points: 4500, streak: 12 },
  { name: 'Maria Eduarda', points: 3800, streak: 8 },
  { name: 'Carlos J.', points: 3650, streak: 15 },
  { name: 'Beatriz F.', points: 2900, streak: 5 },
  { name: 'Você', points: 0, streak: 0 } // Will be updated by state
];

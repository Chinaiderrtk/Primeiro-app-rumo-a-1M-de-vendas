
import { Category, Challenge, LeaderboardEntry, StoreItem } from './types';

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
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { name: 'Lucas S.', points: 45000, streak: 12 },
  { name: 'Maria Eduarda', points: 38000, streak: 8 },
  { name: 'Carlos J.', points: 36500, streak: 15 },
  { name: 'Beatriz F.', points: 29000, streak: 5 },
  { name: 'Você', points: 0, streak: 0 }
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'gc1',
    name: 'iFood Gift Card',
    description: 'Saldo direto na sua carteira iFood para aquela refeição merecida.',
    xpCost: 30000, // R$ 30,00
    cardValue: 'R$ 30,00',
    brand: 'iFood',
    icon: '🍕',
    category: 'Alimentação'
  },
  {
    id: 'gc2',
    name: 'Netflix Gift Card',
    description: 'Crédito para sua assinatura. Relaxe depois de um dia produtivo.',
    xpCost: 50000, // R$ 50,00
    cardValue: 'R$ 50,00',
    brand: 'Netflix',
    icon: '🎬',
    category: 'Entretenimento'
  },
  {
    id: 'gc3',
    name: 'Google Play Gift Card',
    description: 'Compre apps, livros ou créditos em seus jogos favoritos.',
    xpCost: 15000, // R$ 15,00
    cardValue: 'R$ 15,00',
    brand: 'Google Play',
    icon: '🤖',
    category: 'Apps'
  },
  {
    id: 'gc4',
    name: 'PlayStation Store',
    description: 'Adicione fundos à sua conta PSN para novos desafios virtuais.',
    xpCost: 60000, // R$ 60,00
    cardValue: 'R$ 60,00',
    brand: 'PlayStation',
    icon: '🎮',
    category: 'Gaming'
  },
  {
    id: 'gc5',
    name: 'Spotify Premium',
    description: 'Música sem anúncios para focar nos seus mini-desafios reais.',
    xpCost: 21000, // R$ 21,00 (aprox. valor mensal)
    cardValue: '1 Mês',
    brand: 'Spotify',
    icon: '🎧',
    category: 'Música'
  },
  {
    id: 'gc6',
    name: 'Uber Gift Card',
    description: 'Vá mais longe com créditos para suas próximas viagens.',
    xpCost: 25000, // R$ 25,00
    cardValue: 'R$ 25,00',
    brand: 'Uber',
    icon: '🚕',
    category: 'Transporte'
  }
];


import React, { useState, useEffect } from 'react';
import { UserStats, Challenge, Category, StoreItem, SubscriptionType } from './types';
import { INITIAL_CHALLENGES, MOCK_LEADERBOARD } from './constants';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Store from './components/Store';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leaderboard' | 'store' | 'premium'>('dashboard');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('minidesafios_stats');
    return saved ? JSON.parse(saved) : {
      points: 0,
      streak: 5,
      level: 1,
      completedIds: [],
      journalEntries: {},
      redeemedItems: [],
      subscription: 'FREE'
    };
  });

  const [challenges] = useState<Challenge[]>(INITIAL_CHALLENGES);

  useEffect(() => {
    localStorage.setItem('minidesafios_stats', JSON.stringify(stats));
  }, [stats]);

  const handleComplete = (id: string, journal: string) => {
    const challenge = challenges.find(c => c.id === id);
    if (!challenge || stats.completedIds.includes(id)) return;

    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }

    const journalBonus = journal.trim().length > 0 ? 50 : 0;

    setStats(prev => {
      const newPoints = prev.points + challenge.points + journalBonus;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        completedIds: [...prev.completedIds, id],
        journalEntries: {
          ...prev.journalEntries,
          [id]: journal || 'Concluiu este desafio com sucesso!'
        }
      };
    });
  };

  const handlePurchase = (item: StoreItem) => {
    if (stats.subscription !== 'SUPER') return;
    if (stats.points < item.xpCost) return;
    
    if (confirm(`Deseja resgatar o Gift Card ${item.brand} de ${item.cardValue} por ${item.xpCost} XP?`)) {
      setStats(prev => ({
        ...prev,
        points: prev.points - item.xpCost,
        redeemedItems: [...prev.redeemedItems, item.id]
      }));
      alert(`Sucesso! O código do seu Gift Card ${item.brand} foi enviado para o seu e-mail.`);
    }
  };

  const subscribe = (type: SubscriptionType) => {
    setStats(prev => ({ ...prev, subscription: type }));
    alert(`Bem-vindo ao plano ${type}! Seu acesso foi atualizado.`);
    setActiveTab('dashboard');
  };

  const elitePrice = 29.90;
  const superPrice = 39.90;

  return (
    <div className="min-h-screen pb-32 bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-gray-200 safe-pt">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">
              M
            </div>
            <h1 className="font-black text-lg tracking-tight text-gray-900">
              MiniDesafios <span className="text-indigo-600">Reais</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">
                Nível {stats.level} {stats.subscription !== 'FREE' && `• ${stats.subscription}`}
              </span>
              <div className="w-24 bg-gray-200 h-2 rounded-full mt-1 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-700" style={{ width: `${(stats.points % 1000) / 10}%` }}></div>
              </div>
            </div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-sm border transition-colors ${
              stats.subscription === 'SUPER' ? 'bg-amber-100 text-amber-600 border-amber-200 shadow-lg shadow-amber-50' :
              stats.subscription === 'ELITE' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
              'bg-gray-50 text-gray-400 border-gray-100'
            }`}>
              {stats.level}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <Dashboard 
            stats={stats} 
            challenges={challenges} 
            onComplete={handleComplete} 
          />
        )}
        {activeTab === 'leaderboard' && (
          <Leaderboard 
            entries={MOCK_LEADERBOARD} 
            userPoints={stats.points} 
          />
        )}
        {activeTab === 'store' && (
          <Store 
            stats={stats}
            onPurchase={handlePurchase}
            onUpgrade={() => setActiveTab('premium')}
          />
        )}
        {activeTab === 'premium' && (
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Escolha seu Nível de Realismo</h2>
            <p className="text-base text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Desbloqueie ferramentas avançadas para acelerar sua evolução.
            </p>

            <div className="flex items-center justify-center gap-3 mb-10">
              <button 
                onClick={() => setBillingCycle('annual')}
                className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
              >
                Plano Anual (2 Meses Grátis)
              </button>
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
              >
                Mensal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Plano ELITE */}
              <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col">
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Plano Focado</span>
                  <h3 className="text-3xl font-black text-gray-900">Elite</h3>
                </div>
                
                <div className="mb-8">
                  <div className="text-5xl font-black tracking-tighter text-gray-900">
                    R$ {billingCycle === 'annual' ? (elitePrice * 10 / 12).toFixed(2).replace('.', ',') : elitePrice.toFixed(2).replace('.', ',')}
                    <span className="text-base text-gray-400 font-bold ml-1">/mês</span>
                  </div>
                  {billingCycle === 'annual' && <p className="text-[10px] font-bold text-emerald-500 mt-2">R$ {(elitePrice * 10).toFixed(2).replace('.', ',')} / ano</p>}
                </div>

                <ul className="text-left space-y-4 mb-10 flex-1">
                  {["Desafios Ilimitados com IA", "Relatórios Mensais de Evolução", "Badges de Reconhecimento", "Prioridade no Suporte"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                      <div className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] shrink-0">✓</div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => subscribe('ELITE')}
                  className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg"
                >
                  Assinar Elite
                </button>
              </div>

              {/* Plano SUPER */}
              <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-2 border-amber-400 relative overflow-hidden flex flex-col transform md:scale-105">
                <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 text-[9px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">Recomendado</div>
                
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">O Plano Definitivo</span>
                  <h3 className="text-3xl font-black text-gray-900">Super VIP</h3>
                </div>

                <div className="mb-8">
                  <div className="text-5xl font-black tracking-tighter text-gray-900">
                    R$ {billingCycle === 'annual' ? (superPrice * 10 / 12).toFixed(2).replace('.', ',') : superPrice.toFixed(2).replace('.', ',')}
                    <span className="text-base text-gray-400 font-bold ml-1">/mês</span>
                  </div>
                  {billingCycle === 'annual' && <p className="text-[10px] font-bold text-emerald-500 mt-2">R$ {(superPrice * 10).toFixed(2).replace('.', ',')} / ano</p>}
                </div>

                <ul className="text-left space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm font-black text-amber-600">
                    <div className="w-5 h-5 bg-amber-400 text-white rounded-full flex items-center justify-center text-[10px] shrink-0">💎</div>
                    Acesso à Loja de Gift Cards
                  </li>
                  {["Tudo do Plano Elite", "Desafios de Alta Complexidade", "Comunidade Mastermind", "Consultoria em Grupo Mensal"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                      <div className="w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-[10px] shrink-0">✓</div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => subscribe('SUPER')}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-amber-100"
                >
                  Assinar Super VIP
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
        <div className="mx-auto w-[94%] max-w-lg mb-8 glass border border-gray-200 rounded-[2.5rem] h-16 shadow-2xl flex items-center px-2 overflow-hidden pointer-events-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl h-12 transition-all duration-300 active:scale-90 ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:text-indigo-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a11 11 0 0011-11v-10h-2V10m-4-4h.01" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-tighter">Início</span>
          </button>
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl h-12 transition-all duration-300 active:scale-90 ${activeTab === 'leaderboard' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:text-indigo-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-tighter">Ranking</span>
          </button>
          <button 
            onClick={() => setActiveTab('store')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl h-12 transition-all duration-300 active:scale-90 ${activeTab === 'store' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:text-indigo-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-tighter">Gift Cards</span>
          </button>
          <button 
            onClick={() => setActiveTab('premium')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl h-12 transition-all duration-300 active:scale-90 ${activeTab === 'premium' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:text-indigo-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-tighter">Upgrade</span>
          </button>
        </div>
        <div className="bg-transparent h-[env(safe-area-inset-bottom)] w-full"></div>
      </nav>
    </div>
  );
};

export default App;

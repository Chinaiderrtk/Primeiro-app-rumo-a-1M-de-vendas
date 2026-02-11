
import React, { useState, useEffect } from 'react';
import { UserStats, Challenge, Category } from './types';
import { INITIAL_CHALLENGES, MOCK_LEADERBOARD } from './constants';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leaderboard' | 'premium'>('dashboard');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('minidesafios_stats');
    return saved ? JSON.parse(saved) : {
      points: 0,
      streak: 5,
      level: 1,
      completedIds: []
    };
  });

  const [challenges] = useState<Challenge[]>(INITIAL_CHALLENGES);

  useEffect(() => {
    localStorage.setItem('minidesafios_stats', JSON.stringify(stats));
  }, [stats]);

  const handleComplete = (id: string) => {
    const challenge = challenges.find(c => c.id === id);
    if (!challenge || stats.completedIds.includes(id)) return;

    setStats(prev => {
      const newPoints = prev.points + challenge.points;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        completedIds: [...prev.completedIds, id]
      };
    });
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl">
              M
            </div>
            <h1 className="font-black text-lg tracking-tight text-gray-900 hidden sm:block">
              MiniDesafios <span className="text-indigo-600">Reais</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nível {stats.level}</span>
              <div className="w-24 bg-gray-200 h-1.5 rounded-full mt-1">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(stats.points % 1000) / 10}%` }}></div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200">
              {stats.points > 100 ? '🚀' : '🐣'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-in fade-in duration-500">
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
        {activeTab === 'premium' && (
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="inline-block p-4 bg-yellow-100 rounded-full mb-6">
              <span className="text-5xl">💎</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Desafios de Elite</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
              Acesso a IA de treinamento, desafios de investimento real e mentoria em comunidade privada.
            </p>
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-indigo-100 max-w-md mx-auto">
              <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Plano Pro</div>
              <div className="text-5xl font-black mb-6">R$ 29<span className="text-xl">,90/mês</span></div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center gap-3 font-medium text-gray-700">
                  <span className="text-emerald-500 font-bold">✓</span> Desafios Personalizados por IA
                </li>
                <li className="flex items-center gap-3 font-medium text-gray-700">
                  <span className="text-emerald-500 font-bold">✓</span> Modo "Evolução Financeira"
                </li>
                <li className="flex items-center gap-3 font-medium text-gray-700">
                  <span className="text-emerald-500 font-bold">✓</span> Badges Exclusivos no Ranking
                </li>
              </ul>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200">
                Seja Premium Agora
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass border border-gray-200 rounded-full h-16 shadow-2xl z-50 flex items-center px-2">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-full h-12 transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-indigo-600'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a11 11 0 0011-11v-10h-2V10m-4-4h.01" />
          </svg>
          <span className="text-[10px] font-bold">Início</span>
        </button>
        <button 
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-full h-12 transition-all ${activeTab === 'leaderboard' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-indigo-600'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-[10px] font-bold">Ranking</span>
        </button>
        <button 
          onClick={() => setActiveTab('premium')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-full h-12 transition-all ${activeTab === 'premium' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-indigo-600'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="text-[10px] font-bold">Premium</span>
        </button>
      </nav>
    </div>
  );
};

export default App;

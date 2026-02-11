
import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  userPoints: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, userPoints }) => {
  const sortedEntries = [...entries]
    .map(e => e.name === 'Você' ? { ...e, points: userPoints } : e)
    .sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-2xl mx-auto p-4 md:py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-black text-center">Top Competidores</h2>
          <p className="text-indigo-100 text-center text-sm mt-1">Sua posição no ranking global</p>
        </div>
        <div className="divide-y divide-gray-100">
          {sortedEntries.map((entry, index) => (
            <div 
              key={entry.name} 
              className={`flex items-center justify-between p-6 transition-colors ${entry.name === 'Você' ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-8 h-8 flex items-center justify-center font-black rounded-full text-sm ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' : 
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-300 text-orange-900' : 'text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className={`font-bold ${entry.name === 'Você' ? 'text-indigo-700' : 'text-gray-800'}`}>
                    {entry.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    🔥 {entry.streak} dias de streak
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xl font-black text-gray-800">{entry.points.toLocaleString()}</span>
                <span className="block text-[10px] uppercase tracking-tighter text-gray-400 font-bold">Pontos XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 bg-indigo-100 p-6 rounded-2xl flex items-center gap-4">
        <div className="text-4xl">🚀</div>
        <div>
          <h4 className="font-bold text-indigo-900">Modo Hardcore Disponível</h4>
          <p className="text-indigo-700 text-sm">Desafios com dobro de XP, mas falhar reseta seu streak completamente.</p>
        </div>
        <button className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap">
          Ativar
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;

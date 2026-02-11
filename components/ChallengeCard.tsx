
import React, { useState } from 'react';
import { Challenge, Category } from '../types';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  onComplete: (id: string, journal: string) => void;
  savedJournal?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isCompleted, onComplete, savedJournal }) => {
  const [journal, setJournal] = useState('');

  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.FINANCE: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case Category.ORGANIZATION: return 'bg-blue-100 text-blue-700 border-blue-200';
      case Category.GROWTH: return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col ${isCompleted ? 'bg-indigo-50/50 border-indigo-100 opacity-90' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl">{challenge.icon}</span>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${getCategoryColor(challenge.category)}`}>
          {challenge.category}
        </span>
      </div>
      
      <h3 className="text-xl font-black mb-2 text-gray-800">{challenge.title}</h3>
      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        {challenge.description}
      </p>

      {!isCompleted ? (
        <div className="mb-6 group">
          <label className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            <span>Mini Diário</span>
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">+50 XP EXTRA</span>
          </label>
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="O que exatamente você realizou?"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none h-24 placeholder:text-gray-300"
          />
        </div>
      ) : (
        <div className="mb-6 p-4 bg-white/80 rounded-2xl border border-indigo-100/50 text-sm text-indigo-900 shadow-inner">
          <span className="block text-[10px] font-black text-indigo-300 uppercase mb-2 tracking-widest">Seu Registro:</span>
          <p className="leading-relaxed italic">"{savedJournal || 'Desafio concluído sem anotações.'}"</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-5">
          <div className="text-xs font-bold text-gray-400">
            <span className="block text-[9px] uppercase tracking-tighter opacity-60">Tempo</span>
            <span className="text-gray-800">{challenge.timeMinutes}m</span>
          </div>
          <div className="text-xs font-bold text-gray-400">
            <span className="block text-[9px] uppercase tracking-tighter opacity-60">Ganhos</span>
            <span className="text-indigo-600">+{challenge.points + (journal.trim() ? 50 : 0)} XP</span>
          </div>
        </div>

        {!isCompleted ? (
          <button
            onClick={() => onComplete(challenge.id, journal)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 px-8 rounded-2xl transition-all active:scale-90 shadow-xl shadow-indigo-200 text-sm"
          >
            Concluir
          </button>
        ) : (
          <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-xl">
            Conquistado
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;

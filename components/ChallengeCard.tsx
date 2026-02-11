
import React from 'react';
import { Challenge, Category } from '../types';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  onComplete: (id: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isCompleted, onComplete }) => {
  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.FINANCE: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case Category.ORGANIZATION: return 'bg-blue-100 text-blue-700 border-blue-200';
      case Category.GROWTH: return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${isCompleted ? 'bg-gray-100 border-gray-200 opacity-60' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl">{challenge.icon}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(challenge.category)}`}>
          {challenge.category}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        {challenge.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-4">
          <div className="text-xs font-medium text-gray-500">
            <span className="block text-gray-400">Tempo</span>
            {challenge.timeMinutes} min
          </div>
          <div className="text-xs font-medium text-gray-500">
            <span className="block text-gray-400">Pontos</span>
            +{challenge.points} XP
          </div>
        </div>
        {!isCompleted ? (
          <button
            onClick={() => onComplete(challenge.id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-xl transition-transform active:scale-95 shadow-lg shadow-indigo-200"
          >
            Concluir
          </button>
        ) : (
          <div className="flex items-center gap-2 text-emerald-600 font-bold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Feito
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;

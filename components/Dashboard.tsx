
import React, { useMemo } from 'react';
import { UserStats, Challenge } from '../types';
import ChallengeCard from './ChallengeCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  stats: UserStats;
  challenges: Challenge[];
  onComplete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, challenges, onComplete }) => {
  const chartData = useMemo(() => [
    { day: 'Seg', xp: 400 },
    { day: 'Ter', xp: 300 },
    { day: 'Qua', xp: 200 },
    { day: 'Qui', xp: 278 },
    { day: 'Sex', xp: stats.points > 1000 ? 1200 : 189 },
    { day: 'Sáb', xp: stats.points > 2000 ? 2390 : 239 },
    { day: 'Dom', xp: stats.points },
  ], [stats.points]);

  const levelProgress = (stats.points % 1000) / 10;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Pontos Totais</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h2 className="text-4xl font-black text-indigo-600">{stats.points}</h2>
            <span className="text-indigo-400 font-bold uppercase text-xs tracking-widest">XP</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1 font-semibold text-gray-500">
              <span>Nível {stats.level}</span>
              <span>{1000 - (stats.points % 1000)} XP para Nível {stats.level + 1}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-3xl shadow-lg text-white">
          <p className="text-orange-100 text-sm font-medium">🔥 Streak Atual</p>
          <h2 className="text-4xl font-black mt-2">{stats.streak} Dias</h2>
          <p className="text-orange-100 text-xs mt-4">Mantenha a chama acesa! Não falhe amanhã.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Desafios Hoje</p>
          <h2 className="text-4xl font-black text-gray-800 mt-2">
            {stats.completedIds.length} / {challenges.length}
          </h2>
          <div className="h-20 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area type="monotone" dataKey="xp" stroke="#6366f1" fill="#e0e7ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-800">Desafios do Dia</h2>
          <span className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-full text-gray-600">
            Atualiza em 14h 22min
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isCompleted={stats.completedIds.includes(challenge.id)}
              onComplete={onComplete}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

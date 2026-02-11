
import React, { useMemo } from 'react';
import { UserStats, Challenge } from '../types';
import ChallengeCard from './ChallengeCard';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  stats: UserStats;
  challenges: Challenge[];
  onComplete: (id: string, journal: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, challenges, onComplete }) => {
  const chartData = useMemo(() => [
    { day: 'S', xp: 400 },
    { day: 'T', xp: 300 },
    { day: 'Q', xp: 200 },
    { day: 'Q', xp: 278 },
    { day: 'S', xp: stats.points > 1000 ? 1200 : 189 },
    { day: 'S', xp: stats.points > 2000 ? 2390 : 239 },
    { day: 'D', xp: stats.points },
  ], [stats.points]);

  const levelProgress = (stats.points % 1000) / 10;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Mini Stats Grid */}
      <section className="grid grid-cols-1 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">XP Acumulado</p>
            <h2 className="text-3xl font-black text-indigo-600 mt-1">{stats.points.toLocaleString()}</h2>
          </div>
          <div className="text-right">
             <span className="text-[10px] text-gray-500 font-bold">Nível {stats.level}</span>
             <div className="w-20 bg-gray-100 h-2 rounded-full mt-1 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${levelProgress}%` }}></div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-3xl shadow-lg text-white">
            <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest">Streak</p>
            <h2 className="text-2xl font-black mt-1">🔥 {stats.streak} Dias</h2>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest relative z-10">Meta Hoje</p>
            <h2 className="text-2xl font-black text-gray-800 mt-1 relative z-10">
              {stats.completedIds.length}/{challenges.length}
            </h2>
            <div className="absolute inset-0 top-10 opacity-30">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <Area type="monotone" dataKey="xp" stroke="#6366f1" fill="#e0e7ff" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges List */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl font-black text-gray-800">Missões Diárias</h2>
          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full uppercase tracking-tighter">
            Progresso Real
          </span>
        </div>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isCompleted={stats.completedIds.includes(challenge.id)}
              onComplete={onComplete}
              savedJournal={stats.journalEntries[challenge.id]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

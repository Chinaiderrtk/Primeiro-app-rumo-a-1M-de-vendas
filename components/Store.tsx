
import React from 'react';
import { StoreItem, UserStats } from '../types';
import { STORE_ITEMS } from '../constants';

interface StoreProps {
  stats: UserStats;
  onPurchase: (item: StoreItem) => void;
  onUpgrade: () => void;
}

const Store: React.FC<StoreProps> = ({ stats, onPurchase, onUpgrade }) => {
  const isSuper = stats.subscription === 'SUPER';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500 pb-20 relative">
      <header className="text-center space-y-2">
        <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] mb-2 shadow-lg shadow-amber-100">
          Loja Super VIP • Gift Cards
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Transforme XP em Saldo Real</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Sua produtividade recompensada. Taxa de conversão: <span className="font-bold text-indigo-600">1.000 XP = R$ 1,00</span>.
        </p>
      </header>

      {/* Wallet Card */}
      <div className="bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest opacity-80">Saldo de Recompensa</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tabular-nums">{stats.points.toLocaleString()}</span>
              <span className="text-lg font-bold text-indigo-300">XP</span>
            </div>
            <p className="text-[10px] font-medium text-white/40 italic">Equivalente a R$ {(stats.points / 1000).toFixed(2).replace('.', ',')}</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-xl">🏆</div>
            <div>
              <p className="text-[9px] font-black text-amber-300 uppercase tracking-widest">Status da Conta</p>
              <p className="text-sm font-bold">{isSuper ? 'Resgates VIP Ativos' : 'Acesso Bloqueado'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Gift Card Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${!isSuper ? 'blur-md pointer-events-none grayscale opacity-40 select-none' : ''}`}>
          {STORE_ITEMS.map((item) => {
            const isRedeemed = stats.redeemedItems.includes(item.id);
            const canAfford = stats.points >= item.xpCost;

            return (
              <div 
                key={item.id}
                className={`group flex flex-col p-2 rounded-[2.5rem] border-2 transition-all duration-500 ${
                  isRedeemed ? 'bg-gray-50 border-gray-100 opacity-75' : 'bg-white border-white shadow-xl shadow-gray-200/50 hover:-translate-y-2'
                }`}
              >
                {/* Card visual style */}
                <div className="relative h-44 rounded-[2rem] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-md">
                      {item.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Valor Digital</div>
                      <div className="text-2xl font-black">{item.cardValue}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">{item.brand}</div>
                    <div className="text-lg font-black leading-tight truncate">{item.name}</div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-500 text-xs mb-6 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest">Preço em XP</span>
                      <span className={`text-lg font-black ${canAfford || isRedeemed ? 'text-indigo-600' : 'text-red-400'}`}>
                        {item.xpCost.toLocaleString()}
                      </span>
                    </div>

                    {isRedeemed ? (
                      <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        Enviado ✓
                      </div>
                    ) : (
                      <button
                        onClick={() => onPurchase(item)}
                        disabled={!canAfford}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                          canAfford 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95' 
                          : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Resgatar' : 'Falta XP'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lock Overlay for non-Super users */}
        {!isSuper && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-xl border border-gray-100 p-8 rounded-[3rem] shadow-2xl max-w-sm text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
                💎
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Exclusivo Super VIP</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                A troca de XP por Gift Cards reais é um benefício exclusivo para membros da assinatura Super VIP.
              </p>
              <button 
                onClick={onUpgrade}
                className="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-4 rounded-2xl transition-all shadow-xl shadow-amber-100 active:scale-95"
              >
                Fazer Upgrade Agora
              </button>
              <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Comece a economizar hoje
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0">✉️</div>
        <div>
          <h4 className="font-black text-indigo-900 text-lg">Como funciona o resgate?</h4>
          <p className="text-indigo-700 text-sm leading-relaxed">
            Ao clicar em resgatar, o código do Gift Card é gerado instantaneamente e enviado para o seu e-mail de cadastro. O valor em XP é debitado da sua conta na hora. Cada 1.000 XP equivale a R$ 1,00 de crédito real.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Store;

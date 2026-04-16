import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Plus, GlassWater, Trophy, History, AlertCircle } from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';

export const HydrationStation: React.FC = () => {
  const { hydrationLogs, logHydration, currentUser } = usePlanet();

  const todayLogs = hydrationLogs.filter(l => {
    const d = new Date(l.timestamp);
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
  });

  const myTotal = todayLogs.filter(l => l.userId === currentUser).reduce((acc, l) => acc + l.amount, 0);
  const partnerTotal = todayLogs.filter(l => l.userId !== currentUser).reduce((acc, l) => acc + l.amount, 0);
  
  const target = 2500; // ml

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-black">واحة الارتواء</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">صحتكما تبدأ من قطرة ماء</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* My Progress */}
        <div className="glass-card p-8 space-y-6 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 text-blue-500 opacity-5">
            <Droplets size={200} fill="currentColor" />
          </div>
          
          <div className="relative z-10 flex justify-between items-end">
            <div className="space-y-2">
              <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest">تقدمك اليوم</h3>
              <div className="text-5xl font-black text-blue-500">{myTotal} <span className="text-lg opacity-50">مل</span></div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-xs font-bold">{Math.round((myTotal / target) * 100)}%</div>
              <div className="text-[10px] opacity-50">من الهدف اليومي</div>
            </div>
          </div>

          <div className="h-3 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (myTotal / target) * 100)}%` }}
              className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[200, 330, 500].map(amount => (
              <button 
                key={amount}
                onClick={() => logHydration(amount)}
                className="py-4 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all flex flex-col items-center gap-1"
              >
                <GlassWater size={20} />
                <span className="text-[10px] font-black">+{amount}مل</span>
              </button>
            ))}
          </div>
        </div>

        {/* Partner Progress */}
        <div className="glass-card p-6 flex items-center justify-between border-blue-500/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Droplets size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm">شريكك اليوم</h4>
              <p className="text-xs opacity-60">شرب {partnerTotal} مل حتى الآن</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-[10px] font-black px-3 py-1 rounded-full ${partnerTotal < 1000 ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
              {partnerTotal < 1000 ? 'يحتاج للماء' : 'مرتوي'}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-4 items-center">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
          <AlertCircle size={28} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-amber-500">تذكير ذكي</h3>
          <p className="text-[10px] leading-relaxed text-amber-500/70">
            سنقوم بتذكير شريكك بشرب الماء إذا لاحظنا انخفاض معدل ارتواءه اليوم لضمان صحته.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

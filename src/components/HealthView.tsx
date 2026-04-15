import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Activity, CheckCircle2, Circle, Plus } from 'lucide-react';
import { useKokab } from '../context/KokabContext';

export const HealthView: React.FC = () => {
  const { health, logWater, completeHabit, currentUser } = useKokab();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-black">الصحة والنشاط</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">نهتم ببعضنا لنبقى معاً دائماً</p>
      </div>

      {/* Water Tracker */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Droplets size={20} />
            </div>
            <h3 className="font-bold">متابعة شرب الماء</h3>
          </div>
          <span className="text-xs font-bold text-[var(--color-text-secondary)]">
            {health.water.F + health.water.B} / {health.water.target} كوب
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider opacity-60">
              <span>أنت</span>
              <span>{health.water[currentUser]} كوب</span>
            </div>
            <div className="h-2 bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(health.water[currentUser] / (health.water.target / 2)) * 100}%` }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider opacity-60">
              <span>الشريك</span>
              <span>{health.water[currentUser === 'F' ? 'B' : 'F']} كوب</span>
            </div>
            <div className="h-2 bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(health.water[currentUser === 'F' ? 'B' : 'F'] / (health.water.target / 2)) * 100}%` }}
                className="h-full bg-blue-400/50"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => logWater(1)}
          className="w-full py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} /> سجل كوب ماء
        </button>
      </div>

      {/* Shared Habits */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[var(--color-text-secondary)]">عاداتنا الصحية</h3>
        <div className="space-y-3">
          {health.habits.map(habit => (
            <div key={habit.name} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-primary)]">
                  <Activity size={18} />
                </div>
                <span className="font-bold">{habit.name}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => completeHabit(habit.name)}
                  className={`p-2 rounded-lg transition-all ${habit.completedBy.includes(currentUser) ? 'text-green-500 bg-green-500/10' : 'text-[var(--color-text-secondary)] bg-[var(--color-bg-surface)]'}`}
                >
                  {habit.completedBy.includes(currentUser) ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                <div className={`p-2 rounded-lg ${habit.completedBy.includes(currentUser === 'F' ? 'B' : 'F') ? 'text-green-500/50 bg-green-500/5' : 'text-[var(--color-text-secondary)]/30 bg-[var(--color-bg-surface)]/50'}`}>
                   <CheckCircle2 size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

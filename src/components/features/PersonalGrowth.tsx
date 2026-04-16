import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, CheckCircle, Target, Flame, Plus, X } from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';
import { ModernInput } from '../ui/ModernInput';

export const PersonalGrowth: React.FC = () => {
  const { currentUser, habits, updateHabitProgress, addHabit } = usePlanet();
  const [showAdd, setShowAdd] = useState(false);
  const [newHabit, setNewHabit] = useState({ title: '', target: 10, unit: '', color: 'blue' as const });

  const myHabits = habits[currentUser] || [];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addHabit(newHabit);
    setShowAdd(false);
    setNewHabit({ title: '', target: 10, unit: '', color: 'blue' });
  };

  const colorMap = {
    blue: 'bg-blue-500 text-blue-500 bg-blue-500/10',
    emerald: 'bg-emerald-500 text-emerald-500 bg-emerald-500/10',
    purple: 'bg-purple-500 text-purple-500 bg-purple-500/10'
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">متتبع النمو الشخصي</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">تطوير الذات هو وقود الكوكب</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {myHabits.length === 0 && (
          <div className="p-12 text-center glass-card opacity-50">
            <Target size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm">ابدأ بإضافة عاداتك الشخصية لتتبع نموك.</p>
          </div>
        )}

        {myHabits.map(habit => (
          <div key={habit.id} className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[habit.color].split(' ')[2]} ${colorMap[habit.color].split(' ')[1]}`}>
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="font-bold">{habit.title}</h3>
                  <p className="text-[10px] opacity-50">الهدف: {habit.target} {habit.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black">{habit.progress}</div>
                <div className="text-[10px] opacity-50">{habit.unit}</div>
              </div>
            </div>
            
            <div className="h-2 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (habit.progress / habit.target) * 100)}%` }}
                className={`h-full ${colorMap[habit.color].split(' ')[0]}`}
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-1 text-[10px] text-orange-500 font-bold">
                <Flame size={12} /> {Math.floor((Date.now() - habit.lastUpdated) / 86400000) === 0 ? 'نشط اليوم' : 'بانتظار التحديث'}
              </div>
              <button 
                onClick={() => updateHabitProgress(habit.id, habit.progress + 1)}
                className={`text-[10px] font-bold px-3 py-1 rounded-full ${colorMap[habit.color].split(' ')[2]} ${colorMap[habit.color].split(' ')[1]}`}
              >
                +1 {habit.unit}
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-8 relative z-10 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">إضافة عادة جديدة</h3>
                <button onClick={() => setShowAdd(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <ModernInput 
                  label="اسم العادة" required
                  value={newHabit.title}
                  onChange={e => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ModernInput 
                    label="الهدف الرقمي" type="number" required
                    value={newHabit.target}
                    onChange={e => setNewHabit(prev => ({ ...prev, target: Number(e.target.value) }))}
                  />
                  <ModernInput 
                    label="الوحدة (مثلاً: صفحة)" required
                    value={newHabit.unit}
                    onChange={e => setNewHabit(prev => ({ ...prev, unit: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-50 uppercase">اللون المميز</label>
                  <div className="flex gap-2">
                    {(['blue', 'emerald', 'purple'] as const).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewHabit(prev => ({ ...prev, color: c }))}
                        className={`w-8 h-8 rounded-full ${colorMap[c].split(' ')[0]} ${newHabit.color === c ? 'ring-2 ring-offset-2 ring-[var(--color-primary)]' : ''}`}
                      />
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-4">حفظ العادة</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

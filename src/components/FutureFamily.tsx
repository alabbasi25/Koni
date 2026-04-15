import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Baby, Wallet, Heart, Sparkles, Plus, X } from 'lucide-react';
import { usePlanet } from '../context/KokabContext';
import { ModernInput } from './ModernInput';

export const FutureFamily: React.FC = () => {
  const { family, updateFamily } = usePlanet();
  const [showAddName, setShowAddName] = useState(false);
  const [showEditVision, setShowEditVision] = useState(false);
  const [newName, setNewName] = useState('');
  const [newVision, setNewVision] = useState(family.notes || '');

  const handleAddName = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      updateFamily({ names: [...family.names, newName.trim()] });
      setNewName('');
      setShowAddName(false);
    }
  };

  const handleUpdateVision = (e: React.FormEvent) => {
    e.preventDefault();
    updateFamily({ notes: newVision });
    setShowEditVision(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">مشروع العائلة</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">تخطيط هادئ لمستقبل يملؤه الحب</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Baby size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">الأسماء المفضلة</h3>
              <p className="text-xs opacity-60">قائمة الأسماء التي اتفقنا عليها</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {family.names.length === 0 && (
              <p className="text-xs opacity-40 italic">لا توجد أسماء مضافة بعد...</p>
            )}
            {family.names.map((name, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-[var(--color-bg-surface)] text-sm font-bold border border-[var(--color-border)]">
                {name}
              </span>
            ))}
            <button 
              onClick={() => setShowAddName(true)}
              className="px-4 py-2 rounded-xl border border-dashed border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-bold"
            >
              + إضافة اسم
            </button>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Wallet size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">صندوق التعليم</h3>
                <p className="text-xs opacity-60">المدخرات المخصصة للمستقبل</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black">${family.educationSavings.toLocaleString()}</div>
              <div className="text-[10px] opacity-50 uppercase">رصيد تراكمي</div>
            </div>
          </div>
          <div className="h-2 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: family.educationSavings > 0 ? '45%' : '0%' }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">رؤيتنا التربوية</h3>
              <p className="text-xs opacity-60">مبادئ نود غرسها في أطفالنا</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-surface)]/50 text-sm italic opacity-80 leading-relaxed">
            "{family.notes || 'لم يتم تدوين ملاحظات بعد. ابدأ بكتابة رؤيتكم المشتركة هنا.'}"
          </div>
          <button 
            onClick={() => setShowEditVision(true)}
            className="w-full py-3 rounded-xl border border-[var(--color-border)] text-xs font-bold opacity-60"
          >
            تعديل الرؤية
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAddName && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddName(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-8 relative z-10 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">إضافة اسم</h3>
                <button onClick={() => setShowAddName(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddName} className="space-y-4">
                <ModernInput 
                  label="الاسم المقترح" required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
                <button type="submit" className="btn-primary w-full py-4">حفظ الاسم</button>
              </form>
            </motion.div>
          </div>
        )}

        {showEditVision && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowEditVision(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-8 relative z-10 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">تعديل الرؤية التربوية</h3>
                <button onClick={() => setShowEditVision(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleUpdateVision} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-50 uppercase">رؤيتنا المشتركة</label>
                  <textarea 
                    required
                    value={newVision}
                    onChange={e => setNewVision(e.target.value)}
                    className="input-field min-h-[150px] py-3"
                    placeholder="اكتبوا هنا المبادئ والقيم التي تودون غرسها..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4">حفظ الرؤية</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

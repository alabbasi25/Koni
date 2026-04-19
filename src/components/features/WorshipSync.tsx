import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Zap, 
  Fingerprint, 
  Wifi, 
  WifiOff,
  Trophy,
  Sparkles,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Heart,
  Moon,
  Sun
} from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';

const AZKAR_DATA = [
  { id: 'sabah', title: 'أذكار الصباح', icon: <Sun size={20} />, color: 'bg-amber-500', target: 50 },
  { id: 'masaa', title: 'أذكار المساء', icon: <Moon size={20} />, color: 'bg-indigo-500', target: 50 },
];

export const WorshipSync: React.FC = () => {
  const { worship, syncTasbeeh, currentUser, partnerStatus, populateTestData, quranTracker, logQuranVerses } = usePlanet();
  const [selectedAzkar, setSelectedAzkar] = useState<string | null>(null);
  
  const activeSession = worship[0];
  const isPartnerOnline = partnerStatus?.status === 'online';

  const partnerId = currentUser === 'F' ? 'B' : 'F';
  const myCount = activeSession?.syncCounter?.[currentUser] || 0;
  const partnerCount = activeSession?.syncCounter?.[partnerId] || 0;

  // Quranic Sync Logic
  const today = new Date().toISOString().split('T')[0];
  const myTodayLog = quranTracker.logs[currentUser].find(l => l.date === today)?.verses || 0;
  const partnerTodayLog = quranTracker.logs[partnerId].find(l => l.date === today)?.verses || 0;
  
  const totalVerses = 6236; 

  // Effect to simulate haptic feedback when partner clicks
  useEffect(() => {
    if (partnerCount > 0 && window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }, [partnerCount]);

  const handleInteraction = (id: string) => {
    incrementAthkarCount(id);
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addAthkar(newAthkar);
    setShowAddModal(false);
    setNewAthkar({ text: '', target: 33, category: 'custom' });
  };

  if (!activeSession) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">المزامنة الروحية</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">اتصال حي للعبادة المشتركة والمعية</p>
        </div>
        <div className="glass-card p-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mx-auto">
            <Sparkles size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">لا توجد جلسة نشطة</h3>
            <p className="text-xs opacity-60">ابدأ جلسة تسبيح مشتركة الآن لتعيش تجربة الذكر مع شريكك.</p>
          </div>
          <button 
            onClick={() => populateTestData()} // Using populateTestData as a shortcut or I should add a specific action
            className="btn-primary px-8 py-3"
          >
            بدء جلسة جديدة
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-black">المزامنة الروحية</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">اتصال حي للعبادة المشتركة والمعية</p>
      </div>

      {/* Quranic Sync (Progressive Reveal) */}
      <section className="glass-card p-6 space-y-6 border-emerald-500/20 bg-emerald-500/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black">ختمة القرآن المشتركة</h3>
              <p className="text-[10px] opacity-60">مزامنة القراءة والتدبر</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-emerald-500">{Math.round(((myTodayLog + partnerTodayLog) / totalVerses) * 100 * 10 || 0) / 10}%</div>
            <div className="text-[8px] opacity-40 uppercase">إجمالي الختمة</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold opacity-50">أنت (اليوم)</span>
              <span className="text-xs font-black">{myTodayLog} آية</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(myTodayLog / 50) * 100}%` }}
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold opacity-50">الشريك (اليوم)</span>
              <span className="text-xs font-black">{partnerTodayLog} آية</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(partnerTodayLog / 50) * 100}%` }}
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => logQuranVerses(10)}
          className="w-full py-3 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <CheckCircle2 size={16} /> تسجيل قراءة ورد اليوم (+10 آيات)
        </button>
      </section>

      {/* Azkar Tabs */}
      <section className="flex gap-2 p-1 bg-white/5 rounded-2xl">
        {(['morning', 'evening', 'custom'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedCategory === cat ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'opacity-40 hover:opacity-100'
            }`}
          >
            {cat === 'morning' ? 'الأذكار الصباحية' : cat === 'evening' ? 'الأذكار المسائية' : 'أذكار خاصة'}
          </button>
        ))}
      </section>

      {/* Athkar List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-black uppercase tracking-widest opacity-60">قائمة الأذكار</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="text-[10px] font-bold text-[var(--color-primary)] flex items-center gap-1 hover:underline"
          >
            <Plus size={12} /> إضافة ذكر جديد
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAthkar.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                className="glass-card p-6 flex items-center justify-between group relative overflow-hidden"
              >
                <div className="space-y-3 flex-1">
                  <p className="text-sm font-bold leading-relaxed">{item.text}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count[currentUser] / item.target) * 100}%` }}
                        className="h-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"
                      />
                    </div>
                    <span className="text-[10px] font-black tabular-nums opacity-40">
                      {item.count[currentUser]} / {item.target}
                    </span>
                  </div>
                </div>

                <div className="mr-6">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleInteraction(item.id)}
                    className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] text-white flex flex-col items-center justify-center gap-1 shadow-lg shadow-[var(--color-primary)]/20"
                  >
                    <Fingerprint size={24} />
                    <span className="text-[8px] font-black">+1</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredAthkar.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center glass-card border-dashed border-white/10"
            >
              <CheckCircle2 size={32} className="mx-auto mb-3 text-emerald-500 opacity-20" />
              <p className="text-xs opacity-40 font-bold">لقد أتممت كافة الأذكار في هذه الفئة!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Connection Status */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between transition-all duration-500 ${isPartnerOnline ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPartnerOnline ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
            {isPartnerOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
          </div>
          <div>
            <div className="text-xs font-bold">{isPartnerOnline ? 'اتصال حي نشط' : 'الشريك غير متصل'}</div>
            <div className="text-[10px] opacity-60">{isPartnerOnline ? 'يمكنكما البدء في الجلسة المشتركة' : 'العداد يتطلب وجود الطرفين'}</div>
          </div>
        </div>
        {isPartnerOnline && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
      </div>

      {/* Live Sync Engine */}
      <div className="glass-card p-10 flex flex-col items-center gap-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-bg-surface)]">
          <motion.div 
            className="h-full bg-[var(--color-primary)]"
            animate={{ width: `${(activeSession.progress / activeSession.target) * 100}%` }}
          />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">مزامنة الأذكار</h3>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-[10px] opacity-50 font-bold">أنت</div>
              <div className="text-4xl font-black text-[var(--color-primary)] tabular-nums">{myCount}</div>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)]" />
            <div className="text-center">
              <div className="text-[10px] opacity-50 font-bold">الشريك</div>
              <div className="text-4xl font-black text-amber-500 tabular-nums">{partnerCount}</div>
            </div>
          </div>
          <div className="text-xs font-bold opacity-40 pt-4">الإجمالي: {myCount + partnerCount} / {activeSession.target}</div>
        </div>

        {/* Dual Interaction Button */}
        <div className="relative">
          <AnimatePresence>
            {isPartnerOnline && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.2 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-[var(--color-primary)] rounded-full blur-2xl"
              />
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={isPartnerOnline ? { scale: 1.05 } : {}}
            whileTap={isPartnerOnline ? { scale: 0.95 } : {}}
            onClick={handleInteraction}
            disabled={!isPartnerOnline}
            className={`w-40 h-40 rounded-full border-8 border-white/5 shadow-2xl flex flex-col items-center justify-center gap-2 transition-all duration-500 relative z-10 ${
              isPartnerOnline 
                ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-[var(--color-shadow)]' 
                : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] grayscale cursor-not-allowed'
            }`}
          >
            <Fingerprint size={48} />
            <span className="text-xs font-black uppercase tracking-widest">تفاعل</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-8 w-full justify-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[var(--color-bg-surface)] flex items-center justify-center text-[var(--color-primary)]">
              <Zap size={14} />
            </div>
            <span className="text-[10px] font-bold">أنت</span>
          </div>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPartnerOnline ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}>
              <Users size={14} />
            </div>
            <span className="text-[10px] font-bold">الشريك</span>
          </div>
        </div>
      </div>

      {/* Add Athkar Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="modal-backdrop">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black">إضافة ذكر جديد</h3>
                <button onClick={() => setShowAddModal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-6">
                <ModernInput 
                  label="نص الذكر" required
                  value={newAthkar.text}
                  onChange={e => setNewAthkar(prev => ({ ...prev, text: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ModernInput 
                    label="العدد المستهدف" type="number" required
                    value={newAthkar.target}
                    onChange={e => setNewAthkar(prev => ({ ...prev, target: Number(e.target.value) }))}
                  />
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase opacity-40">الفئة</label>
                    <select 
                      value={newAthkar.category}
                      onChange={e => setNewAthkar(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full h-12 glass border-white/10 rounded-xl px-4 text-xs outline-none"
                    >
                      <option value="morning">صباح</option>
                      <option value="evening">مساء</option>
                      <option value="custom">خاص</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-4">حفظ الذكر</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logic Info */}
      <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex gap-4 items-start">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
          <Sparkles size={18} />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-purple-500">مزامنة الأذكار الحية</h4>
          <p className="text-[10px] leading-relaxed text-purple-600/70">
            عداد تسبيح يظهر في الهاتفين معاً. ستشعر بنبضة اهتزاز في هاتفك مع كل تسبيحة يقوم بها شريكك، لتعيشا معية الذكر في آن واحد.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

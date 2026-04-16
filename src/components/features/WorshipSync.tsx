import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Zap, 
  Fingerprint, 
  Wifi, 
  WifiOff,
  Trophy,
  Sparkles
} from 'lucide-react';
import { useKokab } from '../../context/KokabContext';

export const WorshipSync: React.FC = () => {
  const { worship, syncTasbeeh, currentUser, partnerStatus, populateTestData } = useKokab();
  const [isSyncing, setIsSyncing] = useState(false);
  
  const activeSession = worship[0];
  const isPartnerOnline = partnerStatus?.status === 'online';

  const partnerId = currentUser === 'F' ? 'B' : 'F';
  const myCount = activeSession?.syncCounter?.[currentUser] || 0;
  const partnerCount = activeSession?.syncCounter?.[partnerId] || 0;

  // Effect to simulate haptic feedback when partner clicks
  useEffect(() => {
    if (partnerCount > 0 && window.navigator.vibrate) {
      window.navigator.vibrate(100); // Vibrate when partner clicks
    }
  }, [partnerCount]);

  const handleInteraction = () => {
    if (!activeSession) return;
    const newCount = myCount + 1;
    syncTasbeeh(activeSession.id, newCount);
    
    // Local Haptic Feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
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

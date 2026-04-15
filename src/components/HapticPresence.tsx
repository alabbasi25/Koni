import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, Heart, Zap, Waves, Sparkles, MessageCircle } from 'lucide-react';
import { usePlanet } from '../context/KokabContext';

export const HapticPresence: React.FC = () => {
  const { currentUser, partnerStatus } = usePlanet();
  const [activePulse, setActivePulse] = useState<string | null>(null);

  const sendPulse = (type: string) => {
    setActivePulse(type);
    if ('vibrate' in navigator) {
      if (type === 'heart') navigator.vibrate([200, 100, 200]);
      else if (type === 'zap') navigator.vibrate(50);
      else navigator.vibrate(500);
    }
    setTimeout(() => setActivePulse(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-black">بوابة الهمس الرقمي</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">تواصل صامت عبر لغة الجسد الرقمية</p>
      </div>

      <div className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-64 h-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl"
          />
        </div>

        <button 
          onClick={() => sendPulse('pulse')}
          className={`relative z-10 w-48 h-48 rounded-full glass-card flex items-center justify-center transition-all duration-500 ${activePulse ? 'scale-90 border-[var(--color-primary)]' : 'hover:scale-105'}`}
        >
          <div className={`absolute inset-0 rounded-full border-4 border-[var(--color-primary)]/20 ${activePulse ? 'animate-ping' : ''}`} />
          <Fingerprint size={80} className={activePulse ? 'text-[var(--color-primary)]' : 'opacity-20'} />
        </button>

        {/* Floating Pulse Options */}
        <div className="absolute inset-0 pointer-events-none">
          <PulseButton 
            icon={<Heart size={20} />} 
            label="نبضة حب" 
            color="rose" 
            pos="top-10 left-10" 
            onClick={() => sendPulse('heart')}
          />
          <PulseButton 
            icon={<Zap size={20} />} 
            label="تنبيه سريع" 
            color="amber" 
            pos="top-10 right-10" 
            onClick={() => sendPulse('zap')}
          />
          <PulseButton 
            icon={<Waves size={20} />} 
            label="موجة هدوء" 
            color="blue" 
            pos="bottom-10 left-10" 
            onClick={() => sendPulse('wave')}
          />
          <PulseButton 
            icon={<Sparkles size={20} />} 
            label="تشجيع" 
            color="emerald" 
            pos="bottom-10 right-10" 
            onClick={() => sendPulse('sparkle')}
          />
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${partnerStatus?.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
          <span className="text-sm font-bold">الشريك {partnerStatus?.status === 'online' ? 'متصل الآن' : 'غير متصل'}</span>
        </div>
        <p className="text-xs opacity-60 leading-relaxed">
          عندما تضغط على البوابة، سيهتز هاتف شريكك بلطف ليشعر بوجودك بجانبه دون الحاجة للكلمات.
        </p>
      </div>
    </motion.div>
  );
};

const PulseButton: React.FC<{ icon: React.ReactNode; label: string; color: string; pos: string; onClick: () => void }> = ({ icon, label, color, pos, onClick }) => (
  <button 
    onClick={onClick}
    className={`absolute ${pos} pointer-events-auto p-4 rounded-2xl glass-card flex flex-col items-center gap-2 hover:scale-110 transition-transform group`}
  >
    <div className={`text-${color}-500 group-hover:animate-bounce`}>{icon}</div>
    <span className="text-[10px] font-bold opacity-50">{label}</span>
  </button>
);

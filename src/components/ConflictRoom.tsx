import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Send, Eye, Lock } from 'lucide-react';
import { usePlanet } from '../context/KokabContext';

export const ConflictRoom: React.FC = () => {
  const { conflictRoom, sendConflictMessage, revealConflictMessages, currentUser } = usePlanet();
  const [content, setContent] = useState('');

  const myMessages = conflictRoom.filter(m => m.authorId === currentUser);
  const partnerMessages = conflictRoom.filter(m => m.authorId !== currentUser);
  
  const canReveal = myMessages.length > 0 && partnerMessages.length > 0;
  const isRevealed = conflictRoom.some(m => m.revealed);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">غرفة التفاهم</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">مساحة آمنة للنقاش دون مقاطعة</p>
      </div>

      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-4 items-start">
        <div className="p-3 rounded-xl bg-amber-500/20 text-amber-500">
          <ShieldAlert size={24} />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-500">منطق الكتابة الدورية</h4>
          <p className="text-[10px] leading-relaxed text-amber-600/70">
            لن يظهر رد الطرف الأول إلا بعد أن ينهي الطرف الثاني كتابة رأيه. هذا يضمن أن يستمع كل منكما للآخر بالكامل قبل الرد.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 space-y-4">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="عبر عن وجهة نظرك بهدوء..."
            className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none h-24 no-scrollbar"
            disabled={myMessages.length > 0 && !isRevealed}
          />
          <div className="flex justify-end">
            <button 
              onClick={() => { sendConflictMessage(content); setContent(''); }}
              disabled={myMessages.length > 0 && !isRevealed}
              className="px-6 py-2 rounded-xl bg-amber-500 text-white font-bold text-sm flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={16} /> إرسال وجهة نظري
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 text-center">حالة النقاش</h3>
          
          <div className="flex justify-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${myMessages.length > 0 ? 'bg-green-500/20 text-green-500' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}>
                {myMessages.length > 0 ? <Eye size={24} /> : <Lock size={24} />}
              </div>
              <span className="text-[10px] font-bold">أنت</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${partnerMessages.length > 0 ? 'bg-green-500/20 text-green-500' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}>
                {partnerMessages.length > 0 ? <Eye size={24} /> : <Lock size={24} />}
              </div>
              <span className="text-[10px] font-bold">الشريك</span>
            </div>
          </div>

          {canReveal && !isRevealed && (
            <button 
              onClick={revealConflictMessages}
              className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-sm shadow-xl shadow-green-500/20 animate-pulse"
            >
              كشف وجهات النظر الآن
            </button>
          )}

          <AnimatePresence>
            {isRevealed && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {conflictRoom.map(msg => (
                  <div key={msg.id} className={`p-4 rounded-2xl ${msg.authorId === currentUser ? 'bg-blue-500/10 mr-10' : 'bg-amber-500/10 ml-10'}`}>
                    <div className="text-[10px] font-bold opacity-50 mb-1">{msg.authorId === currentUser ? 'أنت' : 'الشريك'}</div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

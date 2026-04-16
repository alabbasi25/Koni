import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';

export const PrivateSanctum: React.FC = () => {
  const { privateNotes, addPrivateNote } = usePlanet();
  const [newNote, setNewNote] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">المساحة الخاصة</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">أفكارك ومشاعرك في أمان تام</p>
      </div>

      <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex gap-4 items-center">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
          <Lock size={28} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-indigo-500">تشفير طرفي</h3>
          <p className="text-[10px] leading-relaxed text-indigo-500/70">
            هذه البيانات مخزنة في مسارك الخاص. لا يملك الشريك صلاحية الوصول إليها برمجياً.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="اكتب فكرة خاصة..."
            className="input-field flex-1"
          />
          <button 
            onClick={() => { addPrivateNote(newNote); setNewNote(''); }}
            className="p-3 rounded-xl bg-indigo-500 text-white shadow-lg"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">ملاحظاتك</h3>
          <button onClick={() => setShowNotes(!showNotes)} className="text-indigo-500 text-xs font-bold flex items-center gap-1">
            {showNotes ? <EyeOff size={14} /> : <Eye size={14} />}
            {showNotes ? 'إخفاء' : 'عرض'}
          </button>
        </div>

        <div className="space-y-3">
          {showNotes ? (
            privateNotes.map(note => (
              <div key={note.id} className="glass-card p-4 flex items-center justify-between">
                <p className="text-sm">{note.content}</p>
                <span className="text-[10px] opacity-40">{new Date(note.timestamp).toLocaleDateString('ar-EG')}</span>
              </div>
            ))
          ) : (
            <div className="glass-card p-12 text-center opacity-50">
              <Lock size={32} className="mx-auto mb-2" />
              <p className="text-xs">المحتوى مخفي. اضغط على عرض للمشاهدة.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

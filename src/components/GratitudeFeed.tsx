import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Send, MessageCircle } from 'lucide-react';
import { usePlanet } from '../context/KokabContext';

export const GratitudeFeed: React.FC = () => {
  const { gratitudeFeed, addGratitude, currentUser } = usePlanet();
  const [content, setContent] = useState('');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">جدار الامتنان</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">كلمات بسيطة تعني الكثير</p>
      </div>

      <div className="glass-card p-6 space-y-4 border-rose-500/20">
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="بماذا تشعر بالامتنان تجاه شريكك اليوم؟"
          className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none h-24 no-scrollbar"
        />
        <div className="flex justify-end">
          <button 
            onClick={() => { addGratitude(content); setContent(''); }}
            className="px-6 py-2 rounded-xl bg-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-500/20"
          >
            <Send size={16} /> نشر
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {gratitudeFeed.map(post => (
          <div key={post.id} className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-xs">
                {post.authorId}
              </div>
              <div className="text-[10px] opacity-50">{new Date(post.timestamp).toLocaleString('ar-EG')}</div>
            </div>
            <p className="text-sm leading-relaxed">{post.content}</p>
            <div className="flex items-center gap-4 pt-2 border-t border-[var(--color-border)]">
              <button className="flex items-center gap-1.5 text-rose-500 text-[10px] font-bold">
                <Heart size={14} /> {post.reactions.length || 0}
              </button>
              <button className="flex items-center gap-1.5 text-[var(--color-text-secondary)] text-[10px] font-bold">
                <MessageCircle size={14} /> تفاعل
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

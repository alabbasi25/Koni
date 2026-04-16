import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Send, MessageCircle, Sparkles, Star } from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';

export const GratitudeFeed: React.FC = () => {
  const { gratitudeFeed, addGratitude, currentUser, barakahPoints, addBarakahPoints } = usePlanet();
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!content.trim()) return;
    addGratitude(content);
    addBarakahPoints(10); // Each gratitude post adds 10 Barakah points
    setContent('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black">سجل المودة</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">كلمات بسيطة تعني الكثير</p>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-2 border-amber-500/30 bg-amber-500/5">
            <Sparkles size={16} className="text-amber-500" />
            <div className="text-right">
              <div className="text-[8px] font-bold opacity-50 uppercase">نقاط البركة</div>
              <div className="text-sm font-black text-amber-500">{barakahPoints}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4 border-rose-500/20">
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="بماذا تشعر بالامتنان تجاه شريكك اليوم؟"
          className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none h-24 no-scrollbar"
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
            <Star size={12} /> ستحصل على +10 نقاط بركة عند النشر
          </div>
          <button 
            onClick={handlePost}
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

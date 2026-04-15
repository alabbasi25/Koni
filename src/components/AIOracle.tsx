import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, Sparkles, BrainCircuit, BarChart3 } from 'lucide-react';
import { usePlanet } from '../context/KokabContext';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AIOracle: React.FC = () => {
  const { planetHealth, tasks, transactions } = usePlanet();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'أهلاً بكما. أنا مستشار الكوكب. لقد حللت بياناتكما الحالية: صحة الكوكب عند ' + planetHealth.score + '%. كيف يمكنني مساعدتكما في تحسين التوازن اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const prompt = `
        أنت مساعد ذكي لتطبيق "كوكب" المخصص للأزواج.
        بيانات الكوكب الحالية:
        - الصحة العامة: ${planetHealth.score}%
        - المهام المعلقة: ${tasks.filter(t => t.status === 'pending').length}
        - المصاريف الأخيرة: ${transactions.length}
        
        المستخدم يسأل: ${userMsg}
        
        أجب بأسلوب دافئ، حكيم، وباللغة العربية. قدم نصائح عملية بناءً على البيانات إذا لزم الأمر.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || 'عذراً، لم أستطع توليد رد.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، واجهت مشكلة في تحليل البيانات. حاول مرة أخرى لاحقاً.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-[70vh]">
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-black">مستشار الكوكب</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">ذكاء اصطناعي يحلل نبض حياتكما</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar p-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[var(--color-primary)] text-white' : 'glass-card border-[var(--color-primary)]/20'}`}>
              {msg.role === 'assistant' && <Bot size={14} className="mb-2 opacity-50" />}
              <p className="leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-card p-4 rounded-2xl animate-pulse">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="pt-4 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="اسأل المستشار عن حالة الكوكب..."
          className="input-field flex-1"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="p-3 rounded-xl bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </motion.div>
  );
};

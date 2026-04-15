import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, Library, Plus, Search, Book as BookIcon, ChevronRight, TrendingUp, X } from 'lucide-react';
import { usePlanet } from '../context/KokabContext';
import { ModernInput } from './ModernInput';

export const KnowledgeStudio: React.FC = () => {
  const { library, updateBookProgress, addBook, currentUser } = usePlanet();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', totalPages: 100, category: 'General' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addBook(newBook);
    setShowAdd(false);
    setNewBook({ title: '', author: '', totalPages: 100, category: 'General' });
  };

  const filteredLibrary = library.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-black">استوديو المعرفة</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">رحلة التعلم والنمو العقلي المشترك</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={18} />
        <input 
          type="text" 
          placeholder="ابحث في المكتبة..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] px-1">الكتب الحالية</h3>
        <div className="grid grid-cols-1 gap-4">
          {filteredLibrary.length === 0 && (
            <div className="p-12 text-center glass-card opacity-50">
              <Library size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm">المكتبة فارغة. ابدأ بإضافة كتبكم المشتركة.</p>
            </div>
          )}
          
          {filteredLibrary.map(book => (
            <div key={book.id} className="glass-card p-6 space-y-6">
              <div className="flex gap-4">
                <div className="w-16 h-20 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <BookIcon size={32} />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-lg">{book.title}</h4>
                  <p className="text-xs opacity-60">{book.author}</p>
                  <div className="mt-2 inline-block px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase">
                    {book.category}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="opacity-50">تقدم فهد</span>
                    <span className="text-blue-500">{Math.round((book.progress.F / book.totalPages) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(book.progress.F / book.totalPages) * 100}%` }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="opacity-50">تقدم بشرى</span>
                    <span className="text-purple-500">{Math.round((book.progress.B / book.totalPages) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(book.progress.B / book.totalPages) * 100}%` }}
                      className="h-full bg-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[var(--color-bg-surface)]">
                <div className="text-[10px] font-bold opacity-50">
                  وصلت للصفحة {book.progress[currentUser]} من {book.totalPages}
                </div>
                <button 
                  onClick={() => updateBookProgress(book.id, Math.min(book.totalPages, book.progress[currentUser] + 10))}
                  className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-1"
                >
                  تحديث التقدم <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
                <h3 className="text-xl font-black">إضافة كتاب جديد</h3>
                <button onClick={() => setShowAdd(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <ModernInput 
                  label="عنوان الكتاب" required
                  value={newBook.title}
                  onChange={e => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                />
                <ModernInput 
                  label="المؤلف" required
                  value={newBook.author}
                  onChange={e => setNewBook(prev => ({ ...prev, author: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ModernInput 
                    label="عدد الصفحات" type="number" required
                    value={newBook.totalPages}
                    onChange={e => setNewBook(prev => ({ ...prev, totalPages: Number(e.target.value) }))}
                  />
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">الفئة</label>
                    <select 
                      value={newBook.category}
                      onChange={e => setNewBook(prev => ({ ...prev, category: e.target.value }))}
                      className="input-field text-xs py-3"
                    >
                      <option value="General">عام</option>
                      <option value="Self-Help">تطوير الذات</option>
                      <option value="Fiction">رواية</option>
                      <option value="Science">علوم</option>
                      <option value="History">تاريخ</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-4">إضافة للمكتبة</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

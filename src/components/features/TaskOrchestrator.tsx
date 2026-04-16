import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListTodo, ArrowLeftRight, CheckCircle2, Clock, Plus, X } from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';
import { ModernInput } from '../ui/ModernInput';

export const TaskOrchestrator: React.FC = () => {
  const { tasks, addTask, completeTask, delegateTask, currentUser } = usePlanet();
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: currentUser as 'F' | 'B' });
  const partner = currentUser === 'F' ? 'B' : 'F';

  const myTasks = tasks.filter(t => t.assignedTo === currentUser);
  const partnerTasks = tasks.filter(t => t.assignedTo === partner);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title: newTask.title,
      assignedTo: newTask.assignedTo,
      status: 'pending'
    });
    setShowAdd(false);
    setNewTask({ title: '', assignedTo: currentUser as 'F' | 'B' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">منسق المهام</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">توزيع المسؤوليات بالتراضي</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Tasks */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 px-1">مهامي</h3>
          <div className="space-y-2">
            {myTasks.length === 0 && <p className="text-xs opacity-40 italic p-4">لا توجد مهام حالية...</p>}
            {myTasks.map(task => (
              <motion.div 
                key={task.id} 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`glass-card p-4 flex items-center justify-between gap-3 hover:bg-[var(--color-bg-surface)] transition-colors group ${task.status === 'syncing' ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => completeTask(task.id)} 
                    className={`transition-colors ${task.status === 'completed' ? 'text-green-500' : 'text-[var(--color-text-secondary)] hover:text-green-500'}`}
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <div className="space-y-0.5">
                    <span className={`text-sm font-bold block ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>{task.title}</span>
                    {task.priority && (
                      <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                        task.priority === 'urgent' ? 'bg-rose-500/10 text-rose-500' :
                        task.priority === 'high' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {task.priority === 'urgent' ? 'عاجل' : task.priority === 'high' ? 'مهم' : 'عادي'}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => delegateTask(task.id, partner, 'توزيع مهام')}
                  className="p-2 rounded-lg hover:bg-[var(--color-primary)]/10 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all opacity-0 group-hover:opacity-100"
                >
                  <ArrowLeftRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner Tasks */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 px-1">مهام {partner === 'F' ? 'فهد' : 'بشرى'}</h3>
          <div className="space-y-2">
            {partnerTasks.length === 0 && <p className="text-xs opacity-40 italic p-4">لا توجد مهام حالية...</p>}
            {partnerTasks.map(task => (
              <div key={task.id} className="glass-card p-4 flex items-center justify-between gap-3 opacity-80">
                <div className="flex items-center gap-3">
                  <div className={task.status === 'completed' ? 'text-green-500' : 'text-[var(--color-text-secondary)]'}>
                    {task.status === 'completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                  </div>
                  <span className={`text-sm font-bold ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>{task.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                <h3 className="text-xl font-black">إضافة مهمة جديدة</h3>
                <button onClick={() => setShowAdd(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <ModernInput 
                  label="عنوان المهمة" required
                  value={newTask.title}
                  onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-50 uppercase">تعيين إلى</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewTask(prev => ({ ...prev, assignedTo: 'F' }))}
                      className={`flex-1 py-3 rounded-xl border text-xs font-bold ${newTask.assignedTo === 'F' ? 'bg-blue-500/10 border-blue-500 text-blue-500' : 'border-[var(--color-border)] opacity-60'}`}
                    >
                      فهد
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewTask(prev => ({ ...prev, assignedTo: 'B' }))}
                      className={`flex-1 py-3 rounded-xl border text-xs font-bold ${newTask.assignedTo === 'B' ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'border-[var(--color-border)] opacity-60'}`}
                    >
                      بشرى
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-4">إضافة المهمة</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

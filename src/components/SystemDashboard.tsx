import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  ShieldCheck, 
  Calendar, 
  Wallet, 
  TrendingUp, 
  AlertCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useKokab } from '../context/KokabContext';

export const SystemDashboard: React.FC = () => {
  const { planetHealth, tasks, transactions, vitals, currentUser, inventory, calendar } = useKokab();

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const urgentTasks = pendingTasks.filter(t => t.priority === 'urgent' || t.priority === 'high');
  
  const partner = currentUser === 'F' ? 'B' : 'F';
  const partnerVitals = vitals[partner];

  const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);
  const budget = 15000; // Monthly income baseline
  const budgetPercent = Math.max(0, Math.min(100, ((budget - totalSpent) / budget) * 100));

  const inventoryPercent = inventory.length > 0 
    ? Math.round((inventory.filter(i => i.currentStock > i.minStock).length / inventory.length) * 100)
    : 100;

  const nextEvent = calendar
    .filter(e => e.startTime > Date.now())
    .sort((a, b) => a.startTime - b.startTime)[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* System Health Overview */}
      <section className="grid grid-cols-2 gap-4">
        <div className="glass-card p-6 border-l-4 border-l-[var(--color-primary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">كفاءة النظام</span>
            <ShieldCheck size={14} className="text-[var(--color-primary)]" />
          </div>
          <div className="text-3xl font-black">{planetHealth.score}%</div>
          <div className="mt-2 h-1 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-primary)]" style={{ width: `${planetHealth.score}%` }} />
          </div>
        </div>
        
        <div className="glass-card p-6 border-l-4 border-l-[var(--color-accent)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">المهام المعلقة</span>
            <Clock size={14} className="text-[var(--color-accent)]" />
          </div>
          <div className="text-3xl font-black">{pendingTasks.length}</div>
          <div className="text-[10px] font-bold text-[var(--color-text-secondary)] mt-1">
            {urgentTasks.length} مهام عالية الأولوية
          </div>
        </div>
      </section>

      {/* Real-time Logistics Metrics */}
      <section className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]/30 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Activity size={14} /> مؤشرات الحالة التشغيلية
          </h3>
          <span className="text-[10px] font-mono opacity-50">SYNC_OK: 200</span>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6">
          <MetricRow 
            label="ميزانية الشهر المتبقية" 
            value={`$${(budget - totalSpent).toLocaleString()}`} 
            percent={budgetPercent}
            color="var(--color-primary)"
          />
          <MetricRow 
            label={`صحة ${partner === 'F' ? 'فهد' : 'بشرى'}`} 
            value={`${partnerVitals.sleepQuality}%`} 
            percent={partnerVitals.sleepQuality}
            color={partnerVitals.sleepQuality < 50 ? '#ef4444' : '#10b981'}
          />
          <MetricRow 
            label="اكتمال مخزون المنزل" 
            value={`${inventoryPercent}%`} 
            percent={inventoryPercent}
            color="#3b82f6"
          />
        </div>
      </section>

      {/* Critical Alerts */}
      {urgentTasks.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-[10px] font-bold text-red-500 uppercase tracking-widest px-1">تنبيهات حرجة</h3>
          {urgentTasks.map(task => (
            <div key={task.id} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle size={18} className="text-red-500" />
                <div>
                  <div className="text-sm font-bold">{task.title}</div>
                  <div className="text-[10px] opacity-60">مهمة عاجلة • {task.estimatedMinutes} دقيقة متوقعة</div>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors">
                <CheckCircle2 size={18} />
              </button>
            </div>
          ))}
        </section>
      )}

      {/* Next Joint Event */}
      {nextEvent && (
        <section className="glass-card p-6 flex items-center justify-between bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
              <Calendar size={24} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">الحدث المشترك القادم</div>
              <div className="text-lg font-black">{nextEvent.title}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">
                {new Date(nextEvent.startTime).toLocaleDateString('ar-EG')} • {new Date(nextEvent.startTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          <TrendingUp size={24} className="text-[var(--color-primary)] opacity-30" />
        </section>
      )}
    </motion.div>
  );
};

const MetricRow: React.FC<{ label: string; value: string; percent: number; color: string }> = ({ label, value, percent, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <span className="text-xs font-bold opacity-80">{label}</span>
      <span className="text-sm font-mono font-bold" style={{ color }}>{value}</span>
    </div>
    <div className="h-1.5 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

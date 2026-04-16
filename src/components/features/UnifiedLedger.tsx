import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PieChart, 
  Filter,
  Calendar,
  DollarSign,
  Plus,
  X,
  TrendingUp,
  Target,
  AlertCircle,
  ChevronRight,
  Wallet,
  CheckCircle2,
  Clock,
  FileText,
  Shield
} from 'lucide-react';
import { useKokab } from '../../context/KokabContext';
import { ModernInput } from '../ui/ModernInput';
import { Transaction, Liability, AssetGoal } from '../../types';

export const UnifiedLedger: React.FC = () => {
  const { 
    transactions, 
    liabilities, 
    assets, 
    addTransaction, 
    addLiability, 
    addAssetGoal,
    currentUser,
    profiles,
    requestConsensus
  } = useKokab();

  const userProfile = profiles[currentUser];
  const ceiling = userProfile?.delegatedSpendingCeiling || 0;

  // State for filters
  const [filterType, setFilterType] = useState<'all' | 'fixed' | 'variable'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);

  // State for modals
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddLiability, setShowAddLiability] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);

  // Form states
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({ amount: 0, type: 'variable', category: '', description: '' });
  const [newLiability, setNewLiability] = useState<Partial<Liability>>({ name: '', totalAmount: 0, remainingAmount: 0, monthlyInstallment: 0 });
  const [newGoal, setNewGoal] = useState<Partial<AssetGoal>>({ name: '', target: 0, current: 0, requiresDualAuth: false });

  const categories = useMemo(() => ['all', ...new Set(transactions.map(t => t.category))], [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
      const matchesDate = (!dateRange.start || t.timestamp >= new Date(dateRange.start).getTime()) &&
                          (!dateRange.end || t.timestamp <= new Date(dateRange.end).getTime());
      return matchesType && matchesCategory && matchesDate;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [transactions, filterType, filterCategory, dateRange]);

  const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);
  const fixedSpent = transactions.filter(t => t.type === 'fixed').reduce((acc, t) => acc + t.amount, 0);
  const variableSpent = transactions.filter(t => t.type === 'variable').reduce((acc, t) => acc + t.amount, 0);
  
  const monthlyIncome = 15000; // Baseline
  const netIncome = monthlyIncome - totalSpent;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(newTransaction.amount);
    
    if (amount > ceiling) {
      // Request digital signature (consensus)
      requestConsensus('transaction', {
        ...newTransaction,
        timestamp: Date.now(),
        requestedBy: currentUser
      });
      alert(`المبلغ (${amount} ريال) يتجاوز سقف التفويض الخاص بك (${ceiling} ريال). تم إرسال طلب "توقيع رقمي" للشريك.`);
    } else {
      addTransaction(newTransaction);
    }
    
    setShowAddTransaction(false);
    setNewTransaction({ amount: 0, type: 'variable', category: '', description: '' });
  };

  const handleAddLiability = (e: React.FormEvent) => {
    e.preventDefault();
    addLiability(newLiability);
    setShowAddLiability(false);
    setNewLiability({ name: '', totalAmount: 0, remainingAmount: 0, monthlyInstallment: 0 });
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    addAssetGoal(newGoal);
    setShowAddGoal(false);
    setNewGoal({ name: '', target: 0, current: 0, requiresDualAuth: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black">السجل المالي الموحد</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">تحليل دقيق للتدفقات النقدية والمصاريف</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddTransaction(true)}
            className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Spending Ceiling Info */}
      <div className="glass-card p-4 border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold">سقف الإنفاق التفويضي</h4>
            <p className="text-[10px] opacity-60">يمكنك صرف حتى {ceiling} ريال دون موافقة</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-black text-amber-500">{ceiling} ريال</div>
          <div className="text-[8px] opacity-40 uppercase font-bold">صلاحية حالية</div>
        </div>
      </div>

      {/* Net Income Card */}
      <div className="glass-card p-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-bg-card)] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <DollarSign size={120} />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold opacity-80 uppercase tracking-widest">صافي الدخل المتاح</span>
            <div className="px-2 py-1 rounded-md bg-white/20 text-[10px] font-bold">أبريل 2024</div>
          </div>
          <div className="text-5xl font-black">
            ${netIncome.toLocaleString()}
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-[10px] opacity-60 uppercase font-bold">إجمالي الدخل</div>
              <div className="text-lg font-bold">${monthlyIncome.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] opacity-60 uppercase font-bold">إجمالي المصاريف</div>
              <div className="text-lg font-bold text-red-300">-${totalSpent.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <section className="grid grid-cols-2 gap-4">
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>مصاريف ثابتة</span>
          </div>
          <div className="text-xl font-black">${fixedSpent.toLocaleString()}</div>
          <div className="text-[10px] opacity-50">إيجار، فواتير، أقساط</div>
        </div>
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span>مصاريف متغيرة</span>
          </div>
          <div className="text-xl font-black">${variableSpent.toLocaleString()}</div>
          <div className="text-[10px] opacity-50">تسوق، ترفيه، طعام</div>
        </div>
      </section>

      {/* Liabilities Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">الالتزامات المالية</h3>
          <button 
            onClick={() => setShowAddLiability(true)}
            className="p-2 rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {liabilities.map(l => (
            <div key={l.id} className="glass-card p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{l.name}</h4>
                    <p className="text-[10px] text-[var(--color-text-secondary)]">موعد الاستحقاق: {new Date(l.dueDate).toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-rose-500">${l.monthlyInstallment}/شهر</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="opacity-50">الرصيد المتبقي</span>
                  <span>${l.remainingAmount.toLocaleString()} / ${l.totalAmount.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(1 - l.remainingAmount / l.totalAmount) * 100}%` }}
                    className="h-full bg-rose-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Goals Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">الأهداف المالية</h3>
          <button 
            onClick={() => setShowAddGoal(true)}
            className="p-2 rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {assets.map(goal => (
            <div key={goal.id} className="glass-card p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Target size={16} />
                </div>
                <span className="text-[10px] font-black text-emerald-500">{Math.round((goal.current / goal.target) * 100)}%</span>
              </div>
              <div>
                <h4 className="font-bold text-xs">{goal.name}</h4>
                <p className="text-[10px] opacity-50">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</p>
              </div>
              <div className="h-1 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">آخر العمليات</h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
          >
            <Filter size={14} />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card p-4 space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">النوع</label>
                    <select 
                      value={filterType} 
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="input-field text-xs py-2"
                    >
                      <option value="all">الكل</option>
                      <option value="fixed">ثابت</option>
                      <option value="variable">متغير</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">الفئة</label>
                    <select 
                      value={filterCategory} 
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="input-field text-xs py-2"
                    >
                      {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'الكل' : c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">من تاريخ</label>
                    <input 
                      type="date" 
                      value={dateRange.start} 
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="input-field text-xs py-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">إلى تاريخ</label>
                    <input 
                      type="date" 
                      value={dateRange.end} 
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="input-field text-xs py-2"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setFilterType('all');
                    setFilterCategory('all');
                    setDateRange({ start: '', end: '' });
                  }}
                  className="w-full py-2 text-[10px] font-bold text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="space-y-2">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(t => (
              <div key={t.id} className="glass-card p-4 flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${t.type === 'fixed' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {t.type === 'fixed' ? <Calendar size={18} /> : <CreditCard size={18} />}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.description}</div>
                    <div className="text-[10px] text-[var(--color-text-secondary)]">{t.category} • {new Date(t.timestamp).toLocaleDateString('ar-EG')}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-red-500">-${t.amount}</div>
                  <div className="text-[10px] font-bold opacity-50 uppercase">{t.type === 'fixed' ? 'ثابت' : 'متغير'}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center glass-card opacity-50 text-xs">لا توجد عمليات تطابق الفلاتر المختارة</div>
          )}
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {/* Add Transaction Modal */}
        {showAddTransaction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddTransaction(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-8 relative z-10 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">إضافة عملية</h3>
                <button onClick={() => setShowAddTransaction(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <ModernInput 
                  label="المبلغ" type="number" required
                  value={newTransaction.amount || ''}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  icon={<DollarSign size={18} />}
                />
                <ModernInput 
                  label="الوصف" required
                  value={newTransaction.description || ''}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                  icon={<FileText size={18} />}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">النوع</label>
                    <select 
                      value={newTransaction.type} 
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, type: e.target.value as any }))}
                      className="input-field text-xs py-3"
                    >
                      <option value="variable">متغير</option>
                      <option value="fixed">ثابت</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">الفئة</label>
                    <input 
                      type="text" required placeholder="مثلاً: طعام"
                      value={newTransaction.category || ''}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))}
                      className="input-field text-xs py-3"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-4">حفظ العملية</button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Add Liability Modal */}
        {showAddLiability && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddLiability(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-8 relative z-10 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">إضافة التزام مالي</h3>
                <button onClick={() => setShowAddLiability(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddLiability} className="space-y-4">
                <ModernInput 
                  label="اسم الالتزام" required
                  value={newLiability.name || ''}
                  onChange={(e) => setNewLiability(prev => ({ ...prev, name: e.target.value }))}
                  icon={<AlertCircle size={18} />}
                />
                <div className="grid grid-cols-2 gap-3">
                  <ModernInput 
                    label="إجمالي المبلغ" type="number" required
                    value={newLiability.totalAmount || ''}
                    onChange={(e) => setNewLiability(prev => ({ ...prev, totalAmount: Number(e.target.value), remainingAmount: Number(e.target.value) }))}
                  />
                  <ModernInput 
                    label="القسط الشهري" type="number" required
                    value={newLiability.monthlyInstallment || ''}
                    onChange={(e) => setNewLiability(prev => ({ ...prev, monthlyInstallment: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-50 uppercase">تاريخ الاستحقاق القادم</label>
                  <input 
                    type="date" required
                    onChange={(e) => setNewLiability(prev => ({ ...prev, dueDate: new Date(e.target.value).getTime() }))}
                    className="input-field text-xs py-3"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4">حفظ الالتزام</button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddGoal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-8 relative z-10 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">إضافة هدف مالي</h3>
                <button onClick={() => setShowAddGoal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <ModernInput 
                  label="اسم الهدف" required
                  value={newGoal.name || ''}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  icon={<Target size={18} />}
                />
                <div className="grid grid-cols-2 gap-3">
                  <ModernInput 
                    label="المبلغ المستهدف" type="number" required
                    value={newGoal.target || ''}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, target: Number(e.target.value) }))}
                  />
                  <ModernInput 
                    label="المبلغ الحالي" type="number"
                    value={newGoal.current || ''}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, current: Number(e.target.value) }))}
                  />
                </div>
                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-surface)] rounded-xl">
                  <input 
                    type="checkbox" id="dualAuth"
                    checked={newGoal.requiresDualAuth}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, requiresDualAuth: e.target.checked }))}
                    className="w-4 h-4 accent-[var(--color-primary)]"
                  />
                  <label htmlFor="dualAuth" className="text-xs font-bold">يتطلب موافقة الطرفين للسحب</label>
                </div>
                <button type="submit" className="btn-primary w-full py-4">حفظ الهدف</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

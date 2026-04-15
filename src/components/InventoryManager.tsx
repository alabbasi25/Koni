import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  RefreshCw, 
  Plus, 
  Barcode, 
  AlertTriangle,
  ChevronDown,
  Search,
  X
} from 'lucide-react';
import { useKokab } from '../context/KokabContext';
import { ModernInput } from './ModernInput';

export const InventoryManager: React.FC = () => {
  const { inventory, addInventoryItem, updateInventoryStock } = useKokab();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', minStock: 1, currentStock: 1, consumptionFrequencyDays: 30 });

  const filteredItems = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addInventoryItem(newItem);
    setShowAdd(false);
    setNewItem({ name: '', minStock: 1, currentStock: 1, consumptionFrequencyDays: 30 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">إدارة المخزون</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">تتبع احتياجات المنزل الاستهلاكية آلياً</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Low Stock Alerts */}
      <AnimatePresence>
        {lowStockItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3 overflow-hidden"
          >
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
              <AlertTriangle size={14} />
              <span>تنبيه: سلع أوشكت على النفاد</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {lowStockItems.map(item => (
                <span key={item.id} className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-600 text-[10px] font-bold">
                  {item.name} ({item.currentStock}/{item.minStock})
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Actions */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="ابحث في المخزون..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={18} />
        </div>
        <button className="p-3 rounded-xl bg-[var(--color-primary)] text-white shadow-lg">
          <Barcode size={24} />
        </button>
      </div>

      {/* Inventory List */}
      <div className="space-y-3">
        {filteredItems.length === 0 && (
          <div className="p-12 text-center glass-card opacity-50">
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm">المخزون فارغ. ابدأ بإضافة السلع المنزلية.</p>
          </div>
        )}
        {filteredItems.map(item => (
          <div key={item.id} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.currentStock <= item.minStock ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                <Package size={20} />
              </div>
              <div>
                <div className="text-sm font-bold">{item.name}</div>
                <div className="text-[10px] text-[var(--color-text-secondary)]">
                  الاستهلاك: كل {item.consumptionFrequencyDays} يوم
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-black">{item.currentStock}</div>
                <div className="text-[10px] opacity-50">الحد الأدنى: {item.minStock}</div>
              </div>
              <button 
                onClick={() => updateInventoryStock(item.id, item.currentStock + 1)}
                className="p-2 rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        ))}
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
                <h3 className="text-xl font-black">إضافة سلعة للمخزون</h3>
                <button onClick={() => setShowAdd(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <ModernInput 
                  label="اسم السلعة" required
                  value={newItem.name}
                  onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ModernInput 
                    label="المخزون الحالي" type="number" required
                    value={newItem.currentStock}
                    onChange={e => setNewItem(prev => ({ ...prev, currentStock: Number(e.target.value) }))}
                  />
                  <ModernInput 
                    label="الحد الأدنى" type="number" required
                    value={newItem.minStock}
                    onChange={e => setNewItem(prev => ({ ...prev, minStock: Number(e.target.value) }))}
                  />
                </div>
                <ModernInput 
                  label="دورة الاستهلاك (بالأيام)" type="number" required
                  value={newItem.consumptionFrequencyDays}
                  onChange={e => setNewItem(prev => ({ ...prev, consumptionFrequencyDays: Number(e.target.value) }))}
                />
                <button type="submit" className="btn-primary w-full py-4">حفظ في المخزون</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

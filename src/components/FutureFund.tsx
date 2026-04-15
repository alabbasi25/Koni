import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, ShieldCheck } from 'lucide-react';
import { usePlanet } from '../context/KokabContext';

export const FutureFund: React.FC = () => {
  const { assets } = usePlanet();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">صندوق الأهداف</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">مدخراتنا المشتركة للمستقبل</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assets.map(asset => (
          <div key={asset.id} className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="font-bold">{asset.name}</h3>
                  <p className="text-[10px] opacity-50">الهدف: ${asset.target.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black">${asset.current.toLocaleString()}</div>
                <div className="text-[10px] text-green-500 font-bold">{Math.round((asset.current / asset.target) * 100)}% مكتمل</div>
              </div>
            </div>
            
            <div className="h-2 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(asset.current / asset.target) * 100}%` }}
                className="h-full bg-[var(--color-primary)]"
              />
            </div>

            {asset.requiresDualAuth && (
              <div className="flex items-center gap-2 text-[10px] text-amber-500 font-bold">
                <ShieldCheck size={12} /> يتطلب موافقة الطرفين للسحب
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="btn-primary w-full py-4 flex items-center justify-center gap-2">
        <TrendingUp size={20} /> إضافة هدف جديد
      </button>
    </motion.div>
  );
};

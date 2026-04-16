import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, ShieldCheck, Lock, Unlock } from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';

export const FutureFund: React.FC = () => {
  const { assets, unlockAsset, currentUser } = usePlanet();

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
              <div className="pt-4 border-t border-[var(--color-border)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-amber-500 font-bold">
                    <ShieldCheck size={12} /> حصالة الأحلام المشفرة
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[8px] font-bold ${asset.isLocked ? 'bg-rose-500/10 text-rose-500' : 'bg-green-500/10 text-green-500'}`}>
                    {asset.isLocked ? 'مغلقة' : 'مفتوحة'}
                  </div>
                </div>
                
                {asset.isLocked ? (
                  <div className="space-y-2">
                    <p className="text-[10px] opacity-60 leading-relaxed">
                      لا يمكن سحب أي مبلغ إلا بفتح القفل المزدوج (موافقة الطرفين معاً).
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => unlockAsset(asset.id)}
                        disabled={asset.unlockRequests.includes(currentUser)}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold transition-all ${asset.unlockRequests.includes(currentUser) ? 'bg-green-500/20 text-green-500' : 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'}`}
                      >
                        {asset.unlockRequests.includes(currentUser) ? <ShieldCheck size={14} /> : <Lock size={14} />}
                        {asset.unlockRequests.includes(currentUser) ? 'في انتظار الشريك' : 'طلب فتح القفل'}
                      </button>
                    </div>
                    <div className="flex gap-1 justify-center">
                      {['F', 'B'].map(uid => (
                        <div 
                          key={uid}
                          className={`w-2 h-2 rounded-full ${asset.unlockRequests.includes(uid as any) ? 'bg-green-500' : 'bg-[var(--color-bg-surface)]'}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <button className="w-full py-2 rounded-lg bg-green-500 text-white text-[10px] font-bold flex items-center justify-center gap-2">
                    <Unlock size={14} /> سحب مبلغ (القفل مفتوح)
                  </button>
                )}
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

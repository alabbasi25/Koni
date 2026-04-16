import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Eye, 
  Clock, 
  Plus,
  ArrowUpRight,
  ShieldAlert,
  UserCheck,
  Timer
} from 'lucide-react';
import { useKokab } from '../../context/KokabContext';

export const SecureVault: React.FC = () => {
  const { vault, grantTimedAccess } = useKokab();

  const handleGrantAccess = (docId: string) => {
    // Mocking granting access to a "Lawyer" for 60 minutes
    grantTimedAccess(docId, 'B', 60); // In a real app, this would be a specific external ID
    alert('تم منح صلاحية الوصول للمحامي لمدة ساعة واحدة فقط.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-black">الأرشيف الرقمي الآمن</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">تشفير AES-256 للمستندات والذكريات الهامة</p>
      </div>

      {/* Security Status */}
      <div className="p-6 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex gap-4 items-center">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[var(--color-primary)]">التشفير مفعل</h3>
          <p className="text-[10px] leading-relaxed text-[var(--color-primary)]/70">
            يتم تشفير كافة الملفات محلياً قبل الرفع. لا يمكن لأي طرف ثالث (بما في ذلك مطورو كوكب) الوصول لبياناتكما.
          </p>
        </div>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-2 gap-4">
        <DocCategory icon={<FileText size={20} />} label="جوازات السفر" count={2} />
        <DocCategory icon={<Lock size={20} />} label="عقود وفواتير" count={12} />
        <DocCategory icon={<ShieldAlert size={20} />} label="مستندات طبية" count={5} />
        <DocCategory icon={<Clock size={20} />} label="كبسولة الزمن" count={3} />
      </div>

      {/* Recent Documents */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">أحدث المستندات</h3>
          <button className="text-[var(--color-primary)] text-[10px] font-bold flex items-center gap-1">
            <Plus size={14} /> إضافة مستند
          </button>
        </div>

        <div className="space-y-3">
          {vault.length > 0 ? (
            vault.map(doc => (
              <div key={doc.id} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-surface)] flex items-center justify-center text-[var(--color-text-secondary)]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{doc.name}</div>
                    <div className="text-[10px] text-[var(--color-text-secondary)] flex items-center gap-2">
                      {doc.type} • {doc.expiryDate ? `ينتهي في ${new Date(doc.expiryDate).toLocaleDateString('ar-EG')}` : 'دائم'}
                      {doc.timedAccess && (
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Timer size={10} /> صلاحية موقوتة مفعلة
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleGrantAccess(doc.id)}
                    className="p-2 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-colors"
                    title="منح صلاحية موقوتة"
                  >
                    <UserCheck size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg-surface)] flex items-center justify-center mx-auto text-[var(--color-text-secondary)]">
                <Lock size={32} />
              </div>
              <div className="space-y-1">
                <p className="font-bold">لا توجد مستندات حالياً</p>
                <p className="text-xs text-[var(--color-text-secondary)]">ابدأوا بحفظ المستندات الرسمية للوصول السريع</p>
              </div>
              <button className="btn-primary py-2 px-6 text-sm">أضف أول مستند</button>
            </div>
          )}
        </div>
      </section>

      {/* Time Capsule Banner */}
      <section className="glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold">كبسولة الزمن</h3>
            <p className="text-[10px] text-[var(--color-text-secondary)]">رسائل مشفرة تفتح في المستقبل</p>
          </div>
        </div>
        <ArrowUpRight size={20} className="text-indigo-500 opacity-50" />
      </section>
    </motion.div>
  );
};

const DocCategory: React.FC<{ icon: React.ReactNode; label: string; count: number }> = ({ icon, label, count }) => (
  <button className="glass-card p-5 flex flex-col items-start gap-4 hover:border-[var(--color-primary)]/50 transition-all group">
    <div className="p-3 rounded-xl bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
      {icon}
    </div>
    <div className="space-y-1">
      <div className="text-xs font-bold">{label}</div>
      <div className="text-[10px] opacity-50 font-bold">{count} مستندات</div>
    </div>
  </button>
);

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Package, 
  Plane, 
  Lock, 
  MessageSquare, 
  User, 
  Bell, 
  Fingerprint, 
  Menu, 
  X, 
  LayoutDashboard, 
  Wallet, 
  Target, 
  ListTodo, 
  Calendar, 
  Shield, 
  TrendingUp, 
  Activity, 
  Settings, 
  Sparkles, 
  Smile, 
  MessageCircle, 
  History, 
  FileText, 
  Bot,
  ChevronLeft,
  Search,
  Plus,
  LogOut,
  Send,
  Swords,
  Library,
  Droplets,
  Zap,
  Baby
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePlanet } from '../context/KokabContext';
import { SystemDashboard } from './SystemDashboard';
import { InventoryManager } from './InventoryManager';
import { UnifiedLedger } from './UnifiedLedger';
import { WorshipSync } from './WorshipSync';
import { VitalSignsLog } from './VitalSignsLog';
import { SecureVault } from './SecureVault';
import { TravelPlanner } from './TravelPlanner';
import { FutureFund } from './FutureFund';
import { TaskOrchestrator } from './TaskOrchestrator';
import { GlobalSchedule } from './GlobalSchedule';
import { PrivateSanctum } from './PrivateSanctum';
import { GratitudeFeed } from './GratitudeFeed';
import { ConflictRoom } from './ConflictRoom';
import { PermissionsManager } from './PermissionsManager';
import { PersonalGrowth } from './PersonalGrowth';
import { AIOracle } from './AIOracle';
import { Arena } from './Arena';
import { RomanceLounge } from './RomanceLounge';
import { KnowledgeStudio } from './KnowledgeStudio';
import { FocusSync } from './FocusSync';
import { HydrationStation } from './HydrationStation';
import { TimeCapsule } from './TimeCapsule';
import { HapticPresence } from './HapticPresence';
import { FutureFamily } from './FutureFamily';

type ViewID = 
  | 'arena' | 'romance' | 'knowledge' | 'focus' | 'conflict'
  | 'system' | 'ledger' | 'future_fund' | 'tasks' | 'inventory' | 'worship'
  | 'private' | 'growth' | 'health' | 'hydration' | 'travel' | 'family'
  | 'haptic' | 'gratitude' | 'capsule' | 'vault'
  | 'home' | 'profile' | 'permissions' | 'ai' | 'chat';

export const Dashboard: React.FC = () => {
  const { 
    currentUser, 
    partnerStatus, 
    planetHealth, 
    notifications,
    consensusRequests,
    resolveConsensus
  } = usePlanet();
  
  const [activeTab, setActiveTab] = useState<ViewID>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [presenceActive, setPresenceActive] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handlePresencePulse = () => {
    setPresenceActive(true);
    if ('vibrate' in navigator) navigator.vibrate(200);
    setTimeout(() => setPresenceActive(false), 2000);
  };

  const menuItems = [
    // Joy & Bond Wing
    { id: 'arena', label: 'ساحة التحديات', icon: <Swords size={20} />, category: 'جناح المتعة والتواصل' },
    { id: 'romance', label: 'صالون الرومانسية', icon: <Heart size={20} />, category: 'جناح المتعة والتواصل' },
    { id: 'gratitude', label: 'جدار الامتنان', icon: <Smile size={20} />, category: 'جناح المتعة والتواصل' },
    { id: 'haptic', label: 'بوابة الهمس', icon: <Fingerprint size={20} />, category: 'جناح المتعة والتواصل' },
    { id: 'conflict', label: 'غرفة التفاهم', icon: <Shield size={20} />, category: 'جناح المتعة والتواصل' },
    
    // Enlightenment Wing
    { id: 'knowledge', label: 'استوديو المعرفة', icon: <Library size={20} />, category: 'جناح العقل والهوايات' },
    { id: 'focus', label: 'وضع التركيز', icon: <Zap size={20} />, category: 'جناح العقل والهوايات' },
    { id: 'growth', label: 'مسار النمو', icon: <TrendingUp size={20} />, category: 'جناح العقل والهوايات' },
    { id: 'capsule', label: 'كبسولة الزمن', icon: <History size={20} />, category: 'جناح العقل والهوايات' },
    { id: 'travel', label: 'مخطط الرحلات', icon: <Plane size={20} />, category: 'جناح العقل والهوايات' },
    { id: 'family', label: 'مشروع العائلة', icon: <Baby size={20} />, category: 'جناح العقل والهوايات' },
    
    // Core Systems
    { id: 'system', label: 'لوحة القيادة', icon: <LayoutDashboard size={20} />, category: 'المنظومة المركزية' },
    { id: 'ledger', label: 'المحرك المالي', icon: <Wallet size={20} />, category: 'المنظومة المركزية' },
    { id: 'future_fund', label: 'خزينة الأصول', icon: <Target size={20} />, category: 'المنظومة المركزية' },
    { id: 'tasks', label: 'محرك المهام', icon: <ListTodo size={20} />, category: 'المنظومة المركزية' },
    { id: 'inventory', label: 'قائمة التوريد', icon: <Package size={20} />, category: 'المنظومة المركزية' },
    { id: 'worship', label: 'المحراب', icon: <Sparkles size={20} />, category: 'المنظومة المركزية' },
    { id: 'private', label: 'القبو الشخصي', icon: <Lock size={20} />, category: 'المنظومة المركزية' },
    { id: 'health', label: 'السجل الصحي', icon: <Activity size={20} />, category: 'المنظومة المركزية' },
    { id: 'hydration', label: 'واحة الارتواء', icon: <Droplets size={20} />, category: 'المنظومة المركزية' },
    { id: 'vault', label: 'أرشيف المستندات', icon: <FileText size={20} />, category: 'المنظومة المركزية' },
  ];

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView />;
      case 'arena': return <Arena />;
      case 'romance': return <RomanceLounge />;
      case 'knowledge': return <KnowledgeStudio />;
      case 'focus': return <FocusSync />;
      case 'system': return <SystemDashboard />;
      case 'inventory': return <InventoryManager />;
      case 'ledger': return <UnifiedLedger />;
      case 'future_fund': return <FutureFund />;
      case 'tasks': return <TaskOrchestrator />;
      case 'worship': return <WorshipSync />;
      case 'private': return <PrivateSanctum />;
      case 'growth': return <PersonalGrowth />;
      case 'health': return <VitalSignsLog />;
      case 'hydration': return <HydrationStation />;
      case 'haptic': return <HapticPresence />;
      case 'gratitude': return <GratitudeFeed />;
      case 'conflict': return <ConflictRoom />;
      case 'capsule': return <TimeCapsule />;
      case 'travel': return <TravelPlanner />;
      case 'family': return <FutureFamily />;
      case 'vault': return <SecureVault />;
      case 'permissions': return <PermissionsManager />;
      case 'ai': return <AIOracle />;
      case 'chat': return <AIOracle />;
      case 'profile': return <ProfileView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[var(--color-primary)]"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tighter">كوكب</h1>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${partnerStatus?.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-[10px] font-bold opacity-60">
                {partnerStatus?.status === 'online' ? 'الشريك متصل' : 'الشريك غير متصل'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center relative"
          >
            <Bell size={20} />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--color-bg-deep)]" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-xl glass overflow-hidden border-2 border-[var(--color-primary)]/20"
          >
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser === 'F' ? 'Fahad' : 'Bushra'}`} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-32 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Consensual Input Overlay */}
      <AnimatePresence>
        {consensusRequests.filter(r => r.status === 'pending' && r.requestedBy !== currentUser).map(req => (
          <motion.div 
            key={req.id}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-24 left-6 right-6 z-[60] glass-card p-6 border-amber-500/30 shadow-2xl shadow-amber-500/20"
          >
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-500">
                <Shield size={24} />
              </div>
              <div className="flex-1 space-y-3">
                <h4 className="text-sm font-bold">طلب تأكيد مزدوج</h4>
                <p className="text-xs opacity-70">
                  يطلب {req.requestedBy === 'F' ? 'فهد' : 'بشرى'} إضافة {req.type === 'transaction' ? 'مصروف مالي' : 'موعد جديد'}. هل توافق؟
                </p>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => resolveConsensus(req.id, true)}
                    className="flex-1 py-2 rounded-lg bg-green-500 text-white text-xs font-bold"
                  >
                    موافقة
                  </button>
                  <button 
                    onClick={() => resolveConsensus(req.id, false)}
                    className="flex-1 py-2 rounded-lg bg-rose-500/10 text-rose-500 text-xs font-bold"
                  >
                    رفض
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-4/5 bg-[var(--color-bg-deep)] z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white">
                    <Heart size={24} />
                  </div>
                  <span className="text-xl font-black">القائمة</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-[var(--color-text-secondary)]">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'home' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    <LayoutDashboard size={20} />
                    <span className="text-sm font-bold">الرئيسية</span>
                  </button>
                </div>
                {['جناح المتعة والتواصل', 'جناح العقل والهوايات', 'المنظومة المركزية'].map(cat => (
                  <div key={cat} className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2">{cat}</h3>
                    <div className="space-y-1">
                      {menuItems.filter(item => item.category === cat).map(item => (
                        <button
                          key={item.id}
                          onClick={() => { setActiveTab(item.id as ViewID); setIsMenuOpen(false); }}
                          className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === item.id ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                        >
                          {item.icon}
                          <span className="text-sm font-bold">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTab('permissions'); setIsMenuOpen(false); }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'permissions' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    <Shield size={20} />
                    <span className="text-sm font-bold">الصلاحيات والسيادة</span>
                  </button>
                </div>
              </div>

              <div className="p-8 border-t border-[var(--color-border)]">
                <button className="w-full p-4 rounded-xl bg-rose-500/10 text-rose-500 flex items-center gap-4 font-bold text-sm">
                  <LogOut size={20} /> تسجيل الخروج
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 z-40">
        <div className="glass rounded-3xl p-2 flex justify-between items-center shadow-2xl shadow-[var(--color-shadow)]">
          <TabItem 
            icon={<Heart size={24} />} 
            label="الرئيسية" 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}
          />
          <TabItem 
            icon={<Package size={24} />} 
            label="المخزون" 
            active={activeTab === 'inventory'} 
            onClick={() => setActiveTab('inventory')}
          />
          <div className="relative -top-8">
            <button 
              onClick={handlePresencePulse}
              className={`w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-xl shadow-[var(--color-shadow)] flex items-center justify-center hover:scale-110 transition-transform duration-300 ${presenceActive ? 'animate-ping' : ''}`}
            >
              <Fingerprint size={32} />
            </button>
          </div>
          <TabItem 
            icon={<MessageSquare size={24} />} 
            label="المستشار" 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
          />
          <TabItem 
            icon={<User size={24} />} 
            label="أنا" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          />
        </div>
      </nav>
    </div>
  );
};

const TabItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${active ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-[var(--color-text-secondary)] opacity-60 hover:opacity-100'}`}
  >
    {icon}
    <span className="text-[8px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

const HomeView: React.FC = () => {
  const { planetHealth } = usePlanet();
  
  return (
    <div className="space-y-8">
      {/* Planet Health Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-8 text-center relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" />
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} /> حالة الكوكب: مستقرة
          </div>
          <div className="relative inline-block">
            <div className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              {planetHealth.score}%
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-dashed border-[var(--color-primary)]/20 rounded-full"
            />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-[200px] mx-auto leading-relaxed">
            كوكبنا يزدهر اليوم. التوازن بين الصحة والمالية والروحانيات في أفضل حالاته.
          </p>
        </div>
      </motion.div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-2 gap-4">
        <PillarCard label="اللوجستيات" value={planetHealth.breakdown.logistics} color="blue" />
        <PillarCard label="المالية" value={planetHealth.breakdown.finance} color="emerald" />
        <PillarCard label="الروحانيات" value={planetHealth.breakdown.spiritual} color="purple" />
        <PillarCard label="الصحة" value={planetHealth.breakdown.health} color="rose" />
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 px-1">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="glass p-4 rounded-2xl flex items-center gap-3 hover:bg-[var(--color-primary)]/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
              <Plus size={18} />
            </div>
            <span className="text-xs font-bold">إضافة مصروف</span>
          </button>
          <button className="glass p-4 rounded-2xl flex items-center gap-3 hover:bg-[var(--color-primary)]/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <ListTodo size={18} />
            </div>
            <span className="text-xs font-bold">مهمة جديدة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PillarCard: React.FC<{ label: string; value: number; color: 'blue' | 'emerald' | 'purple' | 'rose' }> = ({ label, value, color }) => {
  const colorMap = {
    blue: 'bg-blue-500 text-blue-500',
    emerald: 'bg-emerald-500 text-emerald-500',
    purple: 'bg-purple-500 text-purple-500',
    rose: 'bg-rose-500 text-rose-500'
  };

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold opacity-60">{label}</span>
        <span className={`text-xs font-black ${colorMap[color].split(' ')[1]}`}>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${colorMap[color].split(' ')[0]}`}
        />
      </div>
    </div>
  );
};

const ProfileView: React.FC = () => {
  const { currentUser } = usePlanet();
  
  return (
    <div className="space-y-8 text-center">
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-3xl glass p-1 border-2 border-[var(--color-primary)]/30">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser === 'F' ? 'Fahad' : 'Bushra'}`} 
            alt="Profile" 
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-[var(--color-bg-deep)]" />
      </div>
      
      <div>
        <h2 className="text-2xl font-black">{currentUser === 'F' ? 'فهد' : 'بشرى'}</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">مستكشف الكوكب</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <div className="text-2xl font-black">٤٢</div>
          <div className="text-[10px] opacity-50 uppercase font-bold">مهمة منجزة</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-2xl font-black">١٢</div>
          <div className="text-[10px] opacity-50 uppercase font-bold">هدف محقق</div>
        </div>
      </div>

      <div className="space-y-2">
        <button className="btn-secondary w-full py-4 flex items-center justify-center gap-2">
          <Settings size={20} /> إعدادات الحساب
        </button>
        <button className="w-full py-4 text-rose-500 font-bold text-sm">
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

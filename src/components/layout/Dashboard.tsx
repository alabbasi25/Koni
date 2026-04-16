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
import { usePlanet } from '../../context/KokabContext';
import { SystemDashboard } from '../features/SystemDashboard';
import { InventoryManager } from '../features/InventoryManager';
import { UnifiedLedger } from '../features/UnifiedLedger';
import { WorshipSync } from '../features/WorshipSync';
import { VitalSignsLog } from '../features/VitalSignsLog';
import { SecureVault } from '../features/SecureVault';
import { TravelPlanner } from '../features/TravelPlanner';
import { FutureFund } from '../features/FutureFund';
import { TaskOrchestrator } from '../features/TaskOrchestrator';
import { GlobalSchedule } from '../features/GlobalSchedule';
import { PrivateSanctum } from '../features/PrivateSanctum';
import { GratitudeFeed } from '../features/GratitudeFeed';
import { ConflictRoom } from '../features/ConflictRoom';
import { PermissionsManager } from '../features/PermissionsManager';
import { PersonalGrowth } from '../features/PersonalGrowth';
import { AIOracle } from '../features/AIOracle';
import { Arena } from '../features/Arena';
import { RomanceLounge } from '../features/RomanceLounge';
import { KnowledgeStudio } from '../features/KnowledgeStudio';
import { FocusSync } from '../features/FocusSync';
import { HydrationStation } from '../features/HydrationStation';
import { TimeCapsule } from '../features/TimeCapsule';
import { HapticPresence } from '../features/HapticPresence';
import { FutureFamily } from '../features/FutureFamily';
import { ProfilePage } from '../views/ProfilePage';

type ViewID = 
  | 'arena' | 'romance' | 'knowledge' | 'focus' | 'conflict'
  | 'system' | 'ledger' | 'future_fund' | 'tasks' | 'inventory' | 'worship'
  | 'private' | 'growth' | 'health' | 'hydration' | 'travel' | 'family'
  | 'haptic' | 'gratitude' | 'capsule' | 'vault'
  | 'home' | 'profile' | 'permissions' | 'ai' | 'chat';

export const Dashboard: React.FC<{ onSwitchUser: () => void }> = ({ onSwitchUser }) => {
  const { 
    currentUser, 
    partnerStatus, 
    planetHealth, 
    notifications,
    consensusRequests,
    resolveConsensus,
    populateTestData
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
    const viewProps = { setActiveTab };
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} />;
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
      case 'profile': return <ProfilePage onSwitchUser={onSwitchUser} />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[var(--color-bg-deep)]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-l border-[var(--color-border)] flex-col bg-[var(--color-bg-card)]/30 backdrop-blur-2xl z-50">
        <div className="p-8 flex items-center gap-3 border-b border-[var(--color-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/20">
            <Heart size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">كوكب</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'home' ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
            >
              <LayoutDashboard size={20} />
              <span className="text-sm font-bold">الرئيسية</span>
            </button>
          </div>
          
          {['جناح المتعة والتواصل', 'جناح العقل والهوايات', 'المنظومة المركزية'].map(cat => (
            <div key={cat} className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2">{cat}</h3>
              <div className="space-y-1">
                {menuItems.filter(item => item.category === cat).map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ViewID)}
                    className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all ${activeTab === item.id ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    {item.icon}
                    <span className="text-sm font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-[var(--color-border)]">
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-full p-3 rounded-xl bg-[var(--color-bg-surface)] flex items-center gap-3 hover:bg-[var(--color-primary)]/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)] transition-colors">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser === 'F' ? 'Fahad' : 'Bushra'}`} 
                alt="Profile" 
              />
            </div>
            <div className="text-right">
              <div className="text-xs font-bold">{currentUser === 'F' ? 'فهد' : 'بشرى'}</div>
              <div className="text-[10px] opacity-50">عرض الملف الشخصي</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Mobile-First Container */}
      <div className="flex-1 flex flex-col max-w-md mx-auto lg:max-w-none lg:px-12 relative overflow-hidden">
        {/* Header */}
        <header className="p-6 flex justify-between items-center z-50 lg:py-8 lg:px-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[var(--color-primary)] lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="lg:hidden">
              <h1 className="text-xl font-black tracking-tighter">كوكب</h1>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${partnerStatus?.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-[10px] font-bold opacity-60">
                  {partnerStatus?.status === 'online' ? 'الشريك متصل' : 'الشريك غير متصل'}
                </span>
              </div>
            </div>
            {/* Desktop Breadcrumb-ish */}
            <div className="hidden lg:block">
              <h2 className="text-2xl font-black tracking-tight">
                {activeTab === 'home' ? 'مرحباً بك في كوكبكم' : menuItems.find(i => i.id === activeTab)?.label || 'الملف الشخصي'}
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] font-bold">
                {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-4 ml-6 px-4 py-2 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${partnerStatus?.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-[10px] font-bold opacity-60">الشريك: {partnerStatus?.status === 'online' ? 'متصل' : 'غير متصل'}</span>
              </div>
              <div className="w-px h-4 bg-[var(--color-border)]" />
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-amber-500" />
                <span className="text-[10px] font-bold opacity-60">صحة الكوكب: {planetHealth.score}%</span>
              </div>
            </div>

            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center relative hover:bg-[var(--color-primary)]/10 transition-colors"
            >
              <Bell size={20} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--color-bg-deep)]" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className="w-10 h-10 rounded-xl glass overflow-hidden border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] transition-all lg:hidden"
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
        <main className="flex-1 px-6 pb-32 overflow-y-auto no-scrollbar lg:px-0 lg:max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

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
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 z-40 lg:hidden">
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

const HomeView: React.FC<{ setActiveTab: (tab: ViewID) => void }> = ({ setActiveTab }) => {
  const { planetHealth, populateTestData } = usePlanet();
  
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <QuickAction 
            icon={<Plus size={18} />} 
            label="إضافة مصروف" 
            color="blue" 
            onClick={() => setActiveTab('ledger')}
          />
          <QuickAction 
            icon={<ListTodo size={18} />} 
            label="مهمة جديدة" 
            color="emerald" 
            onClick={() => setActiveTab('tasks')}
          />
          <QuickAction 
            icon={<Sparkles size={18} />} 
            label="بدء جلسة ذكر" 
            color="purple" 
            onClick={() => setActiveTab('worship')}
          />
          <QuickAction 
            icon={<Bot size={18} />} 
            label="استشارة ذكية" 
            color="rose" 
            onClick={() => setActiveTab('ai')}
          />
          <QuickAction 
            icon={<Zap size={18} />} 
            label="وضع التجربة" 
            color="blue" 
            onClick={() => populateTestData()}
          />
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ icon: React.ReactNode; label: string; color: string; onClick: () => void }> = ({ icon, label, color, onClick }) => {
  const colorMap = {
    blue: 'bg-blue-500/20 text-blue-500',
    emerald: 'bg-emerald-500/20 text-emerald-500',
    purple: 'bg-purple-500/20 text-purple-500',
    rose: 'bg-rose-500/20 text-rose-500'
  };

  return (
    <button 
      onClick={onClick}
      className="glass p-4 rounded-2xl flex items-center gap-3 hover:bg-[var(--color-primary)]/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
    >
      <div className={`w-10 h-10 rounded-xl ${colorMap[color as keyof typeof colorMap]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-xs font-bold">{label}</span>
    </button>
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

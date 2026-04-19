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
  Book,
  Droplets,
  Zap,
  Baby,
  GraduationCap
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
import { NotificationCenter } from '../ui/NotificationCenter';
import { PlanetHealthSection } from '../ui/PlanetHealthSection';

import { MoodTracker } from '../features/MoodTracker';
import { SharedJournal } from '../features/SharedJournal';
import { LoveLanguageQuiz } from '../features/LoveLanguageQuiz';
import { DateNightAI } from '../features/DateNightAI';

type ViewID = 
  | 'arena' | 'romance' | 'knowledge' | 'focus' | 'conflict'
  | 'system' | 'ledger' | 'future_fund' | 'tasks' | 'inventory' | 'worship'
  | 'private' | 'growth' | 'health' | 'hydration' | 'travel' | 'family'
  | 'haptic' | 'gratitude' | 'capsule' | 'vault'
  | 'mood' | 'journal' | 'quiz' | 'dates'
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

  const handlePresencePulse = () => {
    setPresenceActive(true);
    if ('vibrate' in navigator) navigator.vibrate(200);
    setTimeout(() => setPresenceActive(false), 2000);
  };

  const menuItems = [
    // Relationship & Connection
    { id: 'gratitude', label: 'سجل المودة', icon: <Smile size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'romance', label: 'صالون الرومانسية', icon: <Heart size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'dates', label: 'اقتراحات السهرات', icon: <Sparkles size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'journal', label: 'يوميات الكوكب', icon: <Book size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'quiz', label: 'لغات الحب', icon: <Bot size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'haptic', label: 'بوابة الهمس', icon: <Fingerprint size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'conflict', label: 'غرفة التفاهم', icon: <Shield size={20} />, category: 'جسور المودة والتواصل' },
    
    // Core & Finance
    { id: 'system', label: 'لوحة القيادة', icon: <LayoutDashboard size={20} />, category: 'المنظومة والمالية' },
    { id: 'ledger', label: 'الميزانية والمالية', icon: <Wallet size={20} />, category: 'المنظومة والمالية' },
    { id: 'future_fund', label: 'خزينة الأصول', icon: <Target size={20} />, category: 'المنظومة والمالية' },
    { id: 'tasks', label: 'محرك المهام', icon: <ListTodo size={20} />, category: 'إدارة الحياة اليومية' },
    { id: 'inventory', label: 'قائمة التوريد', icon: <Package size={20} />, category: 'إدارة الحياة اليومية' },
    { id: 'worship', label: 'المحراب', icon: <Sparkles size={20} />, category: 'إدارة الحياة اليومية' },

    // Growth & Health
    { id: 'mood', label: 'غلاف المشاعر', icon: <Smile size={20} />, category: 'النمو والصحة' },
    { id: 'health', label: 'السجل الصحي', icon: <Activity size={20} />, category: 'النمو والصحة' },
    { id: 'hydration', label: 'واحة الارتواء', icon: <Droplets size={20} />, category: 'النمو والصحة' },
    { id: 'growth', label: 'مسار النمو', icon: <TrendingUp size={20} />, category: 'النمو والصحة' },
    { id: 'knowledge', label: 'استوديو المعرفة', icon: <GraduationCap size={20} />, category: 'النمو والصحة' },
    { id: 'focus', label: 'وضع التركيز', icon: <Zap size={20} />, category: 'النمو والصحة' },
    { id: 'arena', label: 'ساحة التحديات', icon: <Swords size={20} />, category: 'النمو والصحة' },

    // Future & Private
    { id: 'family', label: 'مشروع العائلة', icon: <Baby size={20} />, category: 'المستقبل والخصوصية' },
    { id: 'travel', label: 'مخطط الرحلات', icon: <Plane size={20} />, category: 'المستقبل والخصوصية' },
    { id: 'capsule', label: 'كبسولة الزمن', icon: <History size={20} />, category: 'المستقبل والخصوصية' },
    { id: 'vault', label: 'أرشيف المستندات', icon: <FileText size={20} />, category: 'المستقبل والخصوصية' },
    { id: 'private', label: 'القبو الشخصي', icon: <Lock size={20} />, category: 'المستقبل والخصوصية' },
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
      case 'mood': return <MoodTracker />;
      case 'journal': return <SharedJournal />;
      case 'quiz': return <LoveLanguageQuiz />;
      case 'dates': return <DateNightAI />;
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
            <motion.button
              onClick={() => setActiveTab('home')}
              whileTap={{ scale: 0.95 }}
              className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'home' ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
            >
              <LayoutDashboard size={20} />
              <span className="text-sm font-bold">الرئيسية</span>
            </motion.button>
          </div>
          
          {['جسور المودة والتواصل', 'المنظومة والمالية', 'إدارة الحياة اليومية', 'النمو والصحة', 'المستقبل والخصوصية'].map(cat => (
            <div key={cat} className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2">{cat}</h3>
              <div className="space-y-1">
                {menuItems.filter(item => item.category === cat).map(item => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ViewID)}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all ${activeTab === item.id ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    {item.icon}
                    <span className="text-sm font-bold">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-[var(--color-border)]">
          <motion.button 
            whileTap={{ scale: 0.98 }}
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
          </motion.button>
        </div>
      </aside>

      {/* Main Mobile-First Container */}
      <div className="flex-1 flex flex-col max-w-md mx-auto lg:max-w-none lg:px-12 relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 p-6 flex justify-between items-center z-50 bg-[var(--color-bg-deep)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/20 lg:py-8 lg:px-0 lg:bg-transparent lg:backdrop-blur-none lg:border-none">
          <div className="flex items-center gap-4">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(true)}
              className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[var(--color-primary)] lg:hidden border border-[var(--color-border)]/40 shadow-xl"
            >
              <Menu size={24} />
            </motion.button>
            <div className="lg:hidden">
              <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">كوكب</h1>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${partnerStatus?.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
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

            <NotificationCenter />
            
            <motion.button 
              onClick={() => setActiveTab('profile')}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl glass overflow-hidden border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] transition-all lg:hidden"
            >
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser === 'F' ? 'Fahad' : 'Bushra'}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </motion.button>
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
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-[var(--color-text-secondary)]"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                <div className="space-y-1">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'home' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    <LayoutDashboard size={20} />
                    <span className="text-sm font-bold">الرئيسية</span>
                  </motion.button>
                </div>
                {['جسور المودة والتواصل', 'المنظومة والمالية', 'إدارة الحياة اليومية', 'النمو والصحة', 'المستقبل والخصوصية'].map(cat => (
                  <div key={cat} className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2">{cat}</h3>
                    <div className="space-y-1">
                      {menuItems.filter(item => item.category === cat).map(item => (
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          key={item.id}
                          onClick={() => { setActiveTab(item.id as ViewID); setIsMenuOpen(false); }}
                          className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === item.id ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                        >
                          {item.icon}
                          <span className="text-sm font-bold">{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="space-y-1">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveTab('permissions'); setIsMenuOpen(false); }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'permissions' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    <Shield size={20} />
                    <span className="text-sm font-bold">الصلاحيات والسيادة</span>
                  </motion.button>
                </div>
              </div>

              <div className="p-8 border-t border-[var(--color-border)]">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full p-4 rounded-xl bg-rose-500/10 text-rose-500 flex items-center gap-4 font-bold text-sm"
                >
                  <LogOut size={20} /> تسجيل الخروج
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 lg:p-6 z-40 lg:hidden pointer-events-none">
        <div className="glass rounded-[32px] p-2 flex justify-between items-center shadow-2xl shadow-black/40 border border-[var(--color-border)]/50 backdrop-blur-2xl pointer-events-auto mb-safe">
          <TabItem 
            icon={<LayoutDashboard size={22} />} 
            label="الرئيسية" 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}
          />
          <TabItem 
            icon={<Package size={22} />} 
            label="المخزون" 
            active={activeTab === 'inventory'} 
            onClick={() => setActiveTab('inventory')}
          />
          <div className="relative -top-8 px-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handlePresencePulse}
              className={`w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-2xl shadow-[var(--color-primary)]/40 flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-[var(--color-bg-deep)] ${presenceActive ? 'animate-pulse' : ''}`}
            >
              <Fingerprint size={28} />
              {presenceActive && (
                <motion.div 
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
            </motion.button>
          </div>
          <TabItem 
            icon={<Bot size={22} />} 
            label="المستشار" 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
          />
          <TabItem 
            icon={<User size={22} />} 
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
  <motion.button 
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${active ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-[var(--color-text-secondary)] opacity-60 hover:opacity-100'}`}
  >
    {icon}
    <span className="text-[8px] font-bold uppercase tracking-tighter">{label}</span>
  </motion.button>
);

import { PlanetWeather } from '../features/PlanetWeather';

const HomeView: React.FC<{ setActiveTab: (tab: ViewID) => void }> = ({ setActiveTab }) => {
  const { planetHealth, populateTestData, currentUser } = usePlanet();
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h2 className="text-3xl font-black tracking-tight">أهلاً، {currentUser === 'F' ? 'فهد' : 'بشرى'} 👋</h2>
        <p className="text-sm text-[var(--color-text-secondary)] font-medium">إليك ملخص حالة كوكبك اليوم</p>
      </div>

      {/* Planet Health Score Section */}
      <PlanetHealthSection />

      {/* Planet Weather Hero */}
      <PlanetWeather />

      {/* Pillars Grid - Bento Style */}
      <div className="grid grid-cols-2 gap-4">
        <PillarCard label="اللوجستيات" value={planetHealth.breakdown.logistics} color="blue" icon={<Package size={16} />} />
        <PillarCard label="المالية" value={planetHealth.breakdown.finance} color="emerald" icon={<Wallet size={16} />} />
        <PillarCard label="الروحانيات" value={planetHealth.breakdown.spiritual} color="purple" icon={<Sparkles size={16} />} />
        <PillarCard label="الصحة" value={planetHealth.breakdown.health} color="rose" icon={<Activity size={16} />} />
      </div>

      {/* Quick Actions - Horizontal Scroll on Mobile */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">إجراءات سريعة</h3>
          <button onClick={populateTestData} className="text-[10px] font-bold text-[var(--color-primary)] hover:underline">تحديث البيانات</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          <QuickAction 
            icon={<Plus size={20} />} 
            label="مصروف" 
            color="blue" 
            onClick={() => setActiveTab('ledger')}
          />
          <QuickAction 
            icon={<ListTodo size={20} />} 
            label="مهمة" 
            color="emerald" 
            onClick={() => setActiveTab('tasks')}
          />
          <QuickAction 
            icon={<Sparkles size={20} />} 
            label="ذكر" 
            color="purple" 
            onClick={() => setActiveTab('worship')}
          />
          <QuickAction 
            icon={<Bot size={20} />} 
            label="استشارة" 
            color="rose" 
            onClick={() => setActiveTab('ai')}
          />
          <QuickAction 
            icon={<Zap size={20} />} 
            label="تجربة" 
            color="amber" 
            onClick={() => populateTestData()}
          />
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ icon: React.ReactNode; label: string; color: string; onClick: () => void }> = ({ icon, label, color, onClick }) => {
  const colorMap = {
    blue: 'bg-blue-500/20 text-blue-500 border-blue-500/20',
    emerald: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20',
    purple: 'bg-purple-500/20 text-purple-500 border-purple-500/20',
    rose: 'bg-rose-500/20 text-rose-500 border-rose-500/20',
    amber: 'bg-amber-500/20 text-amber-500 border-amber-500/20'
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex-shrink-0 w-24 h-24 glass-card flex flex-col items-center justify-center gap-2 hover:bg-[var(--color-primary)]/10 transition-all duration-300 hover:scale-[1.05] group border border-[var(--color-border)]/40"
    >
      <div className={`w-10 h-10 rounded-2xl ${colorMap[color as keyof typeof colorMap]} flex items-center justify-center group-hover:rotate-12 transition-transform border`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold tracking-tight">{label}</span>
    </motion.button>
  );
};

const PillarCard: React.FC<{ label: string; value: number; color: 'blue' | 'emerald' | 'purple' | 'rose'; icon: React.ReactNode }> = ({ label, value, color, icon }) => {
  const colorMap = {
    blue: 'bg-blue-500 text-blue-500',
    emerald: 'bg-emerald-500 text-emerald-500',
    purple: 'bg-purple-500 text-purple-500',
    rose: 'bg-rose-500 text-rose-500'
  };

  return (
    <div className="glass-card p-5 space-y-4 relative overflow-hidden group">
      <div className="absolute -right-2 -top-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        {React.cloneElement(icon as React.ReactElement, { size: 64 })}
      </div>
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-2 rounded-lg ${colorMap[color].split(' ')[0]}/10 ${colorMap[color].split(' ')[1]}`}>
          {icon}
        </div>
        <span className={`text-lg font-black ${colorMap[color].split(' ')[1]}`}>{value}%</span>
      </div>
      <div className="space-y-2 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">{label}</span>
        <div className="h-1.5 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${colorMap[color].split(' ')[0]}`}
          />
        </div>
      </div>
    </div>
  );
};

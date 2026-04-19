import React, { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { 
  UserID, 
  UserStatus, 
  PlanetHealth, 
  Task, 
  KokabState,
  CalendarEvent,
  InventoryItem,
  Transaction,
  Liability,
  AssetGoal,
  SecureDocument,
  WorshipSession,
  VitalSigns,
  Notification,
  TravelPlan,
  FutureFamily,
  Permission,
  ConsensusRequest,
  PrivateNote,
  GratitudePost,
  ConflictMessage,
  Challenge,
  RomancePrompt,
  Book,
  FocusState,
  HydrationLog,
  TimeCapsuleMessage,
  Habit,
  UserProfile,
  Streak,
  ArbitrationRequest,
  ChildReport,
  AudioNote,
  KanbanItem,
  MarginaliaComment,
  GeoTimeCapsule,
  HobbyProject,
  PlanetWeather,
  PlanetWeatherStatus,
  ChildMilestone,
  VisionBoardGoal,
  DeadManSwitch,
  FitnessBattle,
  Budget,
  MoodEntry,
  JournalEntry,
  LoveLanguage,
  LoveLanguageResult,
  CoinStaking,
  QuranTracker,
  MoodConfig,
  PriorityConfig
} from '../types';
import { calculatePlanetHealth } from '../planetLogic';

interface PlanetContextType extends KokabState {
  athkar: AthkarItem[];
  
  // Actions
  updateMood: (mood: string) => void;
  setWorkMode: (enabled: boolean) => void;
  addTask: (task: Partial<Task>) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  delegateTask: (taskId: string, to: UserID, reason: string) => void;
  addTransaction: (t: Partial<Transaction>) => void;
  requestWithdraw: (goalId: string, amount: number) => void;
  approveWithdraw: (goalId: string) => void;
  updateVitals: (vitals: Partial<VitalSigns>) => void;
  addNotification: (n: Partial<Notification>) => void;
  syncWorship: (sessionId: string, progress: number) => void;
  addLiability: (l: Partial<Liability>) => void;
  addAssetGoal: (g: Partial<AssetGoal>) => void;
  
  // New 18-View Actions
  proposeChallenge: (c: Partial<Challenge>) => void;
  acceptChallenge: (id: string) => void;
  completeChallenge: (id: string, winner: UserID) => void;
  submitRomanceAnswer: (promptId: string, answer: string) => void;
  addBook: (book: Partial<Book>) => void;
  updateBookProgress: (bookId: string, page: number) => void;
  toggleFocusMode: (isActive: boolean, task?: string) => void;
  logHydration: (amount: number) => void;
  addTimeCapsule: (content: string, unlockDate: number) => void;
  updateHabitProgress: (habitId: string, progress: number) => void;
  addHabit: (habit: Partial<Habit>) => void;
  addTravelPlan: (plan: Partial<TravelPlan>) => void;
  updateTravelPackingList: (planId: string, item: string, packed: boolean) => void;
  addPackingItem: (planId: string, item: string) => void;
  updateFamily: (data: Partial<FutureFamily>) => void;
  addInventoryItem: (item: Partial<KanbanItem>) => void;
  updateInventoryStock: (id: string, newStock: number) => void;
  updateKanbanStatus: (id: string, status: KanbanItem['kanbanStatus']) => void;
  syncInventoryConsumption: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  toggleRouletteTask: (taskId: string) => void;
  spinRoulette: () => void;
  
  // New Budget/Mood/Journal/LoveLanguage Actions
  addMoodLog: (mood: MoodEntry['mood'], note?: string) => void;
  addJournalEntry: (title: string, content: string, images: string[]) => void;
  updateBudget: (budget: Partial<Budget>) => void;
  submitLoveLanguageResult: (scores: Record<LoveLanguage, number>) => void;
  likeGratitudePost: (postId: string) => void;
  commentGratitudePost: (postId: string, text: string) => void;
  
  // Advanced Features
  syncTasbeeh: (sessionId: string, count: number) => void;
  syncQuran: (sessionId: string, page: number) => void;
  addAudioNote: (bookId: string, note: Partial<AudioNote>) => void;
  addMarginalia: (bookId: string, comment: Partial<MarginaliaComment>) => void;
  requestArbitration: (topic: string, argument: string) => void;
  submitArbitrationArgument: (id: string, argument: string) => void;
  resolveArbitration: (id: string, suggestion: string) => void;
  grantTimedAccess: (docId: string, userId: UserID, durationMinutes: number) => void;
  requestEmergencyAccess: (docId: string) => void;
  unlockAsset: (assetId: string) => void;
  addChildReport: (report: Partial<ChildReport>) => void;
  addChildMilestone: (milestone: Partial<ChildMilestone>) => void;
  addBarakahPoints: (points: number) => void;
  addHobbyPhoto: (projectId: string, url: string) => void;
  addHobbyProject: (project: Partial<HobbyProject>) => void;
  updateHobbyProgress: (projectId: string, step: number) => void;
  updateFitnessBattle: (userId: UserID, steps: number) => void;
  toggleEmergencyMode: () => void;
  addGeoCapsule: (capsule: Partial<GeoTimeCapsule>) => void;
  approveVisionBoard: (goalId: string) => void;
  resetDeadManSwitch: () => void;
  stakeCoins: (amount: number) => void;
  addFinancialGoal: (goal: Partial<VisionBoardGoal>) => void;
  getAITaskSuggestion: (taskId: string) => Promise<string>;
  addAthkar: (athkar: Partial<AthkarItem>) => void;
  incrementAthkarCount: (athkarId: string) => void;
  resetDailyAthkar: () => void;

  // Consensus & Permissions
  requestConsensus: (type: ConsensusRequest['type'], data: any) => void;
  resolveConsensus: (requestId: string, approved: boolean) => void;
  updatePermission: (permissionId: string, grantedTo: UserID[]) => void;
  
  // Testing Mode
  populateTestData: () => void;
  resetApp: () => void;
  
  // Layer 2 & 3
  addPrivateNote: (content: string) => void;
  addGratitude: (content: string) => void;
  sendConflictMessage: (content: string) => void;
  revealConflictMessages: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  // Quran & Mood config
  logQuranVerses: (verses: number) => void;
  updateMoodConfig: (mood: string, color: string) => void;
  updatePriorityConfig: (priority: Task['priority'], color: string) => void;
  autoAssignTask: (task: Partial<Task>) => void;
  connectFitness: () => void;
  syncFitness: () => void;
  nudgeHydration: () => void;
}

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export const PlanetProvider: React.FC<{ children: React.ReactNode; userId: UserID }> = ({ children, userId }) => {
  const [currentUser] = useState<UserID>(userId);
  const [partnerStatus, setPartnerStatus] = useState<UserStatus | null>(null);
  
  // Permissions & Consensus
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 'p1', name: 'تعديل الميزانية', description: 'السماح بتعديل ميزانية المنزل الكبرى', grantedTo: ['F', 'B'], category: 'finance' },
    { id: 'p2', name: 'إدارة المخزون', description: 'السماح بشطب سلع من المخزون', grantedTo: ['F', 'B'], category: 'logistics' },
  ]);
  const [consensusRequests, setConsensusRequests] = useState<ConsensusRequest[]>([]);

  // Layer 1: Shared Sovereignty
  const [calendar, setCalendar] = useState<CalendarEvent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inventory, setInventory] = useState<KanbanItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [liabilities, setLiabilities] = useState<Liability[]>([]);
  const [assets, setAssets] = useState<VisionBoardGoal[]>([]);

  // Layer 2: Individual Privacy
  const [privateNotes, setPrivateNotes] = useState<PrivateNote[]>([]);
  const [vitals, setVitals] = useState<Record<UserID, VitalSigns>>({
    F: { userId: 'F', weight: 82, sleepQuality: 78, steps: 5400, calories: 320, googleFitConnected: true, lastSync: Date.now() - 120000 },
    B: { userId: 'B', weight: 64, sleepQuality: 45, steps: 3200, calories: 180, googleFitConnected: true, lastSync: Date.now() - 120000 }
  });
  const [habits, setHabits] = useState<Record<UserID, Habit[]>>({
    F: [],
    B: []
  });

  // Layer 3: Bridges
  const [worship, setWorship] = useState<WorshipSession[]>([]);
  const [gratitudeFeed, setGratitudeFeed] = useState<GratitudePost[]>([]);
  const [conflictRoom, setConflictRoom] = useState<ConflictMessage[]>([]);
  const [vault, setVault] = useState<SecureDocument[]>([]);
  const [travel, setTravel] = useState<TravelPlan[]>([]);
  const [family, setFamily] = useState<FutureFamily>({ names: [], educationSavings: 0, notes: '', vision: '', childrenReports: [], milestones: [] });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [theme, setThemeState] = useState<string>(localStorage.getItem('kokab-theme') || 'midnight');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [smartHydrationEnabled, setSmartHydrationEnabled] = useState(true);
  const [weather, setWeather] = useState<PlanetWeather>({ status: 'sunny', reason: 'كل شيء على ما يرام', suggestion: 'استمتعوا بيومكم!', timestamp: Date.now() });
  const [geoCapsules, setGeoCapsules] = useState<GeoTimeCapsule[]>([]);
  const [hobbyProjects, setHobbyProjects] = useState<HobbyProject[]>([]);
  const [deadManSwitch, setDeadManSwitch] = useState<DeadManSwitch>({
    lastCheck: Date.now(),
    nextCheck: Date.now() + 30 * 24 * 60 * 60 * 1000,
    status: 'active'
  });
  const [fitnessBattle, setFitnessBattle] = useState<FitnessBattle>({
    F: { steps: 5200, calories: 120 },
    B: { steps: 4800, calories: 95 }
  });
  const [budget, setBudget] = useState<Budget>({
    monthlyLimit: 5000,
    categories: [
      { name: 'Housing', allocated: 2000, spent: 1800 },
      { name: 'Food', allocated: 1000, spent: 450 },
      { name: 'Fun', allocated: 500, spent: 200 },
      { name: 'Utilities', allocated: 500, spent: 300 },
      { name: 'Savings', allocated: 1000, spent: 0 }
    ],
    lastReset: Date.now()
  });
  const [moodLogs, setMoodLogs] = useState<MoodEntry[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [loveLanguages, setLoveLanguages] = useState<LoveLanguageResult[]>([]);

  const [athkar, setAthkar] = useState<AthkarItem[]>([
    { id: 'm1', text: 'سبحان الله وبحمده', category: 'morning', target: 100, count: { F: 0, B: 0 }, isDaily: true, notificationTime: '06:00' },
    { id: 'm2', text: 'الحمد لله', category: 'morning', target: 33, count: { F: 0, B: 0 }, isDaily: true },
    { id: 'e1', text: 'أستغفر الله وأتوب إليه', category: 'evening', target: 100, count: { F: 0, B: 0 }, isDaily: true, notificationTime: '17:00' },
  ]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem('kokab-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // New 18-View States
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [romancePrompts, setRomancePrompts] = useState<RomancePrompt[]>([
    {
      id: 'p1',
      question: 'ما هو أكثر شيء تقدره في علاقتنا اليوم؟',
      answers: { F: '', B: '' },
      revealed: false,
      timestamp: Date.now()
    }
  ]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [focusStates, setFocusStates] = useState<Record<UserID, FocusState>>({
    F: { userId: 'F', isActive: false, startTime: 0 },
    B: { userId: 'B', isActive: false, startTime: 0 }
  });
  const [hydrationLogs, setHydrationLogs] = useState<HydrationLog[]>([]);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsuleMessage[]>([]);
  const [profiles, setProfiles] = useState<Record<UserID, UserProfile>>({
    F: { userId: 'F', name: 'فهد', bio: 'مستكشف رقمي', joinedAt: Date.now(), delegatedSpendingCeiling: 1000 },
    B: { userId: 'B', name: 'بشرى', bio: 'باحثة عن الهدوء', joinedAt: Date.now(), delegatedSpendingCeiling: 500 }
  });
  const [streaks, setStreaks] = useState<Record<UserID, Streak>>({
    F: { userId: 'F', count: 0 },
    B: { userId: 'B', count: 0 }
  });
  const [rouletteTasks, setRouletteTasks] = useState<string[]>([]);
  const [barakahPoints, setBarakahPoints] = useState(150);
  const [arbitrationRequests, setArbitrationRequests] = useState<ArbitrationRequest[]>([]);
  const [coinStaking, setCoinStaking] = useState<CoinStaking>({
    rewardRate: 5.4,
    amount: 12500,
    rewards: 342
  });
  const [quranTracker, setQuranTracker] = useState<QuranTracker>({
    logs: { F: [], B: [] },
    totalVerses: 6236
  });
  const [moodConfigs, setMoodConfigs] = useState<MoodConfig[]>([
    { mood: 'happy', color: 'bg-emerald-500' },
    { mood: 'loving', color: 'bg-rose-500' },
    { mood: 'excited', color: 'bg-amber-500' },
    { mood: 'neutral', color: 'bg-blue-500' },
    { mood: 'tired', color: 'bg-purple-500' },
    { mood: 'stressed', color: 'bg-indigo-500' },
    { mood: 'sad', color: 'bg-gray-500' },
  ]);
  const [priorityConfigs, setPriorityConfigs] = useState<PriorityConfig[]>([
    { priority: 'low', color: 'bg-emerald-500' },
    { priority: 'medium', color: 'bg-blue-500' },
    { priority: 'high', color: 'bg-amber-500' },
    { priority: 'urgent', color: 'bg-rose-500' },
  ]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io();
    setSocket(s);

    s.on('tasbeeh:updated', (data: Record<UserID, number>) => {
      setWorship(prev => prev.map(session => {
        if (session.type === 'tasbeeh') {
          return { ...session, syncCounter: data };
        }
        return session;
      }));
    });

    s.on('sync:event', (data: any) => {
      if (data.type === 'haptic' && window.navigator.vibrate) {
        window.navigator.vibrate(200);
      }
      if (data.type === 'nudge' && data.target === currentUser) {
        addNotification({
          title: 'تنبيه من الشريك! 💧',
          content: data.message,
          type: 'routine'
        });
      }
    });

    return () => { s.close(); };
  }, [currentUser]);

  // Derived State
  const planetHealth = calculatePlanetHealth(
    tasks, 
    inventory, 
    transactions, 
    liabilities, 
    worship, 
    vitals,
    challenges,
    romancePrompts,
    library,
    hydrationLogs
  );

  // Actions
  const updateMood = (mood: string) => {
    addMoodLog(mood as any);
  };
  const setWorkMode = (enabled: boolean) => setPartnerStatus(prev => prev ? { ...prev, workMode: enabled } : null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const platform = event.origin;
        if (platform.endsWith('.run.app') || platform.includes('localhost')) {
          setVitals(prev => ({
            ...prev,
            [currentUser]: {
              ...prev[currentUser],
              googleFitConnected: true,
              lastSync: Date.now()
            }
          }));
          syncFitness();
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [currentUser]);

  const addTask = (task: Partial<Task>) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: task.title || '',
      assignedTo: task.assignedTo || currentUser,
      status: 'syncing', // Optimistic UI: Start with syncing
      priority: task.priority || 'medium',
      category: task.category || 'other',
      estimatedMinutes: task.estimatedMinutes || 30,
      createdAt: Date.now(),
      dueDate: task.dueDate
    };
    setTasks(prev => [...prev, newTask]);
    // Simulate Server Confirmation
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === newTask.id ? { ...t, status: 'pending' } : t));
    }, 1000);
  };

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setRouletteTasks(prev => prev.filter(id => id !== taskId));
  };

  const delegateTask = (taskId: string, to: UserID, reason: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, assignedTo: to, delegation: { from: currentUser, reason, timestamp: Date.now() } } : t));
  };

  const addTransaction = (t: Partial<Transaction>) => {
    const newT: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount: t.amount || 0,
      type: t.type || 'variable',
      category: t.category || 'Other',
      description: t.description || '',
      timestamp: Date.now(),
      status: 'pending'
    };
    setTransactions(prev => [...prev, newT]);
    setTimeout(() => {
      setTransactions(prev => prev.map(trans => trans.id === newT.id ? { ...trans, status: 'confirmed' } : trans));
    }, 1500);
  };

  const requestWithdraw = (goalId: string, amount: number) => {
    setAssets(prev => prev.map(a => a.id === goalId ? { ...a, withdrawRequests: { amount, requestedBy: currentUser, status: 'pending' } } : a));
  };

  const approveWithdraw = (goalId: string) => {
    setAssets(prev => prev.map(a => {
      if (a.id === goalId && a.withdrawRequests) {
        return { ...a, current: a.current - a.withdrawRequests.amount, withdrawRequests: { ...a.withdrawRequests, status: 'approved' } };
      }
      return a;
    }));
  };

  const updateVitals = (v: Partial<VitalSigns>) => {
    setVitals(prev => ({ ...prev, [currentUser]: { ...prev[currentUser], ...v, lastSync: Date.now() } }));
  };

  const addNotification = (n: Partial<Notification>) => {
    const newN: Notification = { id: Math.random().toString(36).substr(2, 9), type: n.type || 'routine', title: n.title || '', content: n.content || '', timestamp: Date.now(), read: false };
    setNotifications(prev => [newN, ...prev]);
  };

  const syncWorship = (sessionId: string, progress: number) => {
    setWorship(prev => prev.map(s => s.id === sessionId ? { ...s, progress } : s));
  };

  const addLiability = (l: Partial<Liability>) => {
    const newL: Liability = {
      id: Math.random().toString(36).substr(2, 9),
      name: l.name || '',
      totalAmount: l.totalAmount || 0,
      remainingAmount: l.remainingAmount || 0,
      monthlyInstallment: l.monthlyInstallment || 0,
      dueDate: l.dueDate || Date.now() + 30 * 86400000
    };
    setLiabilities(prev => [...prev, newL]);
  };

  const addAssetGoal = (g: Partial<AssetGoal>) => {
    const newG: AssetGoal = {
      id: Math.random().toString(36).substr(2, 9),
      name: g.name || '',
      target: g.target || 0,
      current: g.current || 0,
      requiresDualAuth: g.requiresDualAuth || false,
      isLocked: g.isLocked || false,
      unlockRequests: g.unlockRequests || []
    };
    setAssets(prev => [...prev as any, newG as any]);
  };

  const addFinancialGoal = (goal: Partial<VisionBoardGoal>) => {
    const newGoal: VisionBoardGoal = {
      id: Math.random().toString(36).substr(2, 9),
      name: goal.name || 'هدف جديد',
      target: goal.target || 0,
      current: 0,
      requiresDualAuth: true,
      isLocked: true,
      unlockRequests: [],
      visualDescription: goal.visualDescription || '',
      imageUrl: goal.imageUrl || 'https://picsum.photos/seed/future/800/600',
      isApprovedByF: currentUser === 'F',
      isApprovedByB: currentUser === 'B'
    };
    setAssets(prev => [...prev, newGoal]);
    addNotification({
      title: 'هدف مالي جديد 🎯',
      content: `تمت إضافة هدف "${newGoal.name}" إلى لوحة الرؤية. بانتظار موافقة الشريك.`,
      type: 'financial'
    });
  };

  const getAITaskSuggestion = async (taskId: string): Promise<string> => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return 'المهمة غير موجودة.';
    
    try {
      const prompt = `أقترح طريقة لتنفيذ هذه المهمة أو تقسيمها لمهام فرعية: ${task.title}. المهمة مصنفة كـ ${task.category} وبأولوية ${task.priority}. أجب باللغة العربية بأسلوب عملي ومشجع.`;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      return response.text || 'عذراً، لم أستطع توليد اقتراح حالياً.';
    } catch (error) {
      console.error('AI Oracle Error:', error);
      return 'حدث خطأ في استدعاء مستشار الكوكب.';
    }
  };

  const addAthkar = (a: Partial<AthkarItem>) => {
    const newItem: AthkarItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: a.text || '',
      category: a.category || 'custom',
      target: a.target || 33,
      count: { F: 0, B: 0 },
      isDaily: a.isDaily ?? true,
      notificationTime: a.notificationTime
    };
    setAthkar(prev => [...prev, newItem]);
  };

  const incrementAthkarCount = (id: string) => {
    setAthkar(prev => prev.map(item => {
      if (item.id === id) {
        const newCount = { ...item.count, [currentUser]: (item.count[currentUser] || 0) + 1 };
        
        // Haptic feedback simulation via socket if needed
        if (socket) {
          socket.emit('sync:event', { type: 'haptic', target: currentUser === 'F' ? 'B' : 'F' });
        }

        if (newCount[currentUser] === item.target) {
          addBarakahPoints(5);
          addNotification({
            title: 'إتمام الذكر ✨',
            content: `لقد أكملت "${item.text}". جزاك الله خيراً! (+5 نقاط بركة)`,
            type: 'spiritual'
          });
        }
        return { ...item, count: newCount };
      }
      return item;
    }));
  };

  const resetDailyAthkar = () => {
    setAthkar(prev => prev.map(item => item.isDaily ? { ...item, count: { F: 0, B: 0 } } : item));
  };

  // New 18-View Actions
  const proposeChallenge = (c: Partial<Challenge>) => {
    const newC: Challenge = {
      id: Math.random().toString(36).substr(2, 9),
      title: c.title || '',
      description: c.description || '',
      proposer: currentUser,
      status: 'pending',
      points: c.points || 10,
      durationMinutes: c.durationMinutes || 30
    };
    setChallenges(prev => [...prev, newC]);
  };

  const acceptChallenge = (id: string) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'active', startTime: Date.now() } : c));
  };

  const completeChallenge = (id: string, winner: UserID) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'completed', winner } : c));
    
    // Streak Logic
    setStreaks(prev => {
      const userStreak = prev[winner];
      const now = Date.now();
      const lastCompleted = userStreak.lastCompletedAt;
      
      let newCount = userStreak.count;
      
      if (!lastCompleted) {
        newCount = 1;
      } else {
        const lastDate = new Date(lastCompleted).setHours(0,0,0,0);
        const todayDate = new Date(now).setHours(0,0,0,0);
        const diffDays = (todayDate - lastDate) / (1000 * 60 * 60 * 24);
        
        if (diffDays === 1) {
          newCount += 1;
        } else if (diffDays > 1) {
          newCount = 1;
        }
        // if diffDays === 0, count remains same (already completed today)
      }
      
      return {
        ...prev,
        [winner]: { userId: winner, count: newCount, lastCompletedAt: now }
      };
    });
  };

  const submitRomanceAnswer = (promptId: string, answer: string) => {
    setRomancePrompts(prev => prev.map(p => {
      if (p.id === promptId) {
        const newAnswers = { ...p.answers, [currentUser]: answer };
        const bothAnswered = Object.values(newAnswers).every(a => a !== '');
        return { ...p, answers: newAnswers, revealed: bothAnswered };
      }
      return p;
    }));
  };

  const addBook = (book: Partial<Book>) => {
    const newBook: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title: book.title || '',
      author: book.author || '',
      progress: { F: 0, B: 0 },
      totalPages: book.totalPages || 100,
      category: book.category || 'General',
      audioNotes: [],
      marginalia: []
    };
    setLibrary(prev => [...prev, newBook]);
  };

  const updateBookProgress = (bookId: string, page: number) => {
    setLibrary(prev => prev.map(b => b.id === bookId ? { ...b, progress: { ...b.progress, [currentUser]: page } } : b));
  };

  const toggleFocusMode = (isActive: boolean, task?: string) => {
    setFocusStates(prev => ({ ...prev, [currentUser]: { userId: currentUser, isActive, startTime: isActive ? Date.now() : 0, task } }));
  };

  const logHydration = (amount: number) => {
    setHydrationLogs(prev => [...prev, { userId: currentUser, amount, timestamp: Date.now() }]);
  };

  const addTimeCapsule = (content: string, unlockDate: number) => {
    const msg: TimeCapsuleMessage = { 
      id: Math.random().toString(36).substr(2, 9), 
      authorId: currentUser, 
      content, 
      targetDate: unlockDate, 
      isUnlocked: false,
      timestamp: Date.now() 
    };
    setTimeCapsules(prev => [...prev, msg]);
  };

  const updateHabitProgress = (habitId: string, progress: number) => {
    setHabits(prev => ({
      ...prev,
      [currentUser]: prev[currentUser].map(h => h.id === habitId ? { ...h, progress, lastUpdated: Date.now() } : h)
    }));
  };

  const addHabit = (habit: Partial<Habit>) => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      title: habit.title || '',
      progress: 0,
      target: habit.target || 10,
      unit: habit.unit || '',
      color: habit.color || 'blue',
      lastUpdated: Date.now()
    };
    setHabits(prev => ({
      ...prev,
      [currentUser]: [...prev[currentUser], newHabit]
    }));
  };

  const addTravelPlan = (plan: Partial<TravelPlan>) => {
    const newPlan: TravelPlan = {
      id: Math.random().toString(36).substr(2, 9),
      destination: plan.destination || '',
      startDate: plan.startDate || Date.now(),
      endDate: plan.endDate || Date.now() + 7 * 86400000,
      budget: plan.budget || 0,
      tickets: plan.tickets || [],
      packingList: plan.packingList || []
    };
    setTravel(prev => [...prev, newPlan]);
  };

  const updateTravelPackingList = (planId: string, itemName: string, packed: boolean) => {
    setTravel(prev => prev.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          packingList: plan.packingList.map(item => 
            item.item === itemName ? { ...item, packed } : item
          )
        };
      }
      return plan;
    }));
  };

  const addPackingItem = (planId: string, item: string) => {
    setTravel(prev => prev.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          packingList: [...plan.packingList, { item, packed: false }]
        };
      }
      return plan;
    }));
  };

  const updateFamily = (data: Partial<FutureFamily>) => {
    setFamily(prev => ({ ...prev, ...data }));
  };

  const addInventoryItem = (item: Partial<KanbanItem>) => {
    const newItem: KanbanItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: item.name || '',
      category: item.category || 'General',
      currentStock: item.currentStock || 0,
      minStock: item.minStock || 0,
      unit: item.unit || 'pcs',
      consumptionFrequencyDays: item.consumptionFrequencyDays || 30,
      lastRestocked: Date.now(),
      status: 'ok',
      kanbanStatus: 'needed'
    };
    setInventory(prev => [...prev, newItem]);
  };

  const updateInventoryStock = (id: string, newStock: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const status = newStock <= item.minStock ? 'low' : 'ok';
        if (status === 'low' && item.status === 'ok') {
          addNotification({
            title: 'تنبيه مخزون منخفض',
            content: `لقد وصل منتج "${item.name}" إلى الحد الأدنى (${item.minStock}). يرجى إضافته لقائمة التسوق.`,
            type: 'routine'
          });
        }
        return { ...item, currentStock: newStock, status };
      }
      return item;
    }));
  };

  const syncInventoryConsumption = () => {
    const now = Date.now();
    setInventory(prev => prev.map(item => {
      if (item.consumptionFrequencyDays && item.consumptionFrequencyDays > 0) {
        const daysSinceLastRestock = (now - item.lastRestocked) / (1000 * 60 * 60 * 24);
        // Estimate consumption: if frequency is 10 days, and 5 days passed, maybe 50% consumed?
        // But stock is discrete. Let's say every 'consumptionFrequencyDays' we lose 1 unit? 
        // Or if frequency is "every 2 days we use 1", then 10 days = 5 units.
        // Let's assume the frequency means "we use 1 unit every X days".
        const shouldHaveConsumed = Math.floor(daysSinceLastRestock / item.consumptionFrequencyDays);
        if (shouldHaveConsumed > 0) {
          const newStock = Math.max(0, item.currentStock - shouldHaveConsumed);
          return { 
            ...item, 
            currentStock: newStock, 
            lastRestocked: now - (daysSinceLastRestock % item.consumptionFrequencyDays) * (1000 * 60 * 60 * 24),
            status: newStock <= item.minStock ? 'low' : 'ok'
          };
        }
      }
      return item;
    }));
  };

  const updateKanbanStatus = (id: string, status: KanbanItem['kanbanStatus']) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, kanbanStatus: status } : item));
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfiles(prev => ({
      ...prev,
      [currentUser]: { ...prev[currentUser], ...data }
    }));
  };

  const toggleRouletteTask = (taskId: string) => {
    setRouletteTasks(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const spinRoulette = () => {
    if (rouletteTasks.length === 0) return;
    
    // Simulate spinning
    setTimeout(() => {
      const winner: UserID = Math.random() > 0.5 ? 'F' : 'B';
      const taskId = rouletteTasks[Math.floor(Math.random() * rouletteTasks.length)];
      
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, assignedTo: winner, status: 'pending' } : t));
      setRouletteTasks(prev => prev.filter(id => id !== taskId));
      setBarakahPoints(prev => prev + 50); // Double points for the winner (simulated)
      
      addNotification({
        title: 'نتيجة عجلة الحظ',
        content: `تم تعيين المهمة إلى ${winner === 'F' ? 'فهد' : 'بشرى'} مع نقاط مضاعفة!`,
        type: 'routine'
      });
    }, 3000);
  };

  const syncTasbeeh = (sessionId: string, count: number) => {
    if (socket) {
      socket.emit('tasbeeh:sync', { [currentUser]: count });
    }
    setWorship(prev => prev.map(s => 
      s.id === sessionId ? { ...s, syncCounter: { ...s.syncCounter, [currentUser]: count } } : s
    ));
  };

  const logQuranVerses = (verses: number) => {
    const today = new Date().toISOString().split('T')[0];
    setQuranTracker(prev => {
      const logs = { ...prev.logs };
      const userLogs = [...logs[currentUser]];
      const todayIndex = userLogs.findIndex(l => l.date === today);
      
      if (todayIndex >= 0) {
        userLogs[todayIndex] = { ...userLogs[todayIndex], verses: userLogs[todayIndex].verses + verses };
      } else {
        userLogs.push({ date: today, verses });
      }
      
      logs[currentUser] = userLogs;
      return { ...prev, logs };
    });
    addNotification({
      title: 'تم تسجيل ورد القرآن 📖',
      content: `لقد سجلت قراءة ${verses} آيات اليوم. تبارك الله!`,
      type: 'spiritual'
    });
  };

  const updateMoodConfig = (mood: string, color: string) => {
    setMoodConfigs(prev => prev.map(c => c.mood === mood ? { ...c, color } : c));
  };

  const updatePriorityConfig = (priority: Task['priority'], color: string) => {
    setPriorityConfigs(prev => prev.map(c => c.priority === priority ? { ...c, color } : c));
  };

  const autoAssignTask = (task: Partial<Task>) => {
    const fPending = tasks.filter(t => t.assignedTo === 'F' && t.status !== 'completed').length;
    const bPending = tasks.filter(t => t.assignedTo === 'B' && t.status !== 'completed').length;
    const assignedTo: UserID = fPending <= bPending ? 'F' : 'B';
    addTask({ ...task, assignedTo });
  };

  const connectFitness = async () => {
    try {
      const response = await fetch('/api/auth/google/url');
      const { url } = await response.json();
      const popup = window.open(url, 'google_fit_sync', 'width=600,height=700');
      if (!popup) alert('Please allow popups for Google Fit sync.');
    } catch (error) {
      console.error('Failed to connect fitness:', error);
    }
  };

  const syncFitness = async () => {
    try {
      const response = await fetch('/api/fitness/sync');
      if (response.ok) {
        const data = await response.json();
        setVitals(prev => ({
          ...prev,
          [currentUser]: {
            ...prev[currentUser],
            steps: data.steps,
            calories: data.calories,
            lastSync: Date.now()
          }
        }));
      }
    } catch (error) {
      console.error('Failed to sync fitness:', error);
    }
  };

  const nudgeHydration = () => {
    if (socket) {
      socket.emit('sync:action', { 
        type: 'nudge', 
        target: currentUser === 'F' ? 'B' : 'F', 
        message: 'شريكك يذكرك بشرب الماء الآن! 💧'
      });
      addNotification({
        title: 'تم إرسال التذكير',
        content: 'لقد قمنا بتنبيه شريكك للاهتمام بصحته وشرب الماء.',
        type: 'routine'
      });
    }
  };

  const syncQuran = (sessionId: string, page: number) => {
    setWorship(prev => prev.map(s => 
      s.id === sessionId ? { ...s, quranSync: { ...s.quranSync, [currentUser]: page } } : s
    ));
  };

  const addAudioNote = (bookId: string, note: Partial<AudioNote>) => {
    const fullNote: AudioNote = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser,
      timestamp: Date.now(),
      duration: note.duration || 0,
      url: note.url || '',
      pageNumber: note.pageNumber || 0
    };
    setLibrary(prev => prev.map(b => 
      b.id === bookId ? { ...b, audioNotes: [...(b.audioNotes || []), fullNote] } : b
    ));
  };

  const addMarginalia = (bookId: string, comment: Partial<MarginaliaComment>) => {
    const fullComment: MarginaliaComment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser,
      text: comment.text || '',
      timestamp: Date.now(),
      position: comment.position || { x: 0, y: 0 }
    };
    setLibrary(prev => prev.map(b => 
      b.id === bookId ? { ...b, marginalia: [...(b.marginalia || []), fullComment] } : b
    ));
  };

  const requestArbitration = (topic: string, argument: string) => {
    const req: ArbitrationRequest = {
      id: Math.random().toString(36).substr(2, 9),
      topic,
      proposerId: currentUser,
      proposerArgument: argument,
      status: 'pending_partner',
      timestamp: Date.now()
    };
    setArbitrationRequests(prev => [req, ...prev]);
  };

  const submitArbitrationArgument = (id: string, argument: string) => {
    setArbitrationRequests(prev => prev.map(r => 
      r.id === id ? { ...r, partnerArgument: argument, status: 'processing_ai' } : r
    ));
  };

  const resolveArbitration = (id: string, suggestion: string) => {
    setArbitrationRequests(prev => prev.map(r => 
      r.id === id ? { ...r, aiSuggestion: suggestion, status: 'resolved' } : r
    ));
  };

  const grantTimedAccess = (docId: string, userId: UserID, durationMinutes: number) => {
    setVault(prev => prev.map(d => 
      d.id === docId ? { ...d, timedAccess: { grantedTo: [userId], expiresAt: Date.now() + durationMinutes * 60000 } } : d
    ));
  };

  const requestEmergencyAccess = (docId: string) => {
    setVault(prev => prev.map(d => 
      d.id === docId ? { ...d, emergencyAccess: { requestedAt: Date.now(), status: 'pending' } } : d
    ));
    // Auto-grant after 1 hour if not denied (simulated)
    setTimeout(() => {
      setVault(prev => prev.map(d => 
        (d.id === docId && d.emergencyAccess?.status === 'pending') ? { ...d, emergencyAccess: { ...d.emergencyAccess, status: 'granted' } } : d
      ));
    }, 3600000);
  };

  const unlockAsset = (assetId: string) => {
    setAssets(prev => prev.map(a => {
      if (a.id === assetId) {
        const newRequests = Array.from(new Set([...a.unlockRequests, currentUser]));
        return { ...a, unlockRequests: newRequests, isLocked: newRequests.length < 2 };
      }
      return a;
    }));
  };

  const addChildReport = (report: Partial<ChildReport>) => {
    const fullReport: ChildReport = {
      id: Math.random().toString(36).substr(2, 9),
      childName: report.childName || '',
      subject: report.subject || '',
      status: report.status || 'good',
      notes: report.notes || '',
      lastUpdated: Date.now()
    };
    setFamily(prev => ({ ...prev, childrenReports: [...(prev.childrenReports || []), fullReport] }));
  };

  const addChildMilestone = (milestone: Partial<ChildMilestone>) => {
    const fullMilestone: ChildMilestone = {
      id: Math.random().toString(36).substr(2, 9),
      childId: milestone.childId || 'E',
      title: milestone.title || '',
      content: milestone.content || '',
      imageUrl: milestone.imageUrl,
      timestamp: Date.now(),
      reactions: []
    };
    setFamily(prev => ({ ...prev, milestones: [...(prev.milestones || []), fullMilestone] }));
  };

  const addBarakahPoints = (points: number) => {
    setBarakahPoints(prev => prev + points);
  };

  const addHobbyPhoto = (projectId: string, url: string) => {
    setHobbyProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, dailyPhotos: [...p.dailyPhotos, { url, timestamp: Date.now() }] } : p
    ));
  };

  const addHobbyProject = (project: Partial<HobbyProject>) => {
    const newProject: HobbyProject = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser,
      title: project.title || '',
      description: project.description || '',
      currentStep: 0,
      totalSteps: project.totalSteps || 10,
      dailyPhotos: [],
      reactions: []
    };
    setHobbyProjects(prev => [...prev, newProject]);
  };

  const updateHobbyProgress = (projectId: string, step: number) => {
    setHobbyProjects(prev => prev.map(p => p.id === projectId ? { ...p, currentStep: step } : p));
  };

  const updateFitnessBattle = (userId: UserID, steps: number) => {
    setFitnessBattle(prev => ({
      ...prev,
      [userId]: { ...prev[userId], steps }
    }));
  };

  const toggleEmergencyMode = () => {
    setEmergencyMode(prev => !prev);
  };

  const addGeoCapsule = (capsule: Partial<GeoTimeCapsule>) => {
    const newCapsule: GeoTimeCapsule = {
      id: Math.random().toString(36).substr(2, 9),
      authorId: currentUser,
      content: capsule.content || '',
      type: capsule.type || 'text',
      location: capsule.location || { lat: 0, lng: 0, name: '' },
      isUnlocked: false,
      timestamp: Date.now()
    };
    setGeoCapsules(prev => [...prev, newCapsule]);
  };

  const approveVisionBoard = (goalId: string) => {
    setAssets(prev => prev.map(a => {
      if (a.id === goalId) {
        return {
          ...a,
          isApprovedByF: currentUser === 'F' ? true : a.isApprovedByF,
          isApprovedByB: currentUser === 'B' ? true : a.isApprovedByB
        };
      }
      return a;
    }));
  };

  const resetDeadManSwitch = () => {
    setDeadManSwitch({
      lastCheck: Date.now(),
      nextCheck: Date.now() + 30 * 24 * 60 * 60 * 1000,
      status: 'active'
    });
    addNotification({
      title: 'مفتاح الأمان',
      content: 'تم تأكيد وجودك بنجاح. تم تمديد المهلة لمدة 30 يوماً إضافية.',
      type: 'routine'
    });
  };

  const stakeCoins = (amount: number) => {
    setCoinStaking(prev => ({ ...prev, amount: prev.amount + amount }));
    setBarakahPoints(prev => Math.max(0, prev - amount));
  };

  const requestConsensus = (type: ConsensusRequest['type'], data: any) => {
    const req: ConsensusRequest = { id: Math.random().toString(36).substr(2, 9), type, requestedBy: currentUser, data, status: 'pending', timestamp: Date.now() };
    setConsensusRequests(prev => [...prev, req]);
  };

  const resolveConsensus = (requestId: string, approved: boolean) => {
    setConsensusRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: approved ? 'approved' : 'rejected' } : r));
  };

  const updatePermission = (permissionId: string, grantedTo: UserID[]) => {
    setPermissions(prev => prev.map(p => p.id === permissionId ? { ...p, grantedTo } : p));
  };

  const populateTestData = () => {
    // Populate Tasks
    const now = Date.now();
    setTasks([
      { id: 't1', title: 'شراء مستلزمات العشاء', assignedTo: 'F', status: 'pending', priority: 'medium', category: 'home', estimatedMinutes: 45, createdAt: now - 3600000, dueDate: now + 7200000 },
      { id: 't2', title: 'تنظيف الحديقة', assignedTo: 'B', status: 'pending', priority: 'low', category: 'home', estimatedMinutes: 60, createdAt: now - 7200000, dueDate: now - 3600000 }, // Overdue
      { id: 't3', title: 'دفع فاتورة الكهرباء', assignedTo: 'F', status: 'completed', priority: 'urgent', category: 'work', estimatedMinutes: 10, createdAt: now - 86400000 },
      { id: 't4', title: 'إصلاح صنبور المياه', assignedTo: 'F', status: 'pending', priority: 'high', category: 'home', estimatedMinutes: 30, createdAt: now - 1800000 },
    ]);

    setRouletteTasks(['t4']); // Put one task in roulette by default

    // Populate Transactions
    setTransactions([
      { id: 'tr1', amount: 250, type: 'variable', category: 'طعام', description: 'سوبر ماركت', timestamp: Date.now() - 86400000, status: 'confirmed' },
      { id: 'tr2', amount: 1200, type: 'fixed', category: 'إيجار', description: 'قسط الشقة', timestamp: Date.now() - 172800000, status: 'confirmed' },
    ]);

    // Populate Inventory
    setInventory([
      { id: 'i1', name: 'حليب', category: 'طعام', currentStock: 2, minStock: 1, consumptionFrequencyDays: 7, lastRestocked: Date.now(), status: 'ok' },
      { id: 'i2', name: 'خبز', category: 'طعام', currentStock: 0, minStock: 2, consumptionFrequencyDays: 2, lastRestocked: Date.now(), status: 'low' },
    ]);

    // Populate Challenges
    setChallenges([
      { id: 'c1', title: 'تحدي القراءة', description: 'قراءة 20 صفحة من كتاب جديد', proposer: 'B', status: 'pending', points: 15, durationMinutes: 30 },
      { id: 'c2', title: 'تحدي المشي', description: 'المشي لمسافة 5 كم', proposer: 'F', status: 'active', points: 20, durationMinutes: 60, startTime: Date.now() - 1800000 },
    ]);

    // Populate Worship
    setWorship([
      { id: 'w1', type: 'tasbeeh', title: 'تسبيح مشترك', progress: 45, target: 100, syncCounter: { F: 25, B: 20 } }
    ]);

    setQuranTracker({
      logs: { 
        F: [{ date: new Date().toISOString().split('T')[0], verses: 35 }], 
        B: [{ date: new Date().toISOString().split('T')[0], verses: 20 }] 
      },
      totalVerses: 6236
    });

    // Populate Arbitration
    setArbitrationRequests([
      { 
        id: 'a1', 
        topic: 'لون طلاء الغرفة', 
        proposerId: 'F', 
        proposerArgument: 'أفضل اللون الأزرق لأنه مريح للعين.', 
        partnerArgument: 'أفضل اللون الرمادي لأنه عصري أكثر.', 
        status: 'processing_ai', 
        timestamp: Date.now() 
      }
    ]);

    // Populate Streaks
    setStreaks({
      F: { userId: 'F', count: 5, lastCompletedAt: Date.now() - 86400000 },
      B: { userId: 'B', count: 3, lastCompletedAt: Date.now() - 86400000 }
    });

    addNotification({ title: 'تم تفعيل وضع التجربة', content: 'تم ملء التطبيق ببيانات تجريبية لمعاينة كافة الميزات.' });
  };

  const resetApp = () => {
    setTasks([]);
    setTransactions([]);
    setInventory([]);
    setChallenges([]);
    setWorship([]);
    setArbitrationRequests([]);
    setRouletteTasks([]);
    setStreaks({
      F: { userId: 'F', count: 0, lastCompletedAt: 0 },
      B: { userId: 'B', count: 0, lastCompletedAt: 0 }
    });
    setNotifications([{ id: 'n1', title: 'تم تصفير النظام', content: 'تم مسح كافة البيانات بنجاح.', timestamp: Date.now() }]);
  };

  const addPrivateNote = (content: string) => {
    const note: PrivateNote = { id: Math.random().toString(36).substr(2, 9), content, timestamp: Date.now() };
    setPrivateNotes(prev => [...prev, note]);
  };

  const addGratitude = (content: string) => {
    const post: GratitudePost = { 
      id: Math.random().toString(36).substr(2, 9), 
      authorId: currentUser, 
      content, 
      timestamp: Date.now(), 
      reactions: [],
      likes: [],
      comments: []
    };
    setGratitudeFeed(prev => [post, ...prev]);
    setBarakahPoints(prev => prev + 25);
    addNotification({
      title: 'نقاط بركة جديدة! ✨',
      content: `لقد حصلت على 25 نقطة بركة لمشاركتك الامتنان. رصيدك الحالي: ${barakahPoints + 25}`,
      type: 'spiritual'
    });
  };

  const likeGratitudePost = (postId: string) => {
    setGratitudeFeed(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(currentUser);
        return {
          ...post,
          likes: isLiked ? post.likes.filter(id => id !== currentUser) : [...post.likes, currentUser]
        };
      }
      return post;
    }));
  };

  const commentGratitudePost = (postId: string, text: string) => {
    setGratitudeFeed(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: Math.random().toString(36).substr(2, 9), userId: currentUser, text, timestamp: Date.now() }]
        };
      }
      return post;
    }));
  };

  const addMoodLog = (mood: MoodEntry['mood'], note?: string) => {
    const entry: MoodEntry = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser,
      mood,
      note,
      timestamp: Date.now()
    };
    setMoodLogs(prev => [entry, ...prev]);
  };

  const addJournalEntry = (title: string, content: string, images: string[]) => {
    const entry: JournalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      images,
      authorId: currentUser,
      timestamp: Date.now()
    };
    setJournal(prev => [entry, ...prev]);
  };

  const updateBudget = (b: Partial<Budget>) => {
    setBudget(prev => ({ ...prev, ...b }));
  };

  const submitLoveLanguageResult = (scores: Record<LoveLanguage, number>) => {
    const entries = Object.entries(scores) as [LoveLanguage, number][];
    const primary = entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const result: LoveLanguageResult = {
      userId: currentUser,
      scores,
      primary
    };
    setLoveLanguages(prev => [...prev.filter(r => r.userId !== currentUser), result]);
  };

  const sendConflictMessage = (content: string) => {
    const msg: ConflictMessage = { id: Math.random().toString(36).substr(2, 9), authorId: currentUser, content, timestamp: Date.now(), revealed: false };
    setConflictRoom(prev => [...prev, msg]);
  };

  const revealConflictMessages = () => {
    setConflictRoom(prev => prev.map(m => ({ ...m, revealed: true })));
  };

  // Overdue Task Check
  useEffect(() => {
    const checkOverdue = () => {
      const now = Date.now();
      tasks.forEach(task => {
        if (task.status === 'pending' && task.dueDate && task.dueDate < now) {
          const alreadyNotified = notifications.some(n => n.content.includes(task.id));
          if (!alreadyNotified) {
            addNotification({
              title: 'مهمة متأخرة!',
              content: `المهمة "${task.title}" تجاوزت موعدها المحدد. (ID: ${task.id})`,
              type: 'urgent'
            });
          }
        }
      });
    };

    const interval = setInterval(checkOverdue, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks, notifications]);

  // Planet Weather Logic
  useEffect(() => {
    const calculateWeather = () => {
      const pendingTasks = tasks.filter(t => t.status === 'pending').length;
      const overdueTasks = tasks.filter(t => t.status === 'pending' && t.dueDate && t.dueDate < Date.now()).length;
      const lowStock = inventory.filter(i => i.status === 'low').length;
      
      let status: PlanetWeatherStatus = 'sunny';
      let reason = 'الأجواء صافية والمهام تحت السيطرة.';
      let suggestion = 'وقت رائع للاسترخاء أو ممارسة هواية مشتركة.';

      if (overdueTasks > 0 || pendingTasks > 10) {
        status = 'stormy';
        reason = 'هناك تراكم في المهام وبعضها متأخر.';
        suggestion = 'يُفضل التركيز على إنجاز المهام العاجلة أولاً.';
      } else if (pendingTasks > 5 || lowStock > 2) {
        status = 'cloudy';
        reason = 'الغيوم بدأت تتجمع، هناك بعض النواقص والمهام المعلقة.';
        suggestion = 'توزيع المهام قد يساعد في تصفية الأجواء.';
      }

      setWeather({ status, reason, suggestion, timestamp: Date.now() });
    };

    calculateWeather();
  }, [tasks, inventory]);

  // Smart Hydration Check
  useEffect(() => {
    if (!smartHydrationEnabled) return;

    const checkHydration = () => {
      const today = new Date().toDateString();
      const todayLogs = hydrationLogs.filter(l => new Date(l.timestamp).toDateString() === today);
      
      ['F', 'B'].forEach((u) => {
        const total = todayLogs.filter(l => l.userId === u).reduce((acc, l) => acc + l.amount, 0);
        const hoursElapsed = new Date().getHours();
        
        // If it's afternoon and they haven't drunk much
        if (hoursElapsed > 14 && total < 1000) {
          const lastNotified = notifications.find(n => n.content.includes('قطرة ماء') && n.timestamp > Date.now() - 4 * 3600 * 1000);
          if (!lastNotified) {
            addNotification({
              title: 'تذكير ذكي: وقت الارتواء 💧',
              content: 'لقد لاحظ الكوكب انخفاض معدل شربك للماء اليوم. قطرة ماء قد تصنع فرقاً في طاقتك!',
              type: 'routine'
            });
          }
        }
      });
    };

    const interval = setInterval(checkHydration, 3600000); // Check every hour
    checkHydration(); // Initial check
    return () => clearInterval(interval);
  }, [hydrationLogs, smartHydrationEnabled, notifications]);

  return (
    <PlanetContext.Provider value={{
      currentUser, partnerStatus, planetHealth, weather, emergencyMode, barakahPoints, permissions, consensusRequests, arbitrationRequests, deadManSwitch, fitnessBattle,
      calendar, tasks, inventory, transactions, liabilities, assets,
      privateNotes, vitals, habits,
      worship, gratitudeFeed, conflictRoom, vault, travel, family, notifications,
      challenges, romancePrompts, library, focusStates, hydrationLogs, timeCapsules, geoCapsules, profiles, streaks,
      budget, moodLogs, journal, loveLanguages, quranTracker, moodConfigs, priorityConfigs, athkar,
      rouletteTasks, hobbyProjects, coinStaking,
      updateMood, setWorkMode, addTask, completeTask, deleteTask, delegateTask, addTransaction,
      requestWithdraw, approveWithdraw, updateVitals, addNotification, syncWorship,
      addLiability, addAssetGoal,
      proposeChallenge, acceptChallenge, completeChallenge, submitRomanceAnswer, addBook, updateBookProgress, toggleFocusMode, logHydration, addTimeCapsule,
      updateHabitProgress, addHabit, addTravelPlan, updateTravelPackingList, addPackingItem, updateFamily, addInventoryItem, updateInventoryStock, updateKanbanStatus, syncInventoryConsumption, updateProfile,
      toggleRouletteTask, spinRoulette,
      syncTasbeeh, syncQuran, addAudioNote, addMarginalia, requestArbitration, submitArbitrationArgument, resolveArbitration, grantTimedAccess, requestEmergencyAccess, unlockAsset, addChildReport, addChildMilestone, addBarakahPoints,
      addHobbyPhoto, addHobbyProject, updateHobbyProgress, updateFitnessBattle, toggleEmergencyMode, addGeoCapsule, approveVisionBoard,
      resetDeadManSwitch,
      stakeCoins, logQuranVerses, updateMoodConfig, updatePriorityConfig, autoAssignTask, connectFitness, syncFitness, nudgeHydration,
      addFinancialGoal, getAITaskSuggestion, addAthkar, incrementAthkarCount, resetDailyAthkar,
      toggleSmartHydration: () => setSmartHydrationEnabled(prev => !prev),
      shareGratitude: (postId: string) => {
        const post = gratitudeFeed.find(p => p.id === postId);
        if (!post) return;
        addNotification({
          title: 'لمسة حب ❤️',
          content: `شريكك شارك معك هذه الخاطرة: "${post.content}"`,
          type: 'spiritual'
        });
        addBarakahPoints(10);
      },
      requestConsensus, resolveConsensus, updatePermission, populateTestData, resetApp,
      addPrivateNote, addGratitude, likeGratitudePost, commentGratitudePost,
      addMoodLog, addJournalEntry, updateBudget, submitLoveLanguageResult,
      sendConflictMessage, revealConflictMessages,
      theme, setTheme
    }}>
      {children}
    </PlanetContext.Provider>
  );
};

export const usePlanet = () => {
  const context = useContext(PlanetContext);
  if (!context) throw new Error('usePlanet must be used within a PlanetProvider');
  return context;
};

// Legacy support for useKokab
export const useKokab = usePlanet;

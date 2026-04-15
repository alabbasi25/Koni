import React, { createContext, useContext, useState, useEffect } from 'react';
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
  Streak
} from '../types';
import { calculatePlanetHealth } from '../planetLogic';

interface PlanetContextType extends KokabState {
  // Actions
  updateMood: (mood: string) => void;
  setWorkMode: (enabled: boolean) => void;
  addTask: (task: Partial<Task>) => void;
  completeTask: (taskId: string) => void;
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
  updateFamily: (data: Partial<FutureFamily>) => void;
  addInventoryItem: (item: Partial<InventoryItem>) => void;
  updateInventoryStock: (id: string, newStock: number) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  
  // Consensus & Permissions
  requestConsensus: (type: ConsensusRequest['type'], data: any) => void;
  resolveConsensus: (requestId: string, approved: boolean) => void;
  updatePermission: (permissionId: string, grantedTo: UserID[]) => void;
  
  // Layer 2 & 3
  addPrivateNote: (content: string) => void;
  addGratitude: (content: string) => void;
  sendConflictMessage: (content: string) => void;
  revealConflictMessages: () => void;
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
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [liabilities, setLiabilities] = useState<Liability[]>([]);
  const [assets, setAssets] = useState<AssetGoal[]>([]);

  // Layer 2: Individual Privacy
  const [privateNotes, setPrivateNotes] = useState<PrivateNote[]>([]);
  const [vitals, setVitals] = useState<Record<UserID, VitalSigns>>({
    F: { userId: 'F', weight: 0, sleepQuality: 0, steps: 0, lastSync: Date.now() },
    B: { userId: 'B', weight: 0, sleepQuality: 0, steps: 0, lastSync: Date.now() }
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
  const [family, setFamily] = useState<FutureFamily>({ names: [], educationSavings: 0, notes: '' });
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // New 18-View States
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [romancePrompts, setRomancePrompts] = useState<RomancePrompt[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [focusStates, setFocusStates] = useState<Record<UserID, FocusState>>({
    F: { userId: 'F', isActive: false, startTime: 0 },
    B: { userId: 'B', isActive: false, startTime: 0 }
  });
  const [hydrationLogs, setHydrationLogs] = useState<HydrationLog[]>([]);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsuleMessage[]>([]);
  const [profiles, setProfiles] = useState<Record<UserID, UserProfile>>({
    F: { userId: 'F', name: 'فهد', bio: 'مستكشف رقمي', joinedAt: Date.now() },
    B: { userId: 'B', name: 'بشرى', bio: 'باحثة عن الهدوء', joinedAt: Date.now() }
  });
  const [streaks, setStreaks] = useState<Record<UserID, Streak>>({
    F: { userId: 'F', count: 0 },
    B: { userId: 'B', count: 0 }
  });

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
  const updateMood = (mood: string) => console.log(`Mood: ${mood}`);
  const setWorkMode = (enabled: boolean) => setPartnerStatus(prev => prev ? { ...prev, workMode: enabled } : null);

  const addTask = (task: Partial<Task>) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: task.title || '',
      assignedTo: task.assignedTo || currentUser,
      status: 'syncing', // Optimistic UI: Start with syncing
      priority: task.priority || 'medium',
      estimatedMinutes: task.estimatedMinutes || 30,
      createdAt: Date.now()
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
      requiresDualAuth: g.requiresDualAuth || false
    };
    setAssets(prev => [...prev, newG]);
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
      category: book.category || 'General'
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
    const msg: TimeCapsuleMessage = { id: Math.random().toString(36).substr(2, 9), authorId: currentUser, content, unlockDate, timestamp: Date.now() };
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

  const updateFamily = (data: Partial<FutureFamily>) => {
    setFamily(prev => ({ ...prev, ...data }));
  };

  const addInventoryItem = (item: Partial<InventoryItem>) => {
    const newItem: InventoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: item.name || '',
      category: item.category || 'General',
      currentStock: item.currentStock || 0,
      minStock: item.minStock || 0,
      consumptionFrequencyDays: item.consumptionFrequencyDays || 30,
      lastRestocked: Date.now(),
      status: 'ok'
    };
    setInventory(prev => [...prev, newItem]);
  };

  const updateInventoryStock = (id: string, newStock: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, currentStock: newStock, status: newStock <= item.minStock ? 'low' : 'ok' } : item
    ));
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfiles(prev => ({
      ...prev,
      [currentUser]: { ...prev[currentUser], ...data }
    }));
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

  const addPrivateNote = (content: string) => {
    const note: PrivateNote = { id: Math.random().toString(36).substr(2, 9), content, timestamp: Date.now() };
    setPrivateNotes(prev => [...prev, note]);
  };

  const addGratitude = (content: string) => {
    const post: GratitudePost = { id: Math.random().toString(36).substr(2, 9), authorId: currentUser, content, timestamp: Date.now(), reactions: [] };
    setGratitudeFeed(prev => [post, ...prev]);
  };

  const sendConflictMessage = (content: string) => {
    const msg: ConflictMessage = { id: Math.random().toString(36).substr(2, 9), authorId: currentUser, content, timestamp: Date.now(), revealed: false };
    setConflictRoom(prev => [...prev, msg]);
  };

  const revealConflictMessages = () => {
    setConflictRoom(prev => prev.map(m => ({ ...m, revealed: true })));
  };

  return (
    <PlanetContext.Provider value={{
      currentUser, partnerStatus, planetHealth, permissions, consensusRequests,
      calendar, tasks, inventory, transactions, liabilities, assets,
      privateNotes, vitals, habits,
      worship, gratitudeFeed, conflictRoom, vault, travel, family, notifications,
      challenges, romancePrompts, library, focusStates, hydrationLogs, timeCapsules, profiles, streaks,
      updateMood, setWorkMode, addTask, completeTask, delegateTask, addTransaction,
      requestWithdraw, approveWithdraw, updateVitals, addNotification, syncWorship,
      addLiability, addAssetGoal,
      proposeChallenge, acceptChallenge, completeChallenge, submitRomanceAnswer, addBook, updateBookProgress, toggleFocusMode, logHydration, addTimeCapsule,
      updateHabitProgress, addHabit, addTravelPlan, updateFamily, addInventoryItem, updateInventoryStock, updateProfile,
      requestConsensus, resolveConsensus, updatePermission,
      addPrivateNote, addGratitude, sendConflictMessage, revealConflictMessages
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

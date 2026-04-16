export type UserID = 'F' | 'B'; // F: Fahad, B: Bushra

export interface UserStatus {
  userId: UserID;
  status: 'online' | 'offline' | 'busy';
  mood?: string;
  workMode: boolean;
  lastActive: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  grantedTo: UserID[];
  category: 'finance' | 'logistics' | 'privacy' | 'future';
}

export interface ConsensusRequest {
  id: string;
  type: 'transaction' | 'event' | 'goal';
  requestedBy: UserID;
  data: any;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}

export interface Task {
  id: string;
  title: string;
  assignedTo: UserID;
  status: 'pending' | 'completed' | 'syncing';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedMinutes: number;
  createdAt: number;
  delegation?: {
    from: UserID;
    reason: string;
    timestamp: number;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  consumptionFrequencyDays: number;
  lastRestocked: number;
  status: 'ok' | 'low' | 'syncing';
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'fixed' | 'variable';
  category: string;
  description: string;
  timestamp: number;
  status: 'confirmed' | 'pending';
  requiresConsensus?: boolean;
}

export interface AssetGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  requiresDualAuth: boolean;
  isLocked: boolean;
  unlockRequests: UserID[]; // Both must be present to unlock
  withdrawRequests?: {
    amount: number;
    requestedBy: UserID;
    status: 'pending' | 'approved' | 'rejected';
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  category: string;
  participants: UserID[];
  location?: string;
  status: 'confirmed' | 'pending';
}

export interface WorshipSession {
  id: string;
  type: 'tasbeeh' | 'quran' | 'dua';
  participants: UserID[];
  progress: number;
  target: number;
  isLive: boolean;
  syncCounter?: Record<UserID, number>; // Real-time tasbeeh sync
}

export interface VitalSigns {
  userId: UserID;
  weight: number;
  sleepQuality: number;
  steps: number;
  lastSync: number;
}

export interface Notification {
  id: string;
  type: 'urgent' | 'routine' | 'financial' | 'spiritual';
  title: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export interface TravelPlan {
  id: string;
  destination: string;
  startDate: number;
  endDate: number;
  budget: number;
  tickets: string[];
  packingList: { item: string; packed: boolean }[];
}

export interface FutureFamily {
  names: string[];
  educationSavings: number;
  notes: string;
  vision: string;
  childrenReports: ChildReport[];
}

export interface ChildReport {
  id: string;
  childName: string;
  subject: string;
  status: 'excellent' | 'good' | 'needs_improvement';
  notes: string;
  lastUpdated: number;
}

export interface PrivateNote {
  id: string;
  content: string;
  timestamp: number;
}

export interface GratitudePost {
  id: string;
  authorId: UserID;
  content: string;
  timestamp: number;
  reactions: string[];
}

export interface ConflictMessage {
  id: string;
  authorId: UserID;
  content: string;
  timestamp: number;
  revealed: boolean;
}

export interface Habit {
  id: string;
  title: string;
  progress: number;
  target: number;
  unit: string;
  color: 'blue' | 'emerald' | 'purple';
  lastUpdated: number;
}

export interface UserProfile {
  userId: UserID;
  name: string;
  avatar?: string;
  bio?: string;
  joinedAt: number;
  delegatedSpendingCeiling: number; // Max amount without partner approval
}

export interface Streak {
  userId: UserID;
  count: number;
  lastCompletedAt?: number;
}

export interface KokabState {
  currentUser: UserID;
  partnerStatus: UserStatus | null;
  planetHealth: PlanetHealth;
  barakahPoints: number;
  permissions: Permission[];
  consensusRequests: ConsensusRequest[];
  arbitrationRequests: ArbitrationRequest[];
  
  // Layer 1
  calendar: CalendarEvent[];
  tasks: Task[];
  inventory: InventoryItem[];
  transactions: Transaction[];
  liabilities: Liability[];
  assets: AssetGoal[];
  
  // Layer 2
  privateNotes: PrivateNote[];
  vitals: Record<UserID, VitalSigns>;
  habits: Record<UserID, Habit[]>;
  
  // Layer 3
  worship: WorshipSession[];
  gratitudeFeed: GratitudePost[];
  conflictRoom: ConflictMessage[];
  vault: SecureDocument[];
  travel: TravelPlan[];
  family: FutureFamily;
  notifications: Notification[];
  challenges: Challenge[];
  romancePrompts: RomancePrompt[];
  library: Book[];
  focusStates: Record<UserID, FocusState>;
  hydrationLogs: HydrationLog[];
  timeCapsules: TimeCapsuleMessage[];
  profiles: Record<UserID, UserProfile>;
  streaks: Record<UserID, Streak>;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  proposer: UserID;
  status: 'pending' | 'active' | 'completed' | 'rejected';
  points: number;
  durationMinutes: number;
  startTime?: number;
  winner?: UserID;
}

export interface RomancePrompt {
  id: string;
  question: string;
  answers: Record<UserID, string>;
  revealed: boolean;
  timestamp: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  progress: Record<UserID, number>; // Page number
  totalPages: number;
  category: string;
  audioNotes: AudioNote[];
}

export interface AudioNote {
  id: string;
  userId: UserID;
  timestamp: number;
  duration: number;
  url: string; // Mock URL
  pageNumber: number;
}

export interface FocusState {
  userId: UserID;
  isActive: boolean;
  startTime: number;
  task?: string;
}

export interface HydrationLog {
  userId: UserID;
  amount: number; // ml
  timestamp: number;
}

export interface TimeCapsuleMessage {
  id: string;
  authorId: UserID;
  content: string;
  unlockDate: number;
  timestamp: number;
}

export interface Liability {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  monthlyInstallment: number;
  dueDate: number;
}

export interface SecureDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  addedAt: number;
  expiryDate?: number;
  isTimeCapsule?: boolean;
  unlockDate?: number;
  timedAccess?: {
    grantedTo: UserID[];
    expiresAt: number;
  };
}

export interface PlanetHealth {
  score: number;
  breakdown: {
    logistics: number;
    finance: number;
    spiritual: number;
    health: number;
  };
}

export interface ArbitrationRequest {
  id: string;
  topic: string;
  proposerId: UserID;
  proposerArgument: string;
  partnerArgument?: string;
  status: 'pending_partner' | 'processing_ai' | 'resolved';
  aiSuggestion?: string;
  timestamp: number;
}

export type Theme = 'midnight' | 'emerald' | 'gold' | 'rose' | 'system';

export type PrivacyState = 'private' | 'shared' | 'public';

export interface KokabItem {
  id: string;
  title: string;
  content: string;
  category: 'romance' | 'planning' | 'spiritual' | 'daily';
  privacy: PrivacyState;
  isFavorite: boolean;
}

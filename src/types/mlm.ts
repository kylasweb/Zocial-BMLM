// Base Types
export interface User {
  id: string;
  rank: Rank;
  sponsor: string;
  placement: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  metrics: UserMetrics;
}

export interface UserMetrics {
  personalVolume: number;
  groupVolume: number;
  directReferrals: number;
  totalTeamSize: number;
  activeDownlines: number;
  totalEarnings: number;
}

export interface Rank {
  id: string;
  name: string;
  level: number;
  requirements: RankRequirements;
  benefits: RankBenefits;
  achievements: Achievement[];
}

export interface RankRequirements {
  personalVolume: number;
  groupVolume: number;
  directReferrals: number;
  activeDownlines: number;
  minimumLegCount: number;
  qualifiedLegs: number;
}

export interface RankBenefits {
  commissionRate: number;
  bonusRate: number;
  maxPayoutLevel: number;
  poolAccess: string[];
  specialRewards: Reward[];
}

export interface Commission {
  id: string;
  userId: string;
  type: CommissionType;
  amount: number;
  source: string;
  level: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  timestamp: string;
  details: Record<string, any>;
}

export type CommissionType = 
  | 'direct' 
  | 'binary' 
  | 'matching' 
  | 'leadership' 
  | 'pool' 
  | 'achievement';

// CRM Types
export interface Customer {
  id: string;
  userId: string;
  profile: CustomerProfile;
  interactions: CustomerInteraction[];
  purchases: Purchase[];
  status: CustomerStatus;
}

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  preferences: Record<string, any>;
  tags: string[];
}

export interface CustomerInteraction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'support';
  timestamp: string;
  notes: string;
  outcome: string;
  followUpDate?: string;
}

// State Management Types
export interface MLMState {
  ranks: RankState;
  pools: PoolState;
  commissions: CommissionState;
  crm: CRMState;
}

export interface RankState {
  ranks: Rank[];
  userRanks: Record<string, string>;
  rankHistory: RankHistoryEntry[];
  loading: boolean;
  error: string | null;
}

export interface PoolState {
  pools: Pool[];
  activePool: string | null;
  spilloverRules: SpilloverRule[];
  poolMetrics: Record<string, PoolMetrics>;
  loading: boolean;
  error: string | null;
}

export interface CommissionState {
  commissions: Commission[];
  pendingPayouts: number;
  totalPaid: number;
  commissionRules: CommissionRule[];
  loading: boolean;
  error: string | null;
}

export interface CRMState {
  customers: Customer[];
  interactions: CustomerInteraction[];
  metrics: CRMMetrics;
  loading: boolean;
  error: string | null;
}

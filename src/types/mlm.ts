export interface Pool {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  capacity: number;
  currentMembers: number;
  spilloverRules: SpilloverRule[];
  rewards: PoolReward[];
  createdAt: string;
  updatedAt: string;
}

export interface SpilloverRule {
  id: number;
  sourcePoolId: number;
  targetPoolId: number;
  condition: 'overflow' | 'achievement' | 'time';
  threshold: number;
  priority: number;
}

export interface Rank {
  id: number;
  name: string;
  level: number;
  requirements: RankRequirement[];
  benefits: RankBenefit[];
  color: string;
  icon: string;
}

export interface RankRequirement {
  type: 'personal_sales' | 'team_sales' | 'downline_count' | 'time_period';
  value: number;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'lifetime';
}

export interface Commission {
  id: number;
  userId: number;
  amount: number;
  type: 'direct' | 'indirect' | 'bonus' | 'pool';
  status: 'pending' | 'approved' | 'paid';
  createdAt: string;
  paidAt?: string;
}

export interface CRMContact {
  id: number;
  userId: number;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  source: string;
  lastContact: string;
  notes: string[];
  tags: string[];
}
export interface NetworkMetricsData {
  totalUsers: number;
  activeUsers: number;
  networkGrowth: number;
  networkDepth: number;
}

export interface PerformanceData {
  dailyTransactions: number[];
  conversionRates: number[];
  timeSeriesData: {
    timestamp: string;
    value: number;
  }[];
}

export interface UserStatsData {
  newUsers: number;
  retention: number;
  engagement: number;
  demographics: Record<string, number>;
}

export interface RevenueData {
  totalRevenue: number;
  periodGrowth: number;
  revenueByProduct: Record<string, number>;
  projections: number[];
}

export interface AnalyticsData {
  networkMetrics: NetworkMetricsData;
  performance: PerformanceData;
  userStats: UserStatsData;
  revenue: RevenueData;
}
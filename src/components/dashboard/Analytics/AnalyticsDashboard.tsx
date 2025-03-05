import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography } from '@mui/material';
import NetworkMetrics from './NetworkMetrics';
import PerformanceCharts from './PerformanceCharts';
import UserAnalytics from './UserAnalytics';
import RevenueAnalytics from './RevenueAnalytics';
import { fetchAnalyticsData } from '../../../services/analytics';
import { AnalyticsData } from '../../../types/analytics';

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    networkMetrics: {
      totalUsers: 0,
      activeUsers: 0,
      networkGrowth: 0,
      networkDepth: 0
    },
    performance: {
      dailyTransactions: [],
      conversionRates: [],
      timeSeriesData: []
    },
    userStats: {
      newUsers: 0,
      retention: 0,
      engagement: 0,
      demographics: {}
    },
    revenue: {
      totalRevenue: 0,
      periodGrowth: 0,
      revenueByProduct: {},
      projections: []
    }
  });

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ p: 2, mb: 2 }}>
          <Typography variant="h5">Advanced Analytics</Typography>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <NetworkMetrics data={analyticsData.networkMetrics} />
      </Grid>
      <Grid item xs={12} md={6}>
        <PerformanceCharts data={analyticsData.performance} />
      </Grid>
      <Grid item xs={12} md={6}>
        <UserAnalytics data={analyticsData.userStats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <RevenueAnalytics data={analyticsData.revenue} />
      </Grid>
    </Grid>
  );
}

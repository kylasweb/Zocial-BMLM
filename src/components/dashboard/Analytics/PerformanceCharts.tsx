import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { PerformanceData } from '../../../types/analytics';

// First, install recharts if not already installed:
// npm install recharts @types/recharts

// Define RootState type
interface RootState {
  analytics: {
    performance: {
      salesData: Array<{
        date: string;
        sales: number;
        target: number;
      }>;
      teamGrowth: Array<{
        month: string;
        newMembers: number;
        activeMembers: number;
      }>;
    };
  };
}

export default function PerformanceCharts(): JSX.Element {
  const performance = useSelector((state: RootState) => state.analytics.performance);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Sales Performance
          </Typography>
          <LineChart width={500} height={300} data={performance.salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <Line type="monotone" dataKey="target" stroke="#82ca9d" />
          </LineChart>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Team Growth
          </Typography>
          <BarChart width={500} height={300} data={performance.teamGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="newMembers" fill="#8884d8" />
            <Bar dataKey="activeMembers" fill="#82ca9d" />
          </BarChart>
        </Card>
      </Grid>
    </Grid>
  );
}

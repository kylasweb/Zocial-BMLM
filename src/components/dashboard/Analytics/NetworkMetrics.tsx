import React from 'react';
import { Card, Typography, Grid } from '@mui/material';
import { NetworkMetricsData } from '../../../types/analytics';

interface Props {
  data: NetworkMetricsData;
}

export default function NetworkMetrics({ data }: Props) {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Network Metrics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Total Users
          </Typography>
          <Typography variant="h4">{data.totalUsers}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Active Users
          </Typography>
          <Typography variant="h4">{data.activeUsers}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Network Growth
          </Typography>
          <Typography variant="h4">{data.networkGrowth}%</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Network Depth
          </Typography>
          <Typography variant="h4">{data.networkDepth}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
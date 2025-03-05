import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Card, Typography, Button } from '@mui/material';
import CommissionTable from './CommissionTable';
import CommissionRules from './CommissionRules';
import PayoutSchedule from './PayoutSchedule';
import CommissionStats from './CommissionStats';

export default function CommissionDashboard() {
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState('overview');
  const { commissions, commissionRules, loading } = useSelector((state: RootState) => state.commission);

  const views = {
    overview: <CommissionStats />,
    rules: <CommissionRules />,
    payouts: <PayoutSchedule />,
    history: <CommissionTable />
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ p: 2, mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Commission Management
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(views).map((view) => (
              <Grid item key={view}>
                <Button
                  variant={activeView === view ? 'contained' : 'outlined'}
                  onClick={() => setActiveView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {views[activeView]}
      </Grid>
    </Grid>
  );
}
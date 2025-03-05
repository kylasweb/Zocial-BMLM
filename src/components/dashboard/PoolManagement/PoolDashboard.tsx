import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Card, Typography, Button } from '@mui/material';
import PoolList from './PoolList';
import PoolMetrics from './PoolMetrics';
import SpilloverRules from './SpilloverRules';
import NewPoolModal from './NewPoolModal';
import { setActivePool } from '../../../store/mlm/slices/poolSlice';

export default function PoolDashboard() {
  const dispatch = useDispatch();
  const [showNewPoolModal, setShowNewPoolModal] = useState(false);
  const { pools, activePool, spilloverRules } = useSelector((state: RootState) => state.pool);

  const handlePoolCreate = (poolData) => {
    // Implementation for pool creation
    setShowNewPoolModal(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ p: 2, mb: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Pool Management</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowNewPoolModal(true)}
            >
              Create New Pool
            </Button>
          </Grid>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <PoolList 
          pools={pools}
          activePool={activePool}
          onPoolSelect={(pool) => dispatch(setActivePool(pool))}
        />
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PoolMetrics pool={activePool} />
          </Grid>
          <Grid item xs={12}>
            <SpilloverRules rules={spilloverRules} />
          </Grid>
        </Grid>
      </Grid>

      <NewPoolModal
        open={showNewPoolModal}
        onClose={() => setShowNewPoolModal(false)}
        onSubmit={handlePoolCreate}
      />
    </Grid>
  );
}
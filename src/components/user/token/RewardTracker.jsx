import { useRewardSystem } from '../../../hooks/useRewardSystem';
import { Card, Typography, List, ListItem, Chip } from '@mui/material';

export default function RewardTracker({ tokenId }) {
  const { rewardHistory, statistics } = useRewardSystem(tokenId);

  return (
    <Card className="p-4">
      <Typography variant="h6" className="mb-4">
        Rewards & Achievements
      </Typography>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <Typography variant="h4">{statistics.totalRewards}</Typography>
          <Typography color="textSecondary">Total Rewards</Typography>
        </div>
        <div className="text-center">
          <Typography variant="h4">{statistics.activeAchievers}</Typography>
          <Typography color="textSecondary">Achievements</Typography>
        </div>
        <div className="text-center">
          <Typography variant="h4">{statistics.poolDistribution.total}</Typography>
          <Typography color="textSecondary">Pool Share</Typography>
        </div>
      </div>
      
      <List>
        {rewardHistory.map(reward => (
          <ListItem
            key={reward.id}
            className="flex justify-between items-center"
          >
            <div>
              <Typography variant="subtitle1">
                {reward.type}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(reward.timestamp).toLocaleDateString()}
              </Typography>
            </div>
            
            <Chip
              label={`${reward.amount} Tokens`}
              color="primary"
              variant="outlined"
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
import { useState } from 'react';
import { useAirdropManagement } from '../../../hooks/useAirdropManagement';
import { Card, Typography, Button, List, ListItem } from '@mui/material';

export default function AirdropParticipation({ tokenId }) {
  const { activeAirdrops, participateInAirdrop } = useAirdropManagement(tokenId);

  const handleParticipate = async (airdropId) => {
    try {
      await participateInAirdrop(airdropId);
    } catch (error) {
      console.error('Failed to participate:', error);
    }
  };

  return (
    <Card className="p-4">
      <Typography variant="h6" className="mb-4">
        Active Airdrops
      </Typography>
      
      <List>
        {activeAirdrops.map(airdrop => (
          <ListItem
            key={airdrop.id}
            className="flex justify-between items-center"
          >
            <div>
              <Typography variant="subtitle1">
                {airdrop.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Amount: {airdrop.amount} Tokens
              </Typography>
            </div>
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleParticipate(airdrop.id)}
              disabled={airdrop.participated}
            >
              {airdrop.participated ? 'Participated' : 'Participate'}
            </Button>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
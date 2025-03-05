import { useState } from 'react';
import { useFaucetManagement } from '../../../hooks/useFaucetManagement';
import { Button, Card, Typography, CircularProgress } from '@mui/material';

export default function FaucetClaim({ tokenId }) {
  const [claiming, setClaiming] = useState(false);
  const { faucetConfig, processClaim } = useFaucetManagement(tokenId);

  const handleClaim = async () => {
    try {
      setClaiming(true);
      await processClaim();
    } finally {
      setClaiming(false);
    }
  };

  return (
    <Card className="p-4">
      <Typography variant="h6" className="mb-4">
        Token Faucet
      </Typography>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <Typography>Available Amount:</Typography>
          <Typography>{faucetConfig.claimAmount} Tokens</Typography>
        </div>
        
        <div className="flex justify-between">
          <Typography>Cooldown Period:</Typography>
          <Typography>{faucetConfig.cooldownPeriod} hours</Typography>
        </div>
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClaim}
          disabled={claiming}
        >
          {claiming ? <CircularProgress size={24} /> : 'Claim Tokens'}
        </Button>
      </div>
    </Card>
  );
}
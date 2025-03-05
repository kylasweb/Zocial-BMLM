import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { updateCommissionRule } from '../../../store/slices/commissionSlice';

interface CommissionRule {
  id: string;
  level: string;
  percentage: number;
  minimumRequirement: string;
}

interface RootState {
  commission: {
    commissionRules: CommissionRule[];
  };
}

export default function CommissionRules() {
  const dispatch = useDispatch();
  const { commissionRules } = useSelector((state: RootState) => state.commission);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedRule, setSelectedRule] = useState<CommissionRule | null>(null);

  const handleEditRule = (rule: CommissionRule) => {
    setSelectedRule(rule);
    setEditDialog(true);
  };

  const handleSaveRule = () => {
    if (selectedRule) {
      dispatch(updateCommissionRule(selectedRule));
      setEditDialog(false);
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Commission Rules
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Level</TableCell>
            <TableCell>Percentage</TableCell>
            <TableCell>Minimum Requirement</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commissionRules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell>{rule.level}</TableCell>
              <TableCell>{rule.percentage}%</TableCell>
              <TableCell>{rule.minimumRequirement}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditRule(rule)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Edit Commission Rule</DialogTitle>
        <DialogContent>
          <TextField
            label="Percentage"
            type="number"
            value={selectedRule?.percentage || ''}
            onChange={(e) => setSelectedRule({
              ...selectedRule,
              percentage: parseFloat(e.target.value)
            })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Minimum Requirement"
            value={selectedRule?.minimumRequirement || ''}
            onChange={(e) => setSelectedRule({
              ...selectedRule,
              minimumRequirement: e.target.value
            })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveRule} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

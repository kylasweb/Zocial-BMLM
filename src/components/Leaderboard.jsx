import { useState, useEffect } from 'react';
import { DataMerger } from '../utils/dataMerger';
import apiService from '../services/api';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        const realUsers = await apiService.getLeaderboardData();
        const mergedUsers = await DataMerger.mergeUsersData(realUsers);
        setUsers(mergedUsers);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboardData();
  }, []);

  // ... rest of the component code ...
}
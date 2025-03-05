import { stealthStorage } from '../services/stealthStorage';

export class DataMerger {
  static async mergeUsersData(realUsers) {
    try {
      const fakeUsers = await stealthStorage.getFakeUsers();
      
      const merged = [...realUsers, ...fakeUsers].sort((a, b) => {
        // Sort by various metrics for believability
        const aScore = this.calculateUserScore(a);
        const bScore = this.calculateUserScore(b);
        return bScore - aScore;
      });

      return merged;
    } catch (error) {
      console.error('Error merging user data:', error);
      return realUsers;
    }
  }

  static calculateUserScore(user) {
    // Complex scoring algorithm based on multiple factors
    let score = 0;
    
    // Investment score
    const totalInvestment = user.investments?.reduce((sum, inv) => sum + inv.amount, 0) || 0;
    score += totalInvestment * 0.5;

    // Activity score
    const activityCount = user.activity?.length || 0;
    score += activityCount * 10;

    // Team size score
    const teamSize = user.team?.length || 0;
    score += teamSize * 20;

    // Rank multiplier
    const rankMultipliers = {
      BRONZE: 1,
      SILVER: 1.2,
      GOLD: 1.5,
      PLATINUM: 2,
      DIAMOND: 3
    };
    score *= rankMultipliers[user.rank] || 1;

    return score;
  }
}
class RankManager {
  async evaluateRankProgression(userId) {
    const userMetrics = await this.getUserMetrics(userId);
    const rankCriteria = await this.getRankCriteria();
    
    const eligibleRanks = rankCriteria
      .filter(rank => this.isEligibleForRank(userMetrics, rank))
      .sort((a, b) => b.level - a.level);

    const newRank = eligibleRanks[0];
    if (newRank && newRank.level > userMetrics.currentRank.level) {
      await this.processRankUpgrade(userId, newRank);
    }

    return {
      currentRank: userMetrics.currentRank,
      nextRank: this.getNextRank(userMetrics.currentRank),
      progress: this.calculateRankProgress(userMetrics),
      requirements: this.getRemainingRequirements(userMetrics)
    };
  }

  async processRankUpgrade(userId, newRank) {
    const transaction = await this.startTransaction();
    
    try {
      await Promise.all([
        this.updateUserRank(userId, newRank),
        this.distributeRankBonuses(userId, newRank),
        this.updateAchievements(userId, 'RANK_ADVANCEMENT'),
        this.notifyUpline(userId, { type: 'RANK_UPGRADE', rank: newRank }),
        this.triggerRankRewards(userId, newRank)
      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new RankUpgradeError('Rank upgrade failed', { userId, error });
    }
  }

  calculateRankProgress(metrics) {
    return Object.entries(metrics).map(([key, value]) => ({
      metric: key,
      current: value,
      required: this.getRequiredValue(key, metrics.targetRank),
      percentage: this.calculateProgressPercentage(value, key, metrics.targetRank)
    }));
  }
}

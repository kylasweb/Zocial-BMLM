class RewardProcessor {
  async processRewards(batchSize = 100) {
    const queue = await this.getPendingRewards();
    
    for (let i = 0; i < queue.length; i += batchSize) {
      const batch = queue.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (reward) => {
        try {
          await this.calculateReward(reward);
          await this.distributeReward(reward);
          await this.updateUserBalance(reward.userId, reward.amount);
        } catch (error) {
          await this.logFailedReward(reward, error);
          await this.scheduleRetry(reward);
        }
      }));
    }
  }

  async scheduleRetry(reward, attempts = 0) {
    if (attempts < 3) {
      setTimeout(() => {
        this.processRewards([reward], attempts + 1);
      }, Math.pow(2, attempts) * 1000); // Exponential backoff
    } else {
      await this.notifyAdmin('Failed reward distribution', reward);
    }
  }
}
class SpilloverManager {
  async distributeSpillover(newMember) {
    const availablePools = await this.getActivePools();
    
    const optimalPool = await this.findOptimalPool(availablePools, {
      criteria: {
        depth: 'minimum',
        balance: 'maximum',
        performance: 'active'
      }
    });

    if (optimalPool) {
      await this.assignToPool(newMember, optimalPool.id);
      await this.updatePoolMetrics(optimalPool.id);
      await this.notifyPoolMembers(optimalPool.id, {
        type: 'NEW_MEMBER',
        data: { memberId: newMember.id }
      });
    } else {
      await this.createNewPool(newMember);
    }
  }

  async findOptimalPool(pools, criteria) {
    return pools.reduce((best, current) => {
      const score = this.calculatePoolScore(current, criteria);
      return score > best.score ? { pool: current, score } : best;
    }, { pool: null, score: -1 }).pool;
  }
}
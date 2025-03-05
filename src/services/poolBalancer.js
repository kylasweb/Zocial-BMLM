class PoolBalancer {
  async optimizePools() {
    const pools = await this.getActivePools();
    const metrics = await this.calculatePoolMetrics(pools);
    
    const optimizations = pools.map(pool => ({
      poolId: pool.id,
      currentLoad: metrics[pool.id].memberCount,
      optimalLoad: this.calculateOptimalLoad(pool),
      performance: metrics[pool.id].performance,
      actions: this.determineBalancingActions(
        metrics[pool.id],
        this.calculateOptimalLoad(pool)
      )
    }));

    return await this.executePoolOptimizations(optimizations);
  }

  async executePoolOptimizations(optimizations) {
    const results = {
      balanced: [],
      failed: [],
      skipped: []
    };

    for (const opt of optimizations) {
      if (opt.actions.length === 0) {
        results.skipped.push(opt.poolId);
        continue;
      }

      try {
        await this.executeBalancingActions(opt.actions);
        await this.updatePoolMetrics(opt.poolId);
        results.balanced.push(opt.poolId);
      } catch (error) {
        results.failed.push({
          poolId: opt.poolId,
          error: error.message
        });
      }
    }

    return results;
  }

  determineBalancingActions(metrics, optimalLoad) {
    const actions = [];
    const difference = metrics.memberCount - optimalLoad;

    if (Math.abs(difference) > this.threshold) {
      if (difference > 0) {
        actions.push({
          type: 'REDISTRIBUTE',
          count: Math.ceil(difference / 2),
          source: metrics.poolId,
          target: this.findUnderloadedPool(metrics.level)
        });
      } else {
        actions.push({
          type: 'MERGE',
          source: metrics.poolId,
          target: this.findSuitableMergeTarget(metrics.level)
        });
      }
    }

    return actions;
  }
}
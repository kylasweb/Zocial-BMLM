class CommissionManager {
  async processCommissions(period) {
    const qualifiedUsers = await this.getQualifiedUsers(period);
    const commissionRules = await this.getCommissionRules();
    
    const results = await Promise.allSettled(
      qualifiedUsers.map(user => 
        this.calculateAndDistributeCommission(user, period, commissionRules)
      )
    );

    await this.logCommissionResults(period, results);
    return this.generateCommissionReport(results);
  }

  async calculateAndDistributeCommission(user, period, rules) {
    const transaction = await this.startTransaction();
    
    try {
      const salesMetrics = await this.getSalesMetrics(user.id, period);
      const teamMetrics = await this.getTeamMetrics(user.id, period);
      
      const commission = {
        direct: this.calculateDirectCommission(salesMetrics, rules),
        team: this.calculateTeamCommission(teamMetrics, rules),
        bonus: this.calculateBonusCommission(user, rules),
        leadership: this.calculateLeadershipBonus(user, teamMetrics, rules)
      };

      await Promise.all([
        this.distributeCommission(user.id, commission),
        this.updateCommissionHistory(user.id, commission, period),
        this.notifyUser(user.id, 'COMMISSION_PAID', commission),
        this.updateTaxRecords(user.id, commission)
      ]);

      await transaction.commit();
      return { userId: user.id, commission, status: 'SUCCESS' };
    } catch (error) {
      await transaction.rollback();
      return { userId: user.id, error, status: 'FAILED' };
    }
  }

  async generateCommissionReport(results) {
    const successful = results.filter(r => r.status === 'fulfilled');
    const failed = results.filter(r => r.status === 'rejected');

    return {
      periodTotal: this.calculatePeriodTotal(successful),
      successfulDistributions: successful.length,
      failedDistributions: failed.length,
      details: this.formatCommissionDetails(successful),
      errors: this.formatErrorDetails(failed)
    };
  }
}
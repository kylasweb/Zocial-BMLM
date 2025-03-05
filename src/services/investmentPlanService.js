import { InvestmentPlan } from '../database/schemas/InvestmentPlan';
import { ApiError } from '../utils/ApiError';

export const investmentPlanService = {
  // Calculate potential earnings based on plan rules
  async calculatePotentialEarnings(planId, investment) {
    const plan = await InvestmentPlan.findById(planId);
    if (!plan) {
      throw new ApiError(404, 'Investment plan not found');
    }

    // Basic ROI calculation
    const baseEarnings = (investment * plan.roi) / 100;

    // Calculate matrix bonuses
    const matrixBonus = (investment * plan.commissions.matrixBonus) / 100;

    // Calculate team bonuses
    const teamBonus = (investment * plan.commissions.teamBonus) / 100;

    // Calculate cycle bonuses
    const cycleBonus = (investment * plan.commissions.cycleBonus) / 100;

    return {
      baseEarnings,
      matrixBonus,
      teamBonus,
      cycleBonus,
      totalPotential: baseEarnings + matrixBonus + teamBonus + cycleBonus
    };
  },

  // Validate user eligibility for a plan
  async validateEligibility(planId, userId) {
    const plan = await InvestmentPlan.findById(planId);
    if (!plan) {
      throw new ApiError(404, 'Investment plan not found');
    }

    // Get user's current rank and referrals
    const user = await User.findById(userId).select('rank referrals');
    
    const isEligible = {
      rank: user.rank >= plan.eligibility.minRank,
      referrals: user.referrals >= plan.eligibility.minReferrals,
      status: plan.status === 'ACTIVE'
    };

    return {
      isEligible: Object.values(isEligible).every(Boolean),
      criteria: isEligible
    };
  },

  // Apply custom logic rules
  async applyCustomLogic(planId, context) {
    const plan = await InvestmentPlan.findById(planId);
    if (!plan) {
      throw new ApiError(404, 'Investment plan not found');
    }

    const results = [];
    
    for (const rule of plan.customLogic.customRules) {
      const { condition, action, parameters } = rule;
      
      // Evaluate condition
      const conditionMet = await this.evaluateCondition(condition, context);
      
      if (conditionMet) {
        // Execute action
        const actionResult = await this.executeAction(action, parameters, context);
        results.push(actionResult);
      }
    }

    return results;
  },

  // Helper methods for custom logic
  async evaluateCondition(condition, context) {
    // Implement condition evaluation logic
    // Return boolean based on condition evaluation
  },

  async executeAction(action, parameters, context) {
    // Implement action execution logic
    // Return result of action execution
  }
};
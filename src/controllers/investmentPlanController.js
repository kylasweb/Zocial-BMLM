import { InvestmentPlan } from '../database/schemas/InvestmentPlan';
import { ApiError } from '../utils/ApiError';

export const investmentPlanController = {
  // Create new investment plan
  async create(req, res) {
    try {
      const plan = new InvestmentPlan(req.body);
      await plan.validate();
      const savedPlan = await plan.save();
      res.status(201).json(savedPlan);
    } catch (error) {
      throw new ApiError(400, 'Invalid plan data', error);
    }
  },

  // Get all investment plans
  async getAll(req, res) {
    try {
      const { status, type } = req.query;
      const filter = {};
      
      if (status) filter.status = status;
      if (type) filter.type = type;

      const plans = await InvestmentPlan
        .find(filter)
        .sort({ createdAt: -1 });
      
      res.json(plans);
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch investment plans', error);
    }
  },

  // Get single investment plan
  async getById(req, res) {
    try {
      const plan = await InvestmentPlan.findById(req.params.id);
      if (!plan) {
        throw new ApiError(404, 'Investment plan not found');
      }
      res.json(plan);
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch investment plan', error);
    }
  },

  // Update investment plan
  async update(req, res) {
    try {
      const plan = await InvestmentPlan.findById(req.params.id);
      if (!plan) {
        throw new ApiError(404, 'Investment plan not found');
      }

      Object.assign(plan, req.body);
      await plan.validate();
      const updatedPlan = await plan.save();
      
      res.json(updatedPlan);
    } catch (error) {
      throw new ApiError(400, 'Failed to update investment plan', error);
    }
  },

  // Delete investment plan
  async delete(req, res) {
    try {
      const plan = await InvestmentPlan.findById(req.params.id);
      if (!plan) {
        throw new ApiError(404, 'Investment plan not found');
      }

      await plan.remove();
      res.status(204).send();
    } catch (error) {
      throw new ApiError(500, 'Failed to delete investment plan', error);
    }
  },

  // Clone investment plan
  async clone(req, res) {
    try {
      const sourcePlan = await InvestmentPlan.findById(req.params.id);
      if (!sourcePlan) {
        throw new ApiError(404, 'Source investment plan not found');
      }

      const planData = sourcePlan.toObject();
      delete planData._id;
      planData.name = `${planData.name} (Copy)`;
      planData.status = 'INACTIVE';

      const newPlan = new InvestmentPlan(planData);
      await newPlan.save();

      res.status(201).json(newPlan);
    } catch (error) {
      throw new ApiError(400, 'Failed to clone investment plan', error);
    }
  },

  // Update plan status
  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      if (!['ACTIVE', 'INACTIVE'].includes(status)) {
        throw new ApiError(400, 'Invalid status');
      }

      const plan = await InvestmentPlan.findById(req.params.id);
      if (!plan) {
        throw new ApiError(404, 'Investment plan not found');
      }

      plan.status = status;
      await plan.save();

      res.json(plan);
    } catch (error) {
      throw new ApiError(400, 'Failed to update plan status', error);
    }
  }
};
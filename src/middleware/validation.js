import Joi from 'joi';
import { ApiError } from '../utils/ApiError';

export const investmentPlanSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10),
  type: Joi.string().valid('BASIC', 'PREMIUM', 'VIP').required(),
  status: Joi.string().valid('ACTIVE', 'INACTIVE').default('ACTIVE'),
  price: Joi.number().min(0).required(),
  minAmount: Joi.number().min(0).required(),
  maxAmount: Joi.number().greater(Joi.ref('minAmount')).required(),
  duration: Joi.number().min(1).required(),
  roi: Joi.number().min(0).required(),
  features: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string(),
      isEnabled: Joi.boolean().default(true)
    })
  ),
  commissions: Joi.object({
    directReferral: Joi.number().min(0).max(100).default(0),
    matrixBonus: Joi.number().min(0).max(100).default(0),
    teamBonus: Joi.number().min(0).max(100).default(0),
    cycleBonus: Joi.number().min(0).max(100).default(0)
  }),
  eligibility: Joi.object({
    minRank: Joi.string().default('NONE'),
    minReferrals: Joi.number().min(0).default(0)
  }),
  customLogic: Joi.object({
    spilloverEnabled: Joi.boolean().default(false),
    fastTrackEnabled: Joi.boolean().default(false),
    autoBalanceEnabled: Joi.boolean().default(false),
    customRules: Joi.array().items(
      Joi.object({
        condition: Joi.string().required(),
        action: Joi.string().required(),
        parameters: Joi.object().required()
      })
    )
  })
});

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      throw new ApiError(400, 'Validation failed', errors);
    }
    
    next();
  };
};
import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  isEnabled: Boolean
});

const commissionSchema = new mongoose.Schema({
  directReferral: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  matrixBonus: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  teamBonus: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  cycleBonus: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
});

const customLogicSchema = new mongoose.Schema({
  spilloverEnabled: {
    type: Boolean,
    default: false
  },
  fastTrackEnabled: {
    type: Boolean,
    default: false
  },
  autoBalanceEnabled: {
    type: Boolean,
    default: false
  },
  customRules: [{
    condition: String,
    action: String,
    parameters: mongoose.Schema.Types.Mixed
  }]
});

const investmentPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['BASIC', 'PREMIUM', 'VIP'],
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  minAmount: {
    type: Number,
    required: true,
    min: 0
  },
  maxAmount: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  roi: {
    type: Number,
    required: true,
    min: 0
  },
  features: [featureSchema],
  commissions: commissionSchema,
  eligibility: {
    minRank: {
      type: String,
      default: 'NONE'
    },
    minReferrals: {
      type: Number,
      default: 0
    }
  },
  customLogic: customLogicSchema,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

investmentPlanSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const InvestmentPlan = mongoose.model('InvestmentPlan', investmentPlanSchema);
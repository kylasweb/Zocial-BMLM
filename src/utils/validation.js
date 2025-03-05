import * as yup from 'yup';

export const investmentPlanSchema = yup.object().shape({
  name: yup.string().required('Plan name is required'),
  description: yup.string().required('Description is required'),
  type: yup.string().oneOf(['BASIC', 'PREMIUM', 'VIP'], 'Invalid plan type'),
  status: yup.string().oneOf(['ACTIVE', 'INACTIVE'], 'Invalid status'),
  price: yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  minAmount: yup.number()
    .required('Minimum amount is required')
    .positive('Amount must be positive'),
  maxAmount: yup.number()
    .required('Maximum amount is required')
    .positive('Amount must be positive')
    .moreThan(yup.ref('minAmount'), 'Max amount must be greater than min amount'),
  duration: yup.number()
    .required('Duration is required')
    .positive('Duration must be positive'),
  roi: yup.number()
    .required('ROI is required')
    .min(0, 'ROI cannot be negative'),
  commissions: yup.object().shape({
    directReferral: yup.number().min(0).max(100),
    matrixBonus: yup.number().min(0).max(100),
    teamBonus: yup.number().min(0).max(100),
    cycleBonus: yup.number().min(0).max(100)
  }),
  eligibility: yup.object().shape({
    minRank: yup.string(),
    minReferrals: yup.number().min(0)
  }),
  customLogic: yup.object().shape({
    spilloverEnabled: yup.boolean(),
    fastTrackEnabled: yup.boolean(),
    autoBalanceEnabled: yup.boolean()
  }),
  features: yup.array().of(yup.string())
});

export const userProfileSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: yup.string()
    .matches(/^\+?[\d\s-]+$/, 'Invalid phone number format'),
  walletAddress: yup.string()
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
});

export const validateForm = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    const errors = err.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
    return { isValid: false, errors };
  }
};

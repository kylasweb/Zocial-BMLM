import * as yup from 'yup';

export const investmentPlanSchema = yup.object().shape({
  name: yup.string().required('Plan name is required'),
  description: yup.string().required('Description is required'),
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
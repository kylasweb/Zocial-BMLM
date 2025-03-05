import express from 'express';
import { investmentPlanController } from '../controllers/investmentPlanController';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { investmentPlanSchema } from '../utils/validation';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Routes that require admin authorization
router.use(authorize(['ADMIN']));

router.post('/', 
  validateRequest(investmentPlanSchema),
  investmentPlanController.create
);

router.get('/', investmentPlanController.getAll);

router.get('/:id', investmentPlanController.getById);

router.put('/:id',
  validateRequest(investmentPlanSchema),
  investmentPlanController.update
);

router.delete('/:id', investmentPlanController.delete);

router.post('/:id/clone', investmentPlanController.clone);

router.patch('/:id/status',
  validateRequest({
    status: investmentPlanSchema.status
  }),
  investmentPlanController.updateStatus
);

export default router;
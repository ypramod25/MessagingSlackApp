import express from 'express';
import { createOrderController } from '../../controllers/paymentController';
import { isAuthenticated } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/order', isAuthenticated, createOrderController);

export default router;
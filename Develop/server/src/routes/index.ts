import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes); // Login route does not require authentication
router.use(authenticateToken); // Middleware for protected routes
router.use('/api', apiRoutes);

export default router;

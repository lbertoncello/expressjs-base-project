import express from 'express';
import gameRoutes from './game-routes.js';
import authRoutes from './auth-routes.js';

const router = express.Router();

router.use('/game', gameRoutes);
router.use('/auth', authRoutes);

export default router;

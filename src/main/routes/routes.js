import express from 'express';
import gameRoutes from './game-routes.js';
import userRoutes from './user-routes.js';

const router = express.Router();

router.use('/game', gameRoutes);
router.use('/auth', userRoutes);

export default router;

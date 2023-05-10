import express from 'express';
import gameRoutes from './game-routes.js';
import userRoutes from './user-routes.js';

const router = express.Router();

router.use(gameRoutes);
router.use(userRoutes);

export default router;

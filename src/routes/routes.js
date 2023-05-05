import express from 'express';
import gameRoutes from './game-routes.js'

const router = express.Router();

router.use(gameRoutes);

export default router;
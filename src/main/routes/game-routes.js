import express from 'express';
import { adaptRoute } from '../adapters/express-router-adapter.js';
import { makeGameController } from '../factories/game.js';

const router = express.Router();
const controller = makeGameController();

router.route('/game').post(adaptRoute(controller.addGame.bind(controller)));

export default router;

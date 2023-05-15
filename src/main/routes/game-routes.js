import express from 'express';
import { adaptRoute } from '../adapters/express-router-adapter.js';
import { makeGameController } from '../factories/game.js';

const router = express.Router();
const controller = makeGameController();

router.route('/').post(adaptRoute(controller.addGame.bind(controller)));
router.route('/all').get(adaptRoute(controller.getAllGames.bind(controller)));
router
  .route('/:id')
  .get(adaptRoute(controller.getGameById.bind(controller)))
  .delete(adaptRoute(controller.deleteGameById.bind(controller)))
  .put(adaptRoute(controller.updateGameById.bind(controller)))
  .patch(adaptRoute(controller.updateGameById.bind(controller)));

export default router;

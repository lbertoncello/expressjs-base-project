import express from 'express';
import { adaptRoute } from '../adapters/express-router-adapter.js';
import {
  makeAddGameController,
  makeGetGameByIdController,
  makeGetAllGamesController,
  makeUpdateGameByIdController,
  makeDeleteGameController,
} from '../factories/game.js';

const router = express.Router();
const addGameController = makeAddGameController();
const getGameByIdController = makeGetGameByIdController();
const getAllGamesController = makeGetAllGamesController();
const updateGameByIdController = makeUpdateGameByIdController();
const deleteGameController = makeDeleteGameController();

router.route('/').post(adaptRoute(addGameController.handle.bind(addGameController)));
router.route('/all').get(adaptRoute(getAllGamesController.handle.bind(getAllGamesController)));
router
  .route('/:id')
  .get(adaptRoute(getGameByIdController.handle.bind(getGameByIdController)))
  .put(adaptRoute(updateGameByIdController.handle.bind(updateGameByIdController)))
  .patch(adaptRoute(updateGameByIdController.handle.bind(updateGameByIdController)))
  .delete(adaptRoute(deleteGameController.handle.bind(deleteGameController)));

export default router;

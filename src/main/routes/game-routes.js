import express from 'express';
import GameController from '../../presentation/controllers/game-controller.js';
import GameDatabase from '../../data-access/database/game-database.js';
import GameRepository from '../../entities/repositories/game-repository.js';

const router = express.Router();
const database = new GameDatabase();
const repository = new GameRepository(database);
const controller = new GameController(repository);

router.route('/game').get(controller.test).post(controller.addGame.bind(controller));

export default router;

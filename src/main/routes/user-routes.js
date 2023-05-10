import express from 'express';
import { adaptRoute } from '../adapters/express-router-adapter.js';
import UserController from '../../presentation/controllers/user-controller.js';
import UserDatabase from '../../data-access/database/user-database.js';
import UserRepository from '../../entities/repositories/user-repository.js';

const router = express.Router();
const database = new UserDatabase();
const repository = new UserRepository(database);
const controler = new UserController(repository);

router.route('/user').post(adaptRoute(controler.addUser.bind(controler)));

export default router;

import express from 'express';
import { adaptRoute } from '../adapters/express-router-adapter.js';
import { makeUserController } from '../factories/user.js';

const router = express.Router();
const controller = makeUserController();

router.route('/user').post(adaptRoute(controller.addUser.bind(controller)));

export default router;

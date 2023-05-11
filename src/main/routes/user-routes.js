import express from 'express';
import { adaptRoute } from '../adapters/express-router-adapter.js';
import { makeUserController } from '../factories/user.js';

const router = express.Router();
const controller = makeUserController();

router.route('/auth/signup').post(adaptRoute(controller.signUp.bind(controller)));
router.route('/auth/signin').post(adaptRoute(controller.signIn.bind(controller)));

export default router;

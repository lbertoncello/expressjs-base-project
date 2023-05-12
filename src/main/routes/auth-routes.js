import express from 'express';
import { adaptRoute } from '../adapters/express-router-adapter.js';
import { makeAuthController } from '../factories/auth.js';

const router = express.Router();
const controller = makeAuthController();

router.route('/signup').post(adaptRoute(controller.signUp.bind(controller)));
router.route('/signin').post(adaptRoute(controller.signIn.bind(controller)));

export default router;

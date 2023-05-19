import express from 'express';
import { adaptRoute } from '../adapters/express-router-adapter.js';
import { makeAuthController } from '../factories/auth.js';
import requireAuth from '../middlewares/require-auth.js';

const router = express.Router();
const controller = makeAuthController();

router.route('/signup').post(adaptRoute(controller.signUp.bind(controller)));
router.route('/signin').post(adaptRoute(controller.signIn.bind(controller)));
router.route('/password').post(requireAuth, adaptRoute(controller.changePassword.bind(controller)));
router.route('/signout').post(requireAuth, adaptRoute(controller.signOut.bind(controller)));

export default router;

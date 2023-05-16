import express from 'express';
import { makeUserController } from '../factories/user.js';
import { adaptRoute } from '../adapters/express-router-adapter.js';

const router = express.Router();
const controller = makeUserController();

router.route('/me').get(adaptRoute(controller.getMyUserData.bind(controller)));

export default router;

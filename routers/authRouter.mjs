import express from 'express';
import * as authController from './../controllers/authController.mjs';

const router = express.Router();

router.post(
  '/signup',
  authController.protect,
  authController.restrictTo('master'),
  authController.signup
);

router.get(
  '/auth',
  authController.protect,
  authController.restrictTo('master', 'admin'),
  authController.auth
);

router.post('/login', authController.login);

export default router;

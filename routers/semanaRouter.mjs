import express from 'express';
import * as semanaController from './../controllers/semanaController.mjs';

const router = express.Router();

router
  .route('/')
  .get(semanaController.getAllSemana)
  .delete(semanaController.emptyPdfFoler);

export default router;

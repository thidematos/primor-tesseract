import express from 'express';
import * as semanaController from './../controllers/semanaController.mjs';

const router = express.Router();

router
  .route('/')
  .get(semanaController.getAllSemana)
  .delete(semanaController.emptyPdfFoler);

router.route('/:id').get(semanaController.getSemana);

router.get('/weekPdfs/:id', semanaController.getWeekPdfs);

export default router;

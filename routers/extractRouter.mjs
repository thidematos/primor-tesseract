import express from 'express';
import upload from '../utils/multerUpload.mjs';
import * as pdfController from '../controllers/pdfController.mjs';
import * as semanaController from './../controllers/semanaController.mjs';
import * as ingredienteController from './../controllers/ingredienteController.mjs';

const router = express.Router();

router.post(
  '/extractPDF',
  upload.single('pdf'),
  pdfController.generatePDFPages,
  pdfController.sequelizePageContent,
  pdfController.createSegmentContent,
  semanaController.createSemana,
  ingredienteController.createIngredientes
);

export default router;

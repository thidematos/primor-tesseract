import express from 'express';
import upload from '../utils/multerUpload.mjs';
import * as pdfController from '../controllers/pdfController.mjs';
import * as semanaController from './../controllers/semanaController.mjs';
import * as ingredienteController from './../controllers/ingredienteController.mjs';
import * as produtoController from './../controllers/produtoController.mjs';

const router = express.Router();

router.post(
  '/extractPDF',
  upload.array('pdf', 2),
  pdfController.generatePDFPages,
  pdfController.sequelizePageContent,
  pdfController.createSegmentContent,
  semanaController.createSemana,
  ingredienteController.createIngredientes,
  produtoController.createProduto
);

export default router;

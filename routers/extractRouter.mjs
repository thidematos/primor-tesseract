import express from 'express';
import upload from '../utils/multerUpload.mjs';
import * as pdfController from '../controllers/pdfController.mjs';
import * as semanaController from './../controllers/semanaController.mjs';
import * as ingredienteController from './../controllers/ingredienteController.mjs';
import * as produtoController from './../controllers/produtoController.mjs';

const router = express.Router();

router.post(
  '/extractPDF',
  upload.fields([
    { name: 'pdf', maxCount: 2 },
    { name: 'price', maxCount: 2 },
  ]),
  pdfController.generatePrices,
  pdfController.generatePDFPages,
  pdfController.sequelizePageContent,
  pdfController.createSegmentContent,
  semanaController.createSemana,
  ingredienteController.createIngredientes,
  ingredienteController.verifyPrices,
  produtoController.createProduto
);

/*
router.post(
  '/teste',
  upload.fields([
    { name: 'pdf', maxCount: 2 },
    { name: 'price', maxCount: 2 },
  ]),
  pdfController.generatePrices
);
*/

export default router;

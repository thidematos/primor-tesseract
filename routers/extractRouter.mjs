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
  ingredienteController.verifyPrices,
  produtoController.createProduto
);
//Vou usar a mesma pipeline que já tenho. Vou adicionar uma flag na requisição que ditará se deverá usar a middleware de leitura do preços ou manual. Devo fazer o JSON.parse no req.body.prices logo no início, para que esteja disponível em todas as middlewares. Aí, não dará o erro de tentar dar parse num prices que já é um object.

router.post('/teste', upload.single('teste'), pdfController.testePrices);

export default router;

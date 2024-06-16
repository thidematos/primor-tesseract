import express from 'express';
import upload from './../utils/multerUpload.mjs';
import * as geminiController from './../controllers/geminiController.mjs';

const router = express.Router();

router.post(
  '/extractPDF',
  upload.single('pdf'),
  geminiController.countPDFPages,
  geminiController.createPagePNG,
  geminiController.extractPDF,
  geminiController.createProduto
);

export default router;

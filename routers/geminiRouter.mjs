import express from 'express';
import upload from './../utils/multerUpload.mjs';
import * as pdfController from '../controllers/pdfController.mjs';

const router = express.Router();

router.post(
  '/extractPDF',
  upload.single('pdf'),
  pdfController.generatePDFPages,
  pdfController.sequelizePageContent,
  pdfController.createSegmentContent
);

export default router;

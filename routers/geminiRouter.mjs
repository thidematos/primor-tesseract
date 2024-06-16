import express from 'express';
import upload from './../utils/multerUpload.mjs';
import * as geminiController from './../controllers/geminiControllerCopy.mjs';

const router = express.Router();

router.post(
  '/extractPDF',
  upload.single('pdf'),
  geminiController.countPDFPages
);

export default router;

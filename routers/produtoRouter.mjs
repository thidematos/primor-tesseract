import express from 'express';
import * as produtoController from './../controllers/produtoController.mjs';

const router = express.Router();

router.get('/', produtoController.getAllProdutos);

router.delete('/', produtoController.deleteAllThisShit);

export default router;

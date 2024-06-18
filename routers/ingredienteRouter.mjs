import express from 'express';
import * as ingredienteController from './../controllers/ingredienteController.mjs';

const router = express.Router();

router.get('/', ingredienteController.getAllIngredients);

router.get('/:id', ingredienteController.getIngredient);

export default router;

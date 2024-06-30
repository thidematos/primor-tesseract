import express from 'express';
import * as ingredienteController from './../controllers/ingredienteController.mjs';

const router = express.Router();

router.get('/', ingredienteController.getAllIngredients);

router
  .route('/:id')
  .get(ingredienteController.getIngredient)
  .patch(ingredienteController.patchIngredientPrice);

router.delete('/', ingredienteController.deleteAllFuckingIngredients);

export default router;

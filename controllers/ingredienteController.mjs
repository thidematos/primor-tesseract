import IngredientManager from '../managers/IngredientsManager.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import Ingrediente from './../models/ingredienteModel.mjs';

const createIngredientes = catchAsync(async (req, res, next) => {
  const filesData = req.segmentedPageContent;

  const ingredientManagerInstance = new IngredientManager(
    JSON.parse(req.body.precos),
    req.semanaId
  );

  await ingredientManagerInstance.createUsedList();

  filesData.forEach((file) => {
    file.forEach((product) => {
      product.macro?.forEach(async (macroInsumo) => {
        await ingredientManagerInstance.createInsumo(macroInsumo);
      });

      product.micro?.forEach(async (microInsumo) => {
        await ingredientManagerInstance.createInsumo(microInsumo);
      });

      product.outros?.forEach(async (outrosInsumo) => {
        await ingredientManagerInstance.createInsumo(outrosInsumo);
      });
    });
  });

  req.filesData = filesData;

  next();
});

const getAllIngredients = catchAsync(async (req, res, next) => {
  const ingredients = await Ingrediente.find();

  res.status(200).json({
    status: 'success',
    results: ingredients.length,
    data: {
      ingredients,
    },
  });
});

const getIngredient = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const ingredients = await Ingrediente.find({ idExterno: Number(id) });

  /*
  if (ingredients.length > 0) {
    ingredients.at(0).idExterno = Number(id) + 1;
    await ingredients.at(0).save();

    await Ingrediente.deleteMany({
      idExterno: Number(id),
    });

    ingredients.at(0).idExterno = Number(id);
    await ingredients.at(0).save();
  }

  const ingredients2 = await Ingrediente.find({ idExterno: Number(id) });
  */

  res.status(200).json({
    status: 'success',
    results: ingredients.length,
    data: {
      ingredients,
    },
  });
});

export { createIngredientes, getAllIngredients, getIngredient };

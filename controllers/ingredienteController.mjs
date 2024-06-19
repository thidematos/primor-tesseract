import IngredientManager from '../managers/IngredientsManager.mjs';
import Semana from '../models/semanaModel.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import Ingrediente from './../models/ingredienteModel.mjs';

const createIngredientes = catchAsync(async (req, res, next) => {
  const filesData = req.segmentedPageContent;

  const ingredientManagerInstance = new IngredientManager(
    JSON.parse(req.body.precos),
    req.semana._id,
    req.id
  );

  await ingredientManagerInstance.getAllIngredients();

  const filesDataPromises = filesData.map(async (file) => {
    const filePromises = file.map(async (product) => {
      const macroPromises = product.macro?.map(async (macroInsumo) => {
        await ingredientManagerInstance.choosePath(macroInsumo);
      });

      const microPromises = product.micro?.map(async (microInsumo) => {
        await ingredientManagerInstance.choosePath(microInsumo);
      });

      const outrosPromises = product.outros?.map(async (outrosInsumo) => {
        await ingredientManagerInstance.choosePath(outrosInsumo);
      });

      await Promise.all(macroPromises);
      await Promise.all(microPromises);
      await Promise.all(outrosPromises);
    });

    await Promise.all(filePromises);
  });

  await Promise.all(filesDataPromises);

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

const deleteAllFuckingIngredients = catchAsync(async (req, res, next) => {
  await Ingrediente.deleteMany({});

  res.status(204).json({
    status: 'success',
  });
});

const verifyPrices = catchAsync(async (req, res, next) => {
  const filesData = req.filesData;

  const precos = JSON.parse(req.body.precos);

  const ingredients = await Ingrediente.find({}).select(
    'idExterno nome precoSemana'
  );

  const ingredientsPromise = ingredients.map(async (insumo) => {
    if (String(insumo.precoSemana.at(-1).semana) !== String(req.semana._id)) {
      insumo.precoSemana.push({
        semana: String(req.semana._id),
        preco: precos.find((preco) => preco.idExterno === insumo.idExterno)
          .preco,
      });

      console.log('Atualizado: ', insumo.nome);

      await insumo.save({ j: true });
    }
  });

  await Promise.all(ingredientsPromise);

  res.status(200).json({
    status: 'success',
    data: {
      pdfData: filesData,
    },
  });
});

export {
  createIngredientes,
  getAllIngredients,
  getIngredient,
  deleteAllFuckingIngredients,
  verifyPrices,
};

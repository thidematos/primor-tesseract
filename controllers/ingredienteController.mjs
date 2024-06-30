import IngredientManager from '../managers/IngredientsManager.mjs';
import Produto from '../models/produtoModel.mjs';
import Semana from '../models/semanaModel.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import Ingrediente from './../models/ingredienteModel.mjs';
import { setWeeklyPricesOnProducts } from './produtoController.mjs';

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

const verifyPrices = catchAsync(async (req, res, next) => {
  const precos = JSON.parse(req.body.precos);

  const ingredients = await Ingrediente.find({}).select(
    'idExterno nome precoSemana'
  );

  const ingredientsPromise = ingredients.map(async (insumo) => {
    if (String(insumo.precoSemana.at(-1).semana) !== String(req.semana._id)) {
      const actualPrice = precos.find(
        (preco) => preco.idExterno === insumo.idExterno
      ).preco;
      const flag = parseFloat(actualPrice) ? false : true;
      insumo.precoSemana.push({
        semana: String(req.semana._id),
        preco: !flag ? actualPrice : 0,
        noPriceFlag: flag,
      });

      console.log('Atualizado: ', insumo.nome);

      await insumo.save({ j: true });
    }
  });

  await Promise.all(ingredientsPromise);

  next();
});

const getAllIngredients = catchAsync(async (req, res, next) => {
  const ingredients = await Ingrediente.find().populate('precoSemana.semana');

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

  const ingredient = await Ingrediente.findOne({ idExterno: Number(id) });

  res.status(200).json({
    status: 'success',

    data: {
      ingredient,
    },
  });
});

const patchIngredientPrice = catchAsync(async (req, res, next) => {
  //ESSA MUDANÇA AINDA NÃO REFLETE NO PREÇO COLOCADO NOS PRODUTOS! ACHO QUE VOU TIRAR O PREÇO DE LÁ E DEPENDER SÓ DO PREÇO DO INGREDIENTE. VAI SER FODA.
  const { id: idExterno } = req.params;

  const currentIngredient = await Ingrediente.findOne({
    idExterno: Number(idExterno),
  });

  currentIngredient.precoSemana = currentIngredient.precoSemana.map((el) => {
    if (String(el.semana) !== req.body.semanaId) return el;

    return {
      ...el,
      preco: req.body.newPrice,
    };
  });

  const newCurrentIngredient = await currentIngredient.save();
  await setWeeklyPricesOnProducts(true);

  res.status(200).json({
    status: 'success',
    data: {
      ingredient: newCurrentIngredient,
    },
  });
});

const deleteAllFuckingIngredients = catchAsync(async (req, res, next) => {
  await Ingrediente.deleteMany({});

  res.status(204).json({
    status: 'success',
  });
});

export {
  createIngredientes,
  getAllIngredients,
  getIngredient,
  deleteAllFuckingIngredients,
  verifyPrices,
  patchIngredientPrice,
};

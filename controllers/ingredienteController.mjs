import catchAsync from '../utils/catchAsync.mjs';
import Ingrediente from './../models/ingredienteModel.mjs';

const createIngredientes = catchAsync(async (req, res, next) => {
  const segmentedPageContent = req.segmentedPageContent;

  const ingredients = await Ingrediente.find().select('idExterno');
  const usedID = ingredients.map((ingredient) => ingredient.idExterno);

  segmentedPageContent.forEach((segment) => {
    segment.macro?.forEach(async (macro) => {
      const id = Number.parseInt(macro.id);

      if (!usedID.includes(id)) {
        console.log('Novo macro: ', macro.nome);
        usedID.push(id);
        await Ingrediente.create({
          idExterno: id,
          nome: macro.nome,
        });
      }
    });

    segment.micro?.forEach(async (micro) => {
      const id = Number.parseInt(micro.id);
      if (!usedID.includes(id)) {
        console.log('Novo micro: ', micro.nome);
        usedID.push(id);
        await Ingrediente.create({
          idExterno: id,
          nome: micro.nome,
        });
      }
    });

    segment.outros?.forEach(async (outros) => {
      const id = Number.parseInt(outros.id);
      if (!usedID.includes(id)) {
        console.log('Novo outro: ', outros.nome);
        usedID.push(id);
        await Ingrediente.create({
          idExterno: id,
          nome: outros.nome,
        });
      }
    });
  });

  res.status(200).json({
    status: 'success',
    data: {
      pdfData: segmentedPageContent,
    },
  });
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

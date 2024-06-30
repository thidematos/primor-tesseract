import ProdutoManager from '../managers/ProdutoManager.mjs';
import Ingrediente from '../models/ingredienteModel.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import Produto from './../models/produtoModel.mjs';

const createProduto = catchAsync(async (req, res, next) => {
  const productManager = new ProdutoManager(req.semana._id);

  const filesData = req.filesData;

  const filesDataPromises = filesData.map(async (file) => {
    const filePromises = file.map(async (product) => {
      const exists = await productManager.alreadyExists(
        Number.parseInt(product.produto.id)
      );

      if (!exists) return await productManager.addWeeklyReport(product);

      await productManager.createProduto(product);
    });

    await Promise.all(filePromises);
  });

  await Promise.all(filesDataPromises);

  await setWeeklyPricesOnProducts(false);

  res.status(200).json({
    status: 'success',
    data: {
      pdfData: filesData,
    },
  });
});

const setWeeklyPricesOnProducts = async (isUpdate) => {
  const ingredients = await Ingrediente.find();
  const products = await Produto.find();

  products.forEach((product) => {
    let sum = 0;
    const actualIngredients = product.ingredientesSemanais.at(-1);
    if (actualIngredients.macro.length > 0) {
      actualIngredients.macro.forEach((macroInsumo) => {
        sum +=
          macroInsumo.qtdBatidaMil *
          ingredients
            .find((el) => String(el._id) === String(macroInsumo.insumo))
            .precoSemana.find(
              (el) => String(el.semana) === String(actualIngredients.semana)
            ).preco;
      });
    }

    if (actualIngredients.micro.length > 0) {
      actualIngredients.micro.forEach((microInsumo) => {
        sum +=
          microInsumo.qtdBatidaMil *
          ingredients
            .find((el) => String(el._id) === String(microInsumo.insumo))
            .precoSemana.find(
              (el) => String(el.semana) === String(actualIngredients.semana)
            ).preco;
      });
    }

    if (actualIngredients.outros.length > 0) {
      actualIngredients.outros.forEach((outrosInsumo) => {
        sum +=
          outrosInsumo.qtdBatidaMil *
          ingredients
            .find((el) => String(el._id) === String(outrosInsumo.insumo))
            .precoSemana.find(
              (el) => String(el.semana) === String(actualIngredients.semana)
            ).preco;
      });
    }

    if (isUpdate) {
      console.log('is Update!');
      product.precosTotalSemanal = product.precosTotalSemanal.map(
        (el, ind, arr) => {
          if (arr.length - 1 !== ind) return el;

          return {
            semana: actualIngredients.semana,
            precoTotal: sum,
          };
        }
      );
    } else {
      console.log('is Not update :(');
      product.precosTotalSemanal.push({
        semana: actualIngredients.semana,
        precoTotal: sum,
      });
    }
  });

  await Produto.bulkSave(products);
};

const getAllProdutos = catchAsync(async (req, res, next) => {
  const produtos = await Produto.find().select('-_id');

  res.status(200).json({
    status: 'success',
    results: produtos.length,
    data: {
      produtos,
    },
  });
});

const deleteAllThisShit = catchAsync(async (req, res, next) => {
  await Produto.deleteMany({});

  res.status(204).json({
    status: `success`,
  });
});

export {
  createProduto,
  getAllProdutos,
  deleteAllThisShit,
  setWeeklyPricesOnProducts,
};

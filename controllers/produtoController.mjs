import ProdutoManager from '../managers/ProdutoManager.mjs';
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

  next();
});

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

export { createProduto, getAllProdutos, deleteAllThisShit };

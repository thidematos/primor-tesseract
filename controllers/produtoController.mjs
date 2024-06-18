import catchAsync from '../utils/catchAsync.mjs';
import Produto from './../models/produtoModel.mjs';

const createProduto = catchAsync(async (req, res, next) => {
  req.filesData.forEach((file) => {
    file.forEach((product) => {});
  });

  res.status(200).json({
    status: 'success',
    data: {
      pdfData: filesData,
      prices: JSON.parse(req.body.precos),
    },
  });
});

export { createProduto };

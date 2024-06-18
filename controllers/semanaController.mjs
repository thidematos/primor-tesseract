import Semana from '../models/semanaModel.mjs';
import AppError from '../utils/appError.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import fs from 'fs';

const createSemana = catchAsync(async (req, res, next) => {
  const pdfName = `report-semanal-${Date.now()}.pdf`;
  fs.writeFile(`./pdf/${pdfName}`, req.file.buffer, (err) => {
    if (err) next(new AppError('There was a error in the PDF writing.'));
  });

  const newSemana = await Semana.create({
    intervalo: {
      inicio: req.body.inicio,
      fim: req.body.fim,
    },
    pdf: pdfName,
  });

  next();
});

const getAllSemana = catchAsync(async (req, res, next) => {
  const semanas = await Semana.find({});

  res.status(200).json({
    status: 'success',
    data: {
      semana: semanas,
    },
  });
});

const emptyPdfFoler = catchAsync(async (req, res, next) => {
  const semanas = await Semana.find();

  semanas.forEach(async (semana) => {
    await Semana.findByIdAndDelete(semana._id);
    fs.unlinkSync(`./pdf/${semana.pdf}`);
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export { createSemana, getAllSemana, emptyPdfFoler };

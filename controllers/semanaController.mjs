import Semana from '../models/semanaModel.mjs';
import AppError from '../utils/appError.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import fs from 'fs';

const createSemana = catchAsync(async (req, res, next) => {
  const pdfNames = [];

  req.segmentedPageContent.forEach((file, ind) => {
    const pdfName = `report-semanal-${Date.now()}-${ind + 1}.pdf`;

    fs.writeFileSync(`./pdf/${pdfName}`, req.files[ind].buffer, (err) => {
      if (err) next(new AppError('There was a error in the PDF writing.'));
    });

    pdfNames.push(pdfName);
  });

  const week = JSON.parse(req.body.week);

  const newSemana = await Semana.create({
    intervalo: {
      inicio: week.start,
      fim: week.end,
    },
    pdf: pdfNames,
  });

  req.semana = newSemana;

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

const getSemana = catchAsync(async (req, res, next) => {
  const semana = await Semana.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      semana,
    },
  });
});

const getWeekPdfs = catchAsync(async (req, res, next) => {
  //Need some work on.
  const week = await Semana.findById(req.params.id);

  const pdf = req.query.pdf;

  res.download(`./pdf/${week.pdf[Number(pdf) - 1]}`);
});

const emptyPdfFoler = catchAsync(async (req, res, next) => {
  const semanas = await Semana.find();

  semanas.forEach(async (semana) => {
    await Semana.findByIdAndDelete(semana._id);
    semana.pdf.forEach((pdf) => {
      fs.unlinkSync(`./pdf/${pdf}`);
    });
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export { createSemana, getAllSemana, emptyPdfFoler, getSemana, getWeekPdfs };

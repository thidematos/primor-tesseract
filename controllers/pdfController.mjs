import { PDFManager } from '../managers/PDFManager.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import * as mupdf from 'mupdf';

const generatePDFPages = catchAsync(async (req, res, next) => {
  const extractedPagesContent = [];

  req.files.forEach((file) => {
    const doc = mupdf.Document.openDocument(file.buffer, 'application/pdf');
    const count = doc.countPages();

    const arr = Array.from({ length: count });

    const startContentIndex = 14;

    extractedPagesContent.push(
      arr.map((_, ind) => {
        const page = doc.loadPage(ind);

        const json = JSON.parse(page.toStructuredText().asJSON());

        return {
          data: json.blocks
            .slice(startContentIndex, -1)
            .map((block) => block.lines)
            .map((item) => {
              return item.map((itemNested) => itemNested.text);
            }),
        };
      })
    );
  });

  req.extractedPagesContent = extractedPagesContent;

  next();
});

const sequelizePageContent = (req, res, next) => {
  //Cada page tem uma array de arrays que contem a data de cada linha.
  const instanceManager = new PDFManager();
  const mappedExtractedContent = [];

  req.extractedPagesContent.forEach((file) => {
    mappedExtractedContent.push(
      file.map((page) => instanceManager.sequelizeSegment(page))
    );
  });

  req.extractedPagesContent = mappedExtractedContent;

  next();
};

const createSegmentContent = (req, res, next) => {
  const instanceManager = new PDFManager(
    JSON.parse(req.body.precos),
    //req.body.precos,
    JSON.parse(req.body.week)
  );

  const segmentedPageContent = [];

  req.extractedPagesContent.forEach((file) => {
    segmentedPageContent.push(
      file.map((page) => {
        const pageMacro = instanceManager.createSegment(page, 'macro');

        const pageMicro = instanceManager.createSegment(page, 'micro');

        const pageOutros = instanceManager.createSegment(page, 'outros');

        return {
          macro: pageMacro,
          micro: pageMicro,
          outros: pageOutros,
          produto: page.produto,
        };
      })
    );
  });

  req.segmentedPageContent = segmentedPageContent;

  next();
};

const testePrices = async (req, res, next) => {
  const doc = mupdf.Document.openDocument(req.file.buffer, 'application/pdf');
  const count = doc.countPages();

  const arr = Array.from({ length: count });

  const extractedPagesContent = arr.map((_, ind) => {
    const page = doc.loadPage(ind);

    const json = JSON.parse(page.toStructuredText().asJSON());

    return {
      data: json.blocks
        .slice(14)
        .map((el) => {
          return {
            lines: el.lines,
          };
        })
        .filter((el) => el.lines.length === 8)
        .map((el) => {
          return {
            idExterno: el.lines.at(0).text,
            price: el.lines.at(1).text,
          };
        }),
    };
  });

  const rawPrices = [
    ...extractedPagesContent.at(0).data,
    ...extractedPagesContent.at(1).data,
  ];

  const prices = rawPrices.map((el) => {
    return {
      idExterno: parseInt(el.idExterno),
      price: parseFloat(el.price.replace('.', '').replace(',', '.')),
    };
  });

  req.body.precos = prices;

  res.status(200).json({
    status: 'succes',
    data: {
      mappedData,
    },
  });
};

export {
  generatePDFPages,
  sequelizePageContent,
  createSegmentContent,
  testePrices,
};

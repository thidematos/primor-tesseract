import { PDFManager } from '../utils/PdfManager.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import * as mupdf from 'mupdf';

const generatePDFPages = catchAsync(async (req, res, next) => {
  const doc = mupdf.Document.openDocument(req.file.buffer, 'application/pdf');
  const count = doc.countPages();

  const arr = Array.from({ length: count });

  const startContentIndex = 14;

  const extractedPagesContent = arr.map((_, ind) => {
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
  });

  req.extractedPagesContent = extractedPagesContent;

  next();
});

const sequelizePageContent = (req, res, next) => {
  //Cada page tem uma array de arrays que contem a data de cada linha.
  const instanceManager = new PDFManager();

  const mappedExtractedContent = req.extractedPagesContent.map((page) =>
    instanceManager.sequelizeSegment(page)
  );

  req.extractedPagesContent = mappedExtractedContent;

  next();
};

const createSegmentContent = (req, res, next) => {
  const instanceManager = new PDFManager();

  const segmentedPageContent = req.extractedPagesContent.map((page) => {
    const pageMacro = instanceManager.createSegment(page, 'macro');

    const pageMicro = instanceManager.createSegment(page, 'micro');

    const pageOutros = instanceManager.createSegment(page, 'outros');

    return {
      macro: pageMacro,
      micro: pageMicro,
      outros: pageOutros,
      produto: page.produto,
    };
  });

  res.status(200).json({
    status: 'success',
    data: {
      pdfData: segmentedPageContent,
    },
  });
};

export { generatePDFPages, sequelizePageContent, createSegmentContent };

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

export { generatePDFPages, sequelizePageContent, createSegmentContent };

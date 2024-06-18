import catchAsync from '../utils/catchAsync.mjs';
import * as mupdf from 'mupdf';

const countPDFPages = catchAsync(async (req, res, next) => {
  const doc = mupdf.Document.openDocument(req.file.buffer, 'application/pdf');
  const count = doc.countPages();

  const arr = Array.from({ length: count });

  const extractedPagesContent = arr.map((_, ind) => {
    const page = doc.loadPage(ind);

    const json = JSON.parse(page.toStructuredText().asJSON());

    return {
      data: json.blocks
        .slice(14, -1)
        .map((block) => block.lines)
        .map((item) => {
          return item.map((itemNested) => itemNested.text);
        }),
    };
  });

  req.extractedPagesContent = extractedPagesContent;

  next();
});

const produtoIndex = {
  nome: 0,
  id: 2,
};

const sequelizePageContent = (req, res, next) => {
  //Cada page tem uma array de arrays que contem a data de cada linha.

  const mappedExtractedContent = req.extractedPagesContent.map((page) => {
    const contains = {
      macro: page.data.findIndex((arr) => arr.includes('MACRO INGREDIENTES')),
      micro: page.data.findIndex((arr) => arr.includes('MICRO INGREDIENTES')),
      outros: page.data.findIndex((arr) => arr.includes('OUTROS')),
    };

    const pageContent = {
      produto: [],
      macro: [],
      micro: [],
      outros: [],
    };

    pageContent.produto = {
      nome: page.data.at(produtoIndex.nome).at(0),
      id: page.data.at(produtoIndex.id).at(0),
      batida: Number.parseFloat(
        page.data.at(0).at(3).replace('.', '').replace(',', '.')
      ),
    };

    if (contains.macro !== -1) {
      pageContent.macro = page.data.slice(
        contains.macro + 1,
        contains.micro === -1
          ? contains.outros === -1
            ? undefined
            : contains.outros
          : contains.micro
      );
    }

    if (contains.micro !== -1) {
      pageContent.micro = page.data.slice(
        contains.micro + 1,
        contains.outros === -1 ? undefined : contains.outros
      );
    }

    if (contains.outros !== -1) {
      pageContent.outros = page.data.slice(contains.outros + 1);
    }

    return pageContent;
  });

  req.extractedPagesContent = mappedExtractedContent;

  next();
};

const createSegmentContent = (req, res, next) => {
  const segmentedPageContent = req.extractedPagesContent.map((page) => {
    const pageMacro = page.macro.map((macro) => {
      return {
        id: macro[1],
        nome: macro[2],
        qtd:
          Number.parseFloat(macro[3]?.replace('.', '').replace(',', '.')) ||
          '-',
      };
    });

    const pageMicro = page.micro.map((micro) => {
      return {
        id: micro[1],
        nome: micro[2],
        qtd:
          Number.parseFloat(micro[3]?.replace('.', '').replace(',', '.')) ||
          '-',
      };
    });

    const pageOutros = page.outros.map((outros) => {
      return {
        id: outros[1],
        nome: outros[2],
        qtd:
          Number.parseFloat(outros[3]?.replace('.', '').replace(',', '.')) ||
          '-',
      };
    });

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

export { countPDFPages, sequelizePageContent, createSegmentContent };

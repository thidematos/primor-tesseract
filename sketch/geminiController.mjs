import catchAsync from '../utils/catchAsync.mjs';
import * as mupdf from 'mupdf';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { OutputManager } from '../utils/OutputManager.mjs';

const prompt =
  'Faça o OCR e extraia os dados dessa imagem. Os seguintes dados serão extraídos: 1)Produto. É uma informação única. Um produto possui um id e um nome, situado no início da imagem. Exemplo: 02004   MP-05 POSTURA INTENSIVA 17% F. 2) MACRO INGREDIENTES. Podem haver múltiplos Macro ingredientes. Cada macro ingrediente possui ID, NOME e QUANTIDADE(KG). Nesse quadro, as informações virão nessas ordem: ID -> NOME -> QUANTIDADE. Exemplo: 000001  MILHO  987,000. 3) MICRO INGREDIENTES. Podem haver múltiplos Micro ingredientes. Cada micro ingrediente possui ID, NOME e QUANTIDADE(KG). Nesse quadro, as informações virão nessas ordem: ID -> NOME -> QUANTIDADE. Exemplo: 000141  SAL  7,500. O produto L-Lisina da categoria MICRO INGREDIENTES não possui valor de quantidade. 4) OUTROS. Podem haver múltiplos outros. Este dado pode ou não estar presente. Se não houver, apenas omita o item 4) do output. Cada outro possui ID, NOME e uma QUANTIDADE(KG). Nesse quadro, as informações virão nessas ordem: ID -> NOME -> QUANTIDADE. Exemplo: 0000131  MELAÇO  100,000. Não omita nenhum dado. Não altere a ordem de nenhum dado. O Output deve ser como o seguinte exemplo: 1)id:02004|nome:MP-05 POSTURA INTENSIVA 17% F|2)id:000001|nome:MILHO|quantidade:987,000|id:00031|nome:FARELO DE TRIGO|quantidade:400,000|3)id:00257|nome:PX 05 POSTURA PRODUÇAO|quantidade:8,000|id:00141|nome:SAL|quantidade:7,000|4)id:00131|nome:MELACO|quantidade:30,000|1)id:02105|nome:CMP 105 - CONC AVES POSTURA|2)id:00013|nome:FARELO DE SOJA 46%|quantidade:564,000|id:00049|nome:CALCÁRIO MOIDO 38%|quantidade:366,000|id:00031|nome:FARELO DE TRIGO|quantidade:361,000|id:00102|nome:FARINHA DE CARNE 42%|quantidade:343,000|id:00115|nome:FARINHA DE PENAS|quantidade:200,000|id:00192|nome:DDGS 40 ALTA PROTEINA|quantidade:120,000|3)id:00257|nome:PX 05 POSTURA PRODUCAO|quantidade:28,000|id:00141|nome:SAL|quantidade:17,000|id:00162|nome:DL-METIONINA|quantidade:1,000|id:00161|nome:L-LISINA|quantidade:-|';

const countPDFPages = catchAsync(async (req, res, next) => {
  const doc = mupdf.Document.openDocument(req.file.buffer, 'application/pdf');
  const count = doc.countPages();

  req.doc = doc;
  req.totalPages = Array.from({ length: count });
  next();
});

const extractedPageData = catchAsync(async (req, res, next) => {
  const pagesPromises = req.totalPages.map(async (_, ind) => {
    const pagePNG = createPagePNG(req.doc, ind);
    const output = await extractPDF(pagePNG);
    const { produto, macro, micro, outros } = createProduto(output);

    return {
      produto,
      macro,
      micro,
      outros,
    };
  });

  const pdfPagesData = await Promise.all(pagesPromises);

  res.status(200).json({
    status: 'success',
    data: {
      pdfData: pdfPagesData,
    },
  });
});

const createPagePNG = (doc, currentPage) => {
  const page = doc.loadPage(currentPage);

  //const json = page.toStructuredText().asJSON();
  //res.outputJSON = json;

  const pixmap = page.toPixmap(
    mupdf.Matrix.identity,
    mupdf.ColorSpace.DeviceRGB,
    false,
    false
  );

  const pagePNG = pixmap.asPNG();

  return pagePNG;
};

const extractPDF = async (pagePNG) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  const image = {
    inlineData: {
      data: Buffer.from(pagePNG).toString('base64'),
      mimeType: 'image/png',
    },
  };

  const result = await model.generateContent([prompt, image]);
  const text = await result.response.text();

  console.log(text);

  return text;
};

const createProduto = (output) => {
  const outputManager = new OutputManager(output);

  const { produto, macro, micro, outros } = outputManager
    .getProduto()
    .getMacro()
    .getMicro()
    .getOutros();

  return {
    produto,
    macro,
    micro,
    outros,
  };
};

export { extractedPageData, countPDFPages };

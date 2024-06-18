class PDFManager {
  produtoIndex = {
    nome: 0,
    id: 2,
    batida: [0, 3],
  };

  constructor(prices, week) {
    this.prices = prices;
    this.week = week;
  }

  findSegmentIndex(arr, segmentStr) {
    return arr.findIndex((arr) => arr.includes(segmentStr));
  }

  createSegment(page, segmentStr) {
    const segment = page[segmentStr].map((el) => {
      return {
        id: el[1],
        nome: el[2],
        qtd:
          Number.parseFloat(el[3]?.replace('.', '').replace(',', '.')) || '-',
        price:
          this.prices.find(
            (ingredient) =>
              Number.parseInt(el[1]) === Number.parseInt(ingredient.idExterno)
          )?.preco || '0',
      };
    });

    return segment;
  }

  sequelizeSegment(page) {
    const contains = {
      macro: this.findSegmentIndex(page.data, 'MACRO INGREDIENTES'),
      micro: this.findSegmentIndex(page.data, 'MICRO INGREDIENTES'),
      outros: this.findSegmentIndex(page.data, 'OUTROS'),
    };

    const pageContent = {
      produto: [],
      macro: [],
      micro: [],
      outros: [],
    };

    pageContent.produto = {
      nome: page.data.at(this.produtoIndex.nome).at(0),
      //IF the content does not have extrusada/triturada line, look at the first line.
      id: page.data
        .at(page.data.at(0).length > 4 ? 0 : this.produtoIndex.id)
        .at(page.data.at(0).length > 4 ? 4 : 0),
      batida: Number.parseFloat(
        page.data
          .at(this.produtoIndex.batida[0])
          .at(this.produtoIndex.batida[1])
          .replace('.', '')
          .replace(',', '.')
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
  }
}

export { PDFManager };

class OutputManager {
  constructor(output) {
    this.output = output;
    this.indexes = {
      produto: output.indexOf('1)'),
      macro: output.indexOf('2)'),
      micro: output.indexOf('3)'),
      outros: output.indexOf('4)'),
    };

    console.log(output);
  }

  getProduto() {
    const produtoStrSplited = this.output
      .slice(this.indexes.produto, this.indexes.macro)
      .replace('1)', '')
      .split('|');

    this.produto = {
      id: produtoStrSplited[
        produtoStrSplited.findIndex((el) => el.includes('id:'))
      ]?.replace('id:', ''),
      nome: produtoStrSplited[
        produtoStrSplited.findIndex((el) => el.includes('nome:'))
      ]?.replace('nome:', ''),
    };

    this.getMacro();

    return this.produto;
  }

  getMacro() {
    const macroStrSplited = this.output
      .slice(this.indexes.macro, this.indexes.micro)
      .replace('2)', '')
      .split('|');

    console.log(macroStrSplited);
  }
}

/*
const macro = output
  .slice(indexes.macro, indexes.micro)
  .replace('2)', '')
  .split('|');

const micro = output.slice(
  indexes.micro,
  indexes.outros === -1 ? undefined : indexes.outros
);

const outros = indexes.outros === -1 ? null : output.slice(indexes.outros);
*/

export { OutputManager };

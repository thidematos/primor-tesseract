class OutputManager {
  constructor(output) {
    this.output = output;
    this.indexes = {
      produto: output.indexOf('1)'),
      macro: output.indexOf('2)'),
      micro: output.indexOf('3)'),
      outros: output.indexOf('4)'),
    };
  }

  #sliceAndSplit(replaceSimbol, area, nextArea) {
    const str = this.output
      .slice(
        this.indexes[area],
        nextArea === 'outros' && this.indexes.outros === -1
          ? undefined
          : this.indexes[nextArea]
      )
      .replace(replaceSimbol, '')
      .split('|');

    return str;
  }

  #split(string) {
    const str = string.split(':').at(-1);

    return str;
  }

  #filterAndCreateObject(arrayOriginal) {
    const ids = arrayOriginal.filter((el) => el.startsWith('id'));

    return ids.map((id) => {
      const index = arrayOriginal.findIndex((el) => el === id);
      return {
        id: this.#split(id),
        produto: this.#split(arrayOriginal[index + 1]),
        qtd: Number.parseFloat(
          this.#split(arrayOriginal[index + 2])
            .replace('.', '')
            .replace(',', '.')
        ),
      };
    });
  }

  getProduto() {
    const produtoStrSplited = this.#sliceAndSplit('1)', 'produto', 'macro');

    this.produto = {
      id: produtoStrSplited[
        produtoStrSplited.findIndex((el) => el.includes('id:'))
      ].replace('id:', ''),
      nome: produtoStrSplited[
        produtoStrSplited.findIndex((el) => el.includes('nome:'))
      ].replace('nome:', ''),
    };

    return this;
  }

  getMacro() {
    const macroOriginal = this.#sliceAndSplit('2)', 'macro', 'micro');

    if (!macroOriginal) {
      this.macro = [];
      return this;
    }

    const macro = this.#filterAndCreateObject(macroOriginal);

    this.macro = macro;

    return this;
  }

  getMicro() {
    const microOriginal = this.#sliceAndSplit('3)', 'micro', 'outros');

    if (!microOriginal) {
      this.micro = [];
      return this;
    }

    const micro = this.#filterAndCreateObject(microOriginal);

    this.micro = micro;

    return this;
  }

  getOutros() {
    const outrosOriginal =
      this.indexes.outros === -1
        ? null
        : this.output.slice(this.indexes.outros).split('|');

    if (!outrosOriginal) {
      this.outros = [];
      return this;
    }

    const outros = this.#filterAndCreateObject(outrosOriginal);

    this.outros = outros;

    return this;
  }
}

export { OutputManager };

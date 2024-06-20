import Ingrediente from '../models/ingredienteModel.mjs';
import Produto from '../models/produtoModel.mjs';

class ProdutoManager {
  blacklisted = {
    id: 110,
    nome: 'Farinha de sangue',
    motivo: 'Duplicado',
    moveToId: 114,
  };

  constructor(semana) {
    this.semana = semana;
  }

  async alreadyExists(id) {
    const produto = await Produto.findOne({ idExterno: id });

    if (!produto) return true;

    return false;
  }

  async getAllIngredientes() {
    const ingredients = await Ingrediente.find();

    return ingredients;
  }

  async addWeeklyReport(produto) {
    try {
      const allIngredients = await this.getAllIngredientes();

      const currentProduto = await Produto.findOne({
        idExterno: Number.parseInt(produto.produto.id),
      });

      currentProduto.ingredientesSemanais.push({
        semana: this.semana,
        macro: this.getIngredientes(
          produto.macro,
          allIngredients,
          produto.produto.batida
        ),
        micro: this.getIngredientes(
          produto.micro,
          allIngredients,
          produto.produto.batida
        ),
        outros: this.getIngredientes(
          produto.outros,
          allIngredients,
          produto.produto.batida
        ),
      });

      console.log('Quero ver: productManager addWeeklyReport');
      await currentProduto.save();
    } catch (err) {
      console.log(err);
    }
  }

  async createProduto(produto) {
    try {
      //Tenho acesso à semana ID pelo this.semana
      const allIngredients = await this.getAllIngredientes();
      console.log('Náo quero ver: createProduto');
      const newProduto = await Produto.create({
        nome: produto.produto.nome,
        idExterno: Number.parseInt(produto.produto.id),
        ingredientesSemanais: [
          {
            semana: this.semana,
            macro: this.getIngredientes(
              produto.macro,
              allIngredients,
              produto.produto.batida
            ),
            micro: this.getIngredientes(
              produto.micro,
              allIngredients,
              produto.produto.batida
            ),
            outros: this.getIngredientes(
              produto.outros,
              allIngredients,
              produto.produto.batida
            ),
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }

  #calculateWeightProportion(batida, qtdBase) {
    const proportion = 1000 / batida;
    const proportionalWeight = proportion * qtdBase;

    return proportionalWeight;
  }

  getIngredientes(segment, allIngredients, batida) {
    const insumosArr = segment.map((ingredient) => {
      const numberId = Number.parseInt(ingredient.id);
      const id =
        numberId === this.blacklisted.id ? this.blacklisted.moveToId : numberId;

      const foundIngredient = allIngredients.find(
        (insumo) => insumo.idExterno === id
      );

      console.log('Hey! Found ingredient: ', foundIngredient);

      console.log(
        'Hey! Current week: ',
        foundIngredient.precoSemana.find(
          (el) => String(el.semana) === String(this.semana)
        ).preco
      );

      return {
        insumo: foundIngredient._id,
        weeklyPreco: foundIngredient.precoSemana.find(
          (el) => String(el.semana) === String(this.semana)
        ).preco,
        quantidade: ingredient.qtd,
        qtdBatidaMil: this.#calculateWeightProportion(batida, ingredient.qtd),
      };
    });

    return insumosArr;
  }
}

export default ProdutoManager;

import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  idExterno: {
    type: Number,
    unique: true,
    required: true,
  },
  precosTotalSemanal: [
    {
      semana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semana',
      },
      precoTotal: Number,
    },
  ],
  ingredientesSemanais: [
    {
      semana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semana',
      },
      macro: [
        {
          insumo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingrendiente',
          },
          weeklyPreco: Number,
          quantidade: Number,
          qtdBatidaMil: Number,
        },
      ],
      micro: [
        {
          insumo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingrendiente',
          },
          weeklyPreco: Number,
          quantidade: Number,
          qtdBatidaMil: Number,
        },
      ],
      outros: [
        {
          insumo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingrendiente',
          },
          weeklyPreco: Number,
          quantidade: Number,
          qtdBatidaMil: Number,
        },
      ],
    },
  ],
});

produtoSchema.pre('save', function (next) {
  //pre save middleware
  let sum = 0;
  const actualIngredients = this.ingredientesSemanais.at(-1);
  if (actualIngredients.macro.length > 0) {
    actualIngredients.macro.forEach((macroInsumo) => {
      sum += macroInsumo.qtdBatidaMil * macroInsumo.weeklyPreco;
    });
  }

  if (actualIngredients.micro.length > 0) {
    actualIngredients.micro.forEach((microInsumo) => {
      sum += microInsumo.qtdBatidaMil * microInsumo.weeklyPreco;
    });
  }

  if (actualIngredients.outros.length > 0) {
    actualIngredients.outros.forEach((outrosInsumo) => {
      sum += outrosInsumo.qtdBatidaMil * outrosInsumo.weeklyPreco;
    });
  }

  console.log(sum);

  this.precosTotalSemanal.push({
    semana: actualIngredients.semana,
    precoTotal: sum,
  });

  next();
});

produtoSchema.pre(/^find/, function (next) {
  //Pre find middleware
  next();
});

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;

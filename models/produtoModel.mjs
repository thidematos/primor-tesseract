import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  idExterno: {
    type: String,
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
      macro: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingrendiente',
      },
      micro: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingrendiente',
      },
      outros: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingrendiente',
      },
    },
  ],
});

produtoSchema.pre('save', function (next) {
  //pre save middleware
  next();
});

produtoSchema.pre(/^find/, function (next) {
  //Pre find middleware
  next();
});

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;

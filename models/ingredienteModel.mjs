import mongoose from 'mongoose';

const ingredienteSchema = new mongoose.Schema({
  nome: String,
  idExterno: Number,
  quantidadeSemana: [
    {
      quantidadeTotal: Number,
      semana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semana',
      },
      quantidadeProduto: [
        {
          produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto',
          },
          quantidade: Number,
        },
      ],
    },
  ],
  precoSemana: [
    {
      semana: {
        inicio: Date,
        fim: Date,
      },
      preco: Number,
    },
  ],
});

const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);

export default Ingrediente;

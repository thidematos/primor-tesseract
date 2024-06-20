import mongoose from 'mongoose';

const semanaSchema = new mongoose.Schema({
  intervalo: {
    inicio: Date,
    fim: Date,
  },
  pdf: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Semana = mongoose.model('Semana', semanaSchema);

export default Semana;

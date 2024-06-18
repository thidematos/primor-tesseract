import mongoose from 'mongoose';

const semanaSchema = new mongoose.Schema({
  intervalo: {
    inicio: Date,
    fim: Date,
  },
  pdf: [String],
});

const Semana = mongoose.model('Semana', semanaSchema);

export default Semana;

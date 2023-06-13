import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    id: { type: 'string'},
    name: { type: 'string', required: [true, 'O Campo do(a) autor(a) é obrigatório']},
    nationality: { type: 'string'}
  },
  {
    versionKey: false
  }
);

const authors = mongoose.model('authors',authorSchema);

export default authors;
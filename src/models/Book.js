import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    id: { type: 'string'},
    title: { type: 'string', required: [true, 'O campo Titulo do livro é obrigatório']},
    author: { type: mongoose.Schema.Types.ObjectId, ref:'authors', required: [true, 'Autor(a) é obrigatório ']},
    publish: { type: 'string', required: [true, 'Editora obrigatória']},
    numberOfPages: { type: Number}
  }
);

const books = mongoose.model('books',bookSchema);

export default books;
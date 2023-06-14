import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    id: { type: 'string'},
    title: { type: 'string', required: [true, 'O campo Titulo do livro é obrigatório']},
    author: { type: mongoose.Schema.Types.ObjectId, ref:'authors', required: [true, 'Autor(a) é obrigatório ']},
    publish: { type: 'string', required: [true, 'Editora obrigatória']},
    numberOfPages: { type: Number, min: [1, 'O livro deve ter no mínimo 1 página'], max: [5000, 'O livro deve ter no máximo 5000 páginas']}
  }
);

const books = mongoose.model('books',bookSchema);

export default books;
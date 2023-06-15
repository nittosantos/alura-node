import express from 'express';
import BookController from '../controllers/booksController.js';
import paginate from '../middlewares/paginate.js';

const router = express.Router();

router
  .get('/livros', BookController.getAllBooks, paginate)
  .get('/livros/busca', BookController.getBookByFilter, paginate)
  .get('/livros/:id', BookController.getBookById)
  .post('/livros', BookController.registerBook)
  .put('/livros/:id', BookController.updateBook)
  .delete('/livros/:id', BookController.deleteBook);

export default router;
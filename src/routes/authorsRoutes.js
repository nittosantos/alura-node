import express from 'express';
import AuthorController from '../controllers/authorsControllers.js';
import paginate from '../middlewares/paginate.js';

const router = express.Router();

router
  .get('/autores', AuthorController.getAllAuthors, paginate)
  .get('/autores/:id', AuthorController.getAuthorById)
  .post('/autores', AuthorController.registerAuthor)
  .put('/autores/:id', AuthorController.updateAuthor)
  .delete('/autores/:id', AuthorController.deleteAuthor);

export default router;
import express from "express";
import BookController from "../controllers/booksController.js";

const router = express.Router();

router
  .get('/livros', BookController.getAllBooks)
  .get('/livros/busca', BookController.getBookByPublish)
  .get('/livros/:id', BookController.getBookById)
  .post('/livros', BookController.registerBook)
  .put('/livros/:id', BookController.updateBook)
  .delete('/livros/:id', BookController.deleteBook)

export default router
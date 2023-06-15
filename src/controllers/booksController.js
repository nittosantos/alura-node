import NotFound from '../error/NotFound.js';
import { authors, books } from '../models/index.js';

class BookController {

  static getAllBooks = async (req, res, next) => {
    try {
      const searchBooks = books.find();
      req.result = searchBooks;

      next();
    } catch (err) {
      next(err);
    }
  };

  static getBookById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await books
        .findById(id)
        .populate('author', 'name')
        .exec();

      if (result) {
        res.status(200).json(result);
      } else {
        next(new NotFound('Id do livro não localizado'));
      }
    } catch (err) {
      next(err);
    }
  };

  static getBookByFilter = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);
      if (search) {
        const resultBooks = books
          .find(search)
          .populate('author');

        req.result = resultBooks;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  };

  static registerBook = async (req, res, next) => {
    try {
      const book = new books(req.body);
      const result = await book.save();
      res.status(201).send(result.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static updateBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await books.findByIdAndUpdate(id, {$set: req.body});
      if (result) {
        res.status(200).send({message: 'book updated successfully'});
      } else {
        next(new NotFound('Id do livro não localizado'));
      }
    } catch (err)  {
      next(err);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await books.findByIdAndDelete(id);

      if (result) {
        res.status(200).send({message: 'Book has been removed'});
      } else {
        next(new NotFound('Id do livro não localizado'));
      }
    } catch (err) {
      next(err);
    }
  };

}

async function processSearch(params) {
  const { publish, title, minPag, maxPag, authorName } = params;

  let search = {};

  if (publish) search.publish = publish;
  if (title) search.title = { $regex: title, $options: 'i' };

  if (minPag || maxPag) search.numberOfPages = {};

  // GTE = GREATER THAN OR EQUAL = MAIOR OU IGUAL QUE
  if(minPag) search.numberOfPages.$gte = minPag;
  //LTE = LESS THAN OR EQUAL = MENOR OU IGUAL QUE
  if(maxPag) search.numberOfPages.$lte = maxPag;

  if (authorName) {
    const author = await authors.findOne({name: authorName});

    if (author) {
      search.author = author._id;
    } else {
      search = null;
    }
  }

  return search;
}

export default BookController;
import books from '../models/Book.js';

class BookController {

  static getAllBooks = async (req, res, next) => {
    try {
      const result = await books.find()
        .populate('author')
        .exec();

      res.status(200).json(result);
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
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  static getBookByPublish = async (req, res, next) => {
    try {
      const { publish } = req.query;
      const result = await books.find({'publish': publish});

      res.status(200).json(result);
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
      await books.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: 'book updated successfully'});
    } catch (err)  {
      next(err);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      await books.findByIdAndDelete(id);
      res.status(200).send({message: 'Book has been removed'});
    } catch (err) {
      next(err);
    }
  };

}

export default BookController;
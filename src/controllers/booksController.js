import books from '../models/Book.js';

class BookController {

  static getAllBooks = async (req, res) => {
    try {
      const result = await books.find()
        .populate('author')
        .exec();

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({message:`${err.message} - URL not found`});
    }
  };

  static getBookById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await books
        .findById(id)
        .populate('author', 'name')
        .exec();
      res.status(200).json(result);
    } catch (err) {
      res.status(400).send({message:`${err.message} - Id not found`});
    }
  };

  static getBookByPublish = async (req, res) => {
    try {
      const { publish } = req.query;
      const result = await books.find({'publish': publish});

      res.status(200).json(result);
    } catch (err) {
      res.status(400).send({message:`${err.message} - Id not found`});
    }
  };

  static registerBook = async (req, res) => {
    try {
      const book = new books(req.body);
      const result = await book.save();
      res.status(201).send(result.toJSON());
    } catch (err) {
      res.status(500).send({message: `${err.message} - Failed to register book`});
    }
  };

  static updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      await books.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: 'book updated successfully'});
    } catch (err)  {
      res.status(500).send({message: `${err.message} - Failed to update book`});
    }
  };

  static deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      await books.findByIdAndDelete(id);
      res.status(200).send({message: 'Book has been removed'});
    } catch (err) {
      res.status(500).send({message: `${err.message} - Failed to remove book`});
    }
  };

}

export default BookController;
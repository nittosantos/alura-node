import NotFound from '../error/NotFound.js';
import authors from '../models/Author.js';

class AuthorController {

  static getAllAuthors = async (req, res, next) => {
    try {
      const authorResult = await authors.find();

      res.status(200).json(authorResult);
    } catch (err) {
      next(err);
    }
  };

  static getAuthorById = async (req, res, next) => {

    try {
      const { id } = req.params;
      const authorResult = await authors.findById(id);

      if (authorResult) {
        res.status(200).json(authorResult);
      } else {
        next(new NotFound('Id do autor não localizado'));
      }
    } catch(err) {
      next(err);
    }
  };

  static registerAuthor = async (req, res, next) => {
    try {
      const author = new authors(req.body);
      const result = await author.save();
      res.status(201).send(result.toJSON());

    } catch (err) {
      next(err);
    }
  };

  static updateAuthor = async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorResult = await authors.findByIdAndUpdate(id, {$set: req.body});

      if (authorResult) {
        res.status(200).send({message: 'book updated successfully'});
      } else {
        next(new NotFound('Id do autor não localizado'));
      }
    }catch (err) {
      next(err);
    }
  };

  static deleteAuthor = async (req, res, next) => {

    try {
      const { id } = req.params;
      const authorResult = await authors.findByIdAndDelete(id);

      if (authorResult) {
        res.status(200).send({message: 'Author has been removed'});
      } else {
        next(new NotFound('Id do autor não localizado'));
      }


    } catch (err) {
      next(err);
    }
  };

}

export default AuthorController;
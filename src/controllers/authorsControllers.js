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

      if (authorResult !== null) {
        res.status(200).json(authorResult);
      } else {
        res.status(404).send({message:'Id not found'});
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
      await authors.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: 'book updated successfully'});
    }catch (err) {
      next(err);
    }
  };

  static deleteAuthor = async (req, res, next) => {

    try {
      const { id } = req.params;
      await authors.findByIdAndDelete(id);
      res.status(200).send({message: 'Author has been removed'});

    } catch (err) {
      next(err);
    }
  };

}

export default AuthorController;
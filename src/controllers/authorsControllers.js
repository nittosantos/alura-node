import authors from '../models/Author.js';

class AuthorController {

  static getAllAuthors = async (req, res) => {
    try {
      const authorResult = await authors.find();

      res.status(200).json(authorResult);
    } catch (err) {
      res.status(500).send({message:`${err.message} - URL not found`});
    }

  };

  static getAuthorById = async (req, res) => {

    try {
      const { id } = req.params;
      const authorResult = await authors.findById(id);
      res.status(200).json(authorResult);

    } catch(err) {
      res.status(400).send({message:`${err.message} - Id not found`});

    }
  };

  static registerAuthor = async (req, res) => {
    try {
      const author = new authors(req.body);
      const result = await author.save();
      res.status(201).send(result.toJSON());

    } catch (err) {
      res.status(500).send({message: `${err.message} - Failed to register Author`});
    }
  };

  static updateAuthor = async (req, res) => {
    try {
      const { id } = req.params;
      await authors.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: 'book updated successfully'});
    }catch (err) {
      res.status(500).send({message: `${err.message} - Failed to update Author`});
    }
  };

  static deleteAuthor = async (req, res) => {

    try {
      const { id } = req.params;
      await authors.findByIdAndDelete(id);
      res.status(200).send({message: 'Author has been removed'});

    } catch (err) {
      res.status(500).send({message: `${err.message} - Failed to remove Author`});
    }
  };

}

export default AuthorController;
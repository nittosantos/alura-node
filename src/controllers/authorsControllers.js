import authors from '../models/Author.js';

class AuthorController {

  static getAllAuthors = (req, res) => {
    authors.find((err, authors) => {
      if (err) {
        if (err) {
          res.status(500).send({message:`${err.message} - URL not found`});
        }
      } else {
        res.status(200).json(authors);
      }
    });
  };

  static getAuthorById = (req, res) => {
    const { id } = req.params;

    authors.findById(id, (err, authors) => {
      if (err) {
        res.status(400).send({message:`${err.message} - Id not found`});
      } else {
        res.status(200).json(authors);
      }
    });
  };

  static registerAuthor = (req, res) => {
    const author = new authors(req.body);

    author.save((err) => {
      if (err) {
        res.status(500).send({message: `${err.message} - Failed to register Author`});
      } else {
        res.status(201).send(author.toJSON());
      }
    });
  };

  static updateAuthor = (req, res) => {
    const { id } = req.params;

    authors.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (!err) {
        res.status(200).send({message: 'book updated successfully'});
      } else {
        res.status(500).send({message: `${err.message} - Failed to update Author`});
      }
    });
  };

  static deleteAuthor = (req, res) => {
    const { id } = req.params;

    authors.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({message: 'Author has been removed'});
      } else {
        res.status(500).send({message: `${err.message} - Failed to remove Author`});
      }
    });
  };

}

export default AuthorController;
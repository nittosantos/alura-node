import books from "../models/Book.js";

class BookController {

  static getAllBooks = (req, res) => {
    books.find((err, books) => {
      if (err) {
        if (err) {
          res.status(500).send({message:`${err.message} - URL not found`})
        }
      } else {
        res.status(200).json(books)
      }
    })
  }

  static getBookById = (req, res) => {
    const { id } = req.params

    books.findById(id, (err, books) => {
      if (err) {
        res.status(400).send({message:`${err.message} - Id not found`})
      } else {
        res.status(200).json(books)
      }
    })
  }

  static registerBook = (req, res) => {
    const book = new books(req.body)

    book.save((err) => {
      if (err) {
        res.status(500).send({message: `${err.message} - Failed to register book`})
      } else {
        res.status(201).send(book.toJSON())
      }
    })
  }

  static updateBook = (req, res) => {
    const { id } = req.params

    books.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (!err) {
        res.status(200).send({message: 'book updated successfully'})
      } else {
        res.status(500).send({message: `${err.message} - Failed to update book`})
      }
    })
  }

  static deleteBook = (req, res) => {
    const { id } = req.params

    books.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({message: 'Book has been removed'})
      } else {
        res.status(500).send({message: `${err.message} - Failed to remove book`})
      }
    })
  }

}

export default BookController
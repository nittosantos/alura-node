import express from 'express';

const app = express()
app.use(express.json())

const books = [
  {id: 1, 'title': 'The Lord of the Rings'},
  {id: 2, 'title': 'the Hobbit'}
]

app.get('/', (req, res) => {
  res.status(200).send('Curso de node')
})


app.get('/livros', (req, res) => {
  res.status(200).json(books)
})

app.post('/livros', (req, res) => {
  books.push(req.body)
  res.status(201).send("The book has benn sucessfully added.")
})

app.put('/livros/:id', (req, res) => {
  const index = searchBook(req.params.id)
  books[index].title = req.body.title

  res.json(books)
})

app.get('/livros/:id', (req, res) => {
  const index = searchBook(req.params.id)

  res.json(books[index])
})

function searchBook(id) {
  return books.findIndex(book => book.id == id)
}

export default app
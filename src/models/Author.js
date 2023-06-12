import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    id: { type: 'string'},
    name: { type: 'string', required: true},
    nationality: { type: 'string'}
  },
  {
    versionKey: false
  }
);

const authors = mongoose.model('authors',authorSchema);

export default authors;
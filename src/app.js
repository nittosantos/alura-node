import express from 'express';
import mongoose from 'mongoose';
import db from './config/dbConnect.js';
import routes from './routes/index.js';

db.on('error', console.log.bind(console, 'Connection error'));
db.once('open', () => console.log('Success connection to MongoDB'));

const app = express();
app.use(express.json());
routes(app);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({message:'Format Id is incorrect'});
  } else {
    res.status(500).send({message:'Erro interno do servidor'});
  }
});

export default app;
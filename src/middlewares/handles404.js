import NotFound from '../error/NotFound.js';

/* eslint-disable no-unused-vars */
export default function handler404 (req, res, next) {
  const error404 = new NotFound();
  next(error404);
}
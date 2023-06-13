/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import BadRequest from '../error/BadRequest.js';
import ErrorBase from '../error/ErrorBase.js';
import NotFound from '../error/NotFound.js';
import ValidationError from '../error/ValidationError.js';

const errorHandlers = {
  [mongoose.Error.CastError]: (res) => new BadRequest().sendResponse(res),
  [mongoose.Error.ValidationError]: (res, err) => new ValidationError(err).sendResponse(res),
  [NotFound]: (res, err) => err.sendResponse(res),
  default: (res) => new ErrorBase().sendResponse(res),
};

export default function errorHandler(err, req, res, next) {
  const handleError = errorHandlers[err.constructor] || errorHandlers.default;
  handleError(res, err);
}

// export default function errorHandler(err, req, res, next)  {
//   if (err instanceof mongoose.Error.CastError) {
//     new BadRequest().sendResponse(res);
//   } else if ( err instanceof mongoose.Error.ValidationError) {
//     new ValidationError(err).sendResponse(res);
//   } else if (err instanceof NotFound) {
//     err.sendResponse(res);
//   } else {
//     new ErrorBase().sendResponse(res);
//   }
// }

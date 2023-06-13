import BadRequest from './BadRequest.js';

export default class ValidationError extends BadRequest {
  constructor(err) {
    const msgError = Object.values(err.errors)
      .map(err => err.message)
      .join('; ');
    super(msgError);
  }
}
import ErrorBase from './ErrorBase.js';

export default class BadRequest extends ErrorBase {
  constructor(message = 'Um ou mais dados estão incorretos') {
    super(message, 400);
  }
}
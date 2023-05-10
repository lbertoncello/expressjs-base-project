import HttpResponse from './http-response.js';

export default class ApplicationErrorResponse extends HttpResponse {
  constructor(status, message) {
    const success = false;
    const data = {};

    super(status, success, data);
    this.body.message = `Application Error: ${message}`;
  }
}

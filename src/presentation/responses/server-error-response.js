import HttpResponse from './http-response.js';

export default class ServerErrorResponse extends HttpResponse {
  constructor(message) {
    const success = false;
    const data = {};
    const status = 500;

    super(status, success, data);
    this.body.message = `Server Error: ${message}`;
  }
}

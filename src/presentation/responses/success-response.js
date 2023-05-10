import HttpResponse from './http-response.js';

export default class SuccessResponse extends HttpResponse {
  constructor(data) {
    const status = 200;
    const success = true;

    super(status, success, data);
  }
}

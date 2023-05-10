export default class HttpResponse {
  constructor(status, success, data) {
    this.status = status;
    this.body = {
      success,
      data,
    };
  }
}

export default class ErrorResponse {
  constructor(message) {
    this.message = message;
    this.success = false;
    this.data = {};
  }
}

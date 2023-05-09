export default class ErrorResponse {
  constructor(message) {
    this.success = false;
    this.message = message;
  }
}

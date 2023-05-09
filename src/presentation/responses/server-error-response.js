export default class ServerErrorResponse {
  constructor(message) {
    this.status = 500;
    this.body = {
      success: false,
      message,
    };
  }
}

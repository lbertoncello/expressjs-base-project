export default class ApplicationError extends Error {
  constructor(message, status) {
    const fullMessage = `Client error: ${message}`;
    super(fullMessage);
    this.status = status;
  }
}

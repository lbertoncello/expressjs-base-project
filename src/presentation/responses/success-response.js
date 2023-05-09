export default class SuccessResponse {
  constructor(data) {
    this.status = 200;
    this.body = {
      success: true,
      data,
    };
  }
}

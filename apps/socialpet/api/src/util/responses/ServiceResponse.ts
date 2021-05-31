export class ServiceResponse {
  public success: boolean;
  public errors: any[];
  public statusCode: number;

  constructor(success: boolean, errors: any[], statusCode: number) {
    this.success = success;
    this.errors = errors;
    this.statusCode = statusCode;
  }

  public setError(error: any, statusCode: number) {
    this.success = false;
    this.errors.push(error);
    this.statusCode = statusCode;
  }
}

export class HttpRequestCodes {
  //2XX
  public static readonly OK = 200;
  public static readonly CREATED = 201;

  //4XX
  public static readonly BAD_REQUEST = 400;
  public static readonly UNAUTHORIZED = 401;
  public static readonly RESOURCE_NOT_FOUND = 404;
  public static readonly UNPROCESSABLE_ENTITY = 422;

  //500
  public static readonly SERVER_ERROR = 500;
}

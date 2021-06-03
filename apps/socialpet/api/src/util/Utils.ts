export class Utils {
  public static parserDBUrl(dbUrl: string) {
    const credentialsAndConnection = dbUrl.replace("postgres://", "").split("@");
    const userPassword = credentialsAndConnection[0].split(":");
    const hostPortDbName = credentialsAndConnection[1].split("/");
    const hostPort = hostPortDbName[0].split(":");
    const logging = process.env.DB_LOGGING?.toLowerCase() == "true";
    const ssl = process.env.NODE_ENV != "production" ? false : { rejectUnauthorized: false };
    const dbconfig = {
      host: hostPort[0],
      port: parseInt(hostPort[1]),
      username: userPassword[0],
      password: userPassword[1],
      database: hostPortDbName[1],
      logging: logging,
      ssl: ssl,
    };

    return dbconfig;
  }
}

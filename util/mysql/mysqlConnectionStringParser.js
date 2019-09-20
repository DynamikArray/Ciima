/**
 * getCredsFromFullHost -  takes the env variable from heroku and turns it into the pieces
 * neeed by the mysql driver
 * @return {object} object cotaining {user, password, host, database} info
 */

getCredsFromFullHost = () => {
  const creds = {};
  const connStr = process.env.MYSQL_CONN;
  const shortConn = connStr.replace("mysql://", "");
  const pieces = shortConn.split("@");

  //user & pass
  if (pieces[0].includes(":")) {
    const userpass = pieces[0].split(":");
    creds.user = userpass[0];
    creds.password = userpass[1];
    //host & db

    if (pieces[1].includes("/")) {
      const userpass = pieces[1].split("/");
      creds.host = userpass[0];
      creds.database = userpass[1];
    }
  } else {
    creds.user = pieces[0];

    //host & db
    if (pieces[1].includes("/")) {
      const userpass = pieces[1].split("/");
      creds.host = userpass[0];
      creds.database = userpass[1];
      if (creds.host.includes(":")) {
        hosts = creds.host.split(":");
        creds.host = hosts[0];
        creds.port = hosts[1];
      }
    }
  }
  return creds;
};

const creds = getCredsFromFullHost();

module.exports = creds;

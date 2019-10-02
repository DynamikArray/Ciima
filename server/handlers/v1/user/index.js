const bcrypt = require("bcrypt");

module.exports = fastify => ({
  /**
   * [register description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  register: async (req, res) => {
    fastify.winston.debug("Registration Attempt");

    const { email, username, password } = req.body;
    const connection = await fastify.mysql.getConnection();

    //email check
    const emailExists = await checkIfEmailExists(connection, email);
    if (emailExists) {
      const msg = "Email already exists";
      fastify.winston.debug(msg);
      res.status(400).send(msg);
      return;
    }

    //username check
    const userExists = await checkIfUsernameExists(connection, username);
    if (userExists) {
      const msg = "Username already exists.";
      fastify.winston.debug(msg);
      res.status(400).send(msg);
      return;
    }

    //add user by building the query
    const query = `INSERT INTO slc_users SET email=?, username=?, password=?`;

    //hash the plain pass into something cryptic
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //try to add this user into the db
    try {
      if (connection) {
        const [result] = await connection.query(query, [
          email,
          username,
          hashPassword
        ]);

        //pull of the props we care about
        const { affectedRows, insertId } = result;
        if (affectedRows == 1) {
          const user = await getUserById(connection, insertId);
          connection.release();
          return user;
        }
        //wasnt one record, release connection , send result back
        connection.release();
        return result;
      }
      const msg = "No DB Connection";
      fastify.winston.error(msg);
      return { error: msg };
    } catch (err) {
      //todo better error handle
      return err;
    }
  },

  /**
   * [login description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  login: async (req, res) => {
    const { username, password } = req.body;
    const connection = await fastify.mysql.getConnection();

    //see if username exists
    const userExists = await checkIfUsernameExists(connection, username);
    if (userExists) {
      const { user } = await getUserByUsernamePassword(
        connection,
        username,
        password
      );
      if (user) {
        const token = fastify.jwt.sign({ ...user }, { expiresIn: "10h" });
        res.send({ token, ...user });
      }
    }
    //user not found or password not valid
    res.status(403).send("Username or password not valid");
  },

  account: async (req, res) => {
    const connection = await fastify.mysql.getConnection();
    const { id } = req.user;
    const user = await getUserById(connection, id);
    if (user) {
      const token = fastify.jwt.sign({ ...user }, { expiresIn: "10h" });
      res.send({ token, ...user });
    }
  }
});

/**
 * [getUserById description]
 * @param  {object}  connection connection object off of fastify
 * @param  {inter}  id          users record id
 * @return {Promise}            User if found or error:msg
 */
const getUserById = async (connection, id) => {
  const query = `SELECT id, email, username FROM slc_users WHERE id = ? `;
  try {
    if (connection) {
      const [rows, fields] = await connection.query(query, [id]);
      connection.release();
      if (rows.length == 1) {
        return rows[0]; //result.rows;
      } else {
        return { error: "Unable to find a matching record" };
      }
    }
    return { error: "No Db Connection" };
  } catch (err) {
    //todo better error handle
    return { error: err };
  }
};

/**
 * [checkIfEmailExists description]
 * @param  {[type]}  connection [description]
 * @param  {[type]}  email      [description]
 * @return {Promise}            [description]
 */
const checkIfEmailExists = async (connection, email) => {
  const query = `SELECT email FROM slc_users WHERE email = ? `;
  try {
    if (connection) {
      const [rows, fields] = await connection.query(query, [email]);
      connection.release();
      if (rows.length > 0) {
        return true; //result.rows;
      } else {
        return false;
      }
    }
    return false;
  } catch (err) {
    //todo better error handle
    return { error: err };
  }
};

/**
 * [checkIfEmailExists description]
 * @param  {[type]}  connection [description]
 * @param  {[type]}  email      [description]
 * @return {Promise}            [description]
 */
const checkIfUsernameExists = async (connection, username) => {
  const query = `SELECT username FROM slc_users WHERE username = ? `;
  try {
    if (connection) {
      const [rows, fields] = await connection.query(query, [username]);
      connection.release();
      if (rows.length > 0) {
        return true; //result.rows;
      } else {
        return false;
      }
    }
    return false;
  } catch (err) {
    //todo better error handle
    return { error: err };
  }
};

/**
 * [getUserByUsernamePassword description]
 * @param  {[type]}  connection [description]
 * @param  {[type]}  username   [description]
 * @param  {[type]}  password   [description]
 * @return {Promise}            [description]
 */
const getUserByUsernamePassword = async (connection, username, password) => {
  const query = `SELECT id, username, email, password FROM slc_users WHERE username = ? `;
  try {
    if (connection) {
      const [rows, fields] = await connection.query(query, [username]);
      connection.release();
      if (rows.length > 0) {
        const user = rows[0];
        if (user) {
          const validPass = await bcrypt.compare(password, user.password);
          if (validPass) {
            //REMOVE THE HASHED PASSWORD from the user before sending back
            delete user.password;
            return { user };
          }
        }
      } else {
        return false;
      }
    }
    return false;
  } catch (err) {
    //todo better error handle
    return { error: err };
  }
};

const bcrypt = require("bcryptjs");

const { queryUpdateUser } = require("../../../../util/ciima/queries/user/updateUser");

module.exports = (fastify) => ({
  /**
   * [register description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  register: async (req, res) => {
    fastify.winston.debug("Registration Attempt");

    const { email, username, password, displayname, displaycolor } = req.body;

    //email check
    const emailExists = await checkIfEmailExists(fastify, email);
    if (emailExists) {
      const msg = "Email already exists";
      fastify.winston.debug(msg);
      res.status(400).send(msg);
      return;
    }

    //username check
    const userExists = await checkIfUsernameExists(fastify, username);
    if (userExists) {
      const msg = "Username already exists.";
      fastify.winston.debug(msg);
      res.status(400).send(msg);
      return;
    }

    //add user by building the query
    const query = `INSERT INTO slc_users SET email=?, username=?, password=?, displayname=?, displaycolor=?`;

    //hash the plain pass into something cryptic
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    //try to add this user into the db
    try {
      const [result] = await fastify.mysql.query(query, [email, username, hashPassword, displayname, displaycolor]);

      //pull of the props we care about
      const { affectedRows, insertId } = result;
      if (affectedRows == 1) {
        const user = await getUserById(fastify, insertId);
        return user;
      }
      return result;
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

    //see if username exists
    const userExists = await checkIfUsernameExists(fastify, username);
    if (userExists) {
      const { user } = await getUserByUsernamePassword(fastify, username, password);
      if (user) {
        const token = fastify.jwt.sign({ ...user }, { expiresIn: "5d" });
        res.send({ token, ...user });
      }
    }
    //user not found or password not valid
    res.status(403).send("Username or password not valid");
  },

  /**
   * [account description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  account: async (req, res) => {
    const { id } = req.user;
    const user = await getUserById(fastify, id);
    if (user) {
      res.send({ ...user });
    }
  },

  /**
   * [update description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  update: async (req, res) => {
    const params = req.body;
    const userId = req.user.id;

    const { result, error } = await queryUpdateUser(fastify, userId, params);

    if (result && !error) return { result };
    if (error && !result) return { error };
  },
});

/**
 * [getUserById description]
 * @param  {object}  connection connection object off of fastify
 * @param  {inter}  id          users record id
 * @return {Promise}            User if found or error:msg
 */
const getUserById = async (fastify, id) => {
  const query = `SELECT id, email, username, displayname, displaycolor, roles FROM slc_users WHERE id = ? `;
  try {
    const [rows, fields] = await fastify.mysql.query(query, [id]);

    if (rows.length == 1) {
      return rows[0]; //result.rows;
    } else {
      return { error: "Unable to find a matching record" };
    }
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
const checkIfEmailExists = async (fastify, email) => {
  const query = `SELECT email FROM slc_users WHERE email = ? `;
  try {
    const [rows, fields] = await fastify.mysql.query(query, [email]);

    if (rows.length > 0) {
      return true; //result.rows;
    } else {
      return false;
    }
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
const checkIfUsernameExists = async (fastify, username) => {
  const query = `SELECT username FROM slc_users WHERE username = ? `;
  try {
    const [rows, fields] = await fastify.mysql.query(query, [username]);

    if (rows.length > 0) {
      return true; //result.rows;
    } else {
      return false;
    }
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
const getUserByUsernamePassword = async (fastify, username, password) => {
  const query = `SELECT id, username, password, email, displayname, displaycolor FROM slc_users WHERE username = ?`;
  try {
    const [rows, fields] = await fastify.mysql.query(query, [username]);
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
  } catch (err) {
    //todo better error handle
    return { error: err };
  }
};

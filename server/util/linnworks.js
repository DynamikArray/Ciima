//// TODO: pass these in via a config, would allow for diff enviroments, testing, mocking, etc
const ApplicationId = process.env.LINNWORKS_APPLICATION_ID;
const ApplicationSecret = process.env.LINNWORKS_APPLICATION_SECRET;
const Token = process.env.LINNWORKS_APPLICATION_TOKEN;
const API_URL = process.env.LINNWOKRS_API_URL;

////TODO: These maybe be passed in as part of a config?
const { logger } = require("./winston.js");

//Use axios
const axios = require("axios");
const linnworks = {
  //app level configs
  ApplicationId: ApplicationId,
  ApplicationSecret: ApplicationSecret,
  Token: Token,
  //runtime
  serverUrl: false,
  sessionToken: false,
  sessionTokenError: false,
  /**
   * [initiliaze description]
   * @return {Promise} [description]
   */
  async initiliaze() {
    logger.info("initiliazing Linnworks API...");
    const ready = await this.authorizeByApplication();
    if (ready) return true;
    return false;
  },
  /**
   * [authorizeByApplication description]
   * @return {Promise} [description]
   */
  async authorizeByApplication() {
    try {
      logger.info("Authorizing Ciima with Linnworks");
      const url = `${API_URL}/Auth/AuthorizeByApplication`;

      const response = await axios.post(url, {
        ApplicationId,
        ApplicationSecret,
        Token
      });

      //check response code here
      //pull data off response
      const { data } = response;
      if (data.Token) {
        this.serverUrl = data.Server;
        this.sessionToken = data.Token;
        logger.info(`Linnworks Authorized Us`);
        return true;
      }
      //// TODO: problally wouldnt want to leak the full response to logs here
      //// seems like this is wehre those data exposures happen
      logger.warn("No Token Found");
      return false;
    } catch (error) {
      console.log(error);
      logger.warn("Linnworks DENIED Us");
      this.sessionTokenError = error;
      return false;
    }
  },
  /**
   * [reAuth description]
   * @return {boolean} true/fals if reauthorization was successfull
   */
  reAuth() {
    logger.info("Re-Authorizing Ciima with Linnworks");
    if (!this.authorizeByApplication) return false;
    return true;
  },
  /**
   * [makeApiCall makes all outboud calles to linnworks ]
   * @param  {object}  config axios config with method, url, data properties
   * @return {Promise}        [description]
   */
  async makeApiCall(config) {
    logger.info("Attempting to makeApiCall() ");
    //check if we can make call
    if (!this.sessionToken) {
      logger.warn("No sessionToken found ");
      if (!this.reAuth()) {
        logger.error("Unable to reauthorize to linnworks");
        return false;
      }
    }
    //attach our token
    config.headers = {
      ...config.headers,
      Authorization: `${this.sessionToken}`,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
    };
    config.url = `${this.serverUrl}/api/${config.url}`;

    //make our api call
    const response = await axios(config).catch(error => {
      logger.error(error);
      return { error };
    });

    //TODO handle this response better - or pass to a handler we create ???
    const { data } = response;
    return data;
  }
};

module.exports = linnworks;

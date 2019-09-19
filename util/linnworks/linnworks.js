////TODO: These maybe be passed in as part of a config?
//const { logger } = require("../winston/winston.js");

const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

//Use axios
const axios = require("axios");

//// TODO: pass these in via a config, would allow for diff enviroments, testing, mocking, etc
const ApplicationId = process.env.LINNWORKS_APPLICATION_ID;
const ApplicationSecret = process.env.LINNWORKS_APPLICATION_SECRET;
const Token = process.env.LINNWORKS_APPLICATION_TOKEN;
const API_URL = process.env.LINNWOKRS_API_URL;

const linnworks = {
  //app level configs
  ApplicationId: ApplicationId,
  ApplicationSecret: ApplicationSecret,
  Token: Token,
  //runtime
  serverUrl: false,
  sessionToken: false,
  sessionTokenError: false,
  logger: false,
  //adds our dataFormatters for taking our data items and converting them down to linnworks pieces
  formatters: false,
  retryCount: 0,

  firstLoad: true,

  /**
   * [initiliaze description]
   * @return {Promise} [description]
   */
  async initiliaze() {
    this.logger = logger;
    //include our formatters helper
    this.formatters = require("./linnworksFormatters.js")(logger);
    this.logger.info("initiliazing Linnworks API...");
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
      this.logger.debug("Authorizing Ciima with Linnworks");
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
        this.logger.debug(`Linnworks Authorized Us`);
        return true;
      }
      //// TODO: problally wouldnt want to leak the full response to logs here
      //// seems like this is wehre those data exposures happen
      this.logger.warn("No Token Found");
      return false;
    } catch (error) {
      this.logger.error(error);
      this.logger.warn("Linnworks DENIED Us");
      this.sessionTokenError = error;
      return false;
    }
  },
  /**
   * [reAuth description]
   * @return {boolean} true/fals if reauthorization was successfull
   */
  async reAuth() {
    if (this.shouldRetry()) {
      const authd = await this.authorizeByApplication();
      if (!authd) {
        this.logger.warn("Unable to Re-Authorize ciima with Linnworks");
        return false;
      }
      this.logger.info("Re-Authorizing Success");
      return true;
    }
    return false;
  },
  //
  //
  //
  shouldRetry() {
    this.retryCount++;
    this.logger.info(`Re-Authorizing attempt ${this.retryCount}`);
    if (this.retryCount > 2) {
      this.logger.info(
        `Re-Authorizing MAX attempts reached ${this.retryCount}`
      );
      return false;
    }
    return true;
  },
  /**
   * [makeApiCall makes all outboud calles to linnworks ]
   * @param  {object}  config axios config with method, url, data properties
   * @return {Promise}        [description]
   */
  async makeApiCall(config, isRetry = false) {
    this.logger.debug("apiCall Linnworks: " + JSON.stringify(config));
    //check if we can make call
    if (!this.sessionToken) {
      this.logger.warn("No sessionToken found ");
      if (!this.reAuth()) {
        this.logger.error("Unable to reauthorize to linnworks");
        return false;
      }
    }

    //if not a retry we need to format our headers
    if (!isRetry) {
      //attach our token
      config.headers = {
        Authorization: `${this.sessionToken}`,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
      };
      config.url = `${this.serverUrl}/api/${config.url}`;
    }

    //make our api call
    try {
      const response = await axios(config);
      if (response) {
        //200
        if (response.status == 200) {
          this.logger.debug("Linnworks 200 response");
          const { data } = response;
          return { result: data };
        }

        //when adding items there is no response status ?
        if (response.status === 204) {
          this.logger.debug("Linnworks 204 response");
          return { result: "success" };
        }

        //check response status
        if (response.status == 400) {
          this.logger.debug("Linnworks 400 response");
          const { statusText } = response;
          return { error: statusText };
        }
      }
    } catch (error) {
      const { data } = error.response;
      this.logger.error(`Error Response: ${JSON.stringify(data.Message)}`);
      if (data.Message === "Token is wrong.") {
        const ok = await this.reAuth();
        if (!ok) return { error: data };
        // merge the new sessionToken into the config
        config.headers = { Authorization: `${this.sessionToken}` };
        //this doesnt handle the recurssive right
        const response = await this.makeApiCall(config, true);
        if (!response) return { error: "Unable to reauth" };
        return response;
      }

      return { error: data.Message };
    }
  }
};

module.exports = { linnworks };
